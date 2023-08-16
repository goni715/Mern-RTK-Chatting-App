import {useState} from "react";
import {useGetAllUsersQuery} from "../../redux/features/user/usersApi.js";
import {useSelector} from "react-redux";
import {getUserDetails} from "../../helper/SessionHelper.js";
import {
    useCheckConversationMutation, useCreateConversationMutation,
} from "../../redux/features/conversations/conversationsApi.js";
import Error from "../ui/Error.jsx";

const Modal = ({ open, control }) =>{
    const {data} = useGetAllUsersQuery();
    const users = data?.data || [];

    const [newMessage, setNewMessage] = useState("");
    const [secondId, setSecondId] = useState("");
    const firstId = getUserDetails()['id']; //currentUserId

    const [createConversation, {isLoadingr}] = useCreateConversationMutation();
    const [checkConversation, {isSuccess}] = useCheckConversationMutation();
    const {error} = useSelector((state)=> state.conversations);

    const handelCheck = (id) => {
       checkConversation({
           firstId:firstId,
           secondId:id
       })
    }

    const resetForm = () => {
      setNewMessage("");
      setSecondId("")
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(error ===""){
            createConversation({
                firstId,
                secondId,
                text:newMessage
            })
            resetForm();
            control();
        }
    }

    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Send message
                    </h2>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6"  method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    To
                                </label>
                                <select
                                    onChange={
                                    (e)=>{
                                        setSecondId(e.target.value);
                                        handelCheck(e.target.value)
                                    }}
                                    id="to"
                                    name="lwsJobType"
                                    required
                                    value={secondId}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                >
                                    <option value="" hidden selected>Start new Chat</option>
                                    {users?.length > 0 && (
                                           users.map((user,i) => (
                                               <option key={i.toString()} hidden={user?._id === firstId} value={user._id}>{user.userName}</option>
                                           ))
                                        )
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Message"
                                    value={newMessage}
                                    onChange={(e)=>setNewMessage(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={error}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                 Send Message
                            </button>
                        </div>

                        {
                           error && <Error message={error} />
                        }
                    </form>
                </div>
            </>
        )
    );
}

export default Modal;