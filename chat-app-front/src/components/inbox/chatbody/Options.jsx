import {useState} from "react";
import {useAddNewMessageMutation} from "../../../redux/features/messages/messagesApi.js";
import {useParams} from "react-router-dom";
import {getUserDetails} from "../../../helper/SessionHelper.js";

const Options =() =>{
    const [addNewMessage, {isLoading}] = useAddNewMessageMutation();
    const [newMessage, setNewMessage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const {chatId} = useParams();
    const currentUserId = getUserDetails()['id'];


    const handleSubmit = () => {
        setBtnDisabled(true);
        addNewMessage({
            conversationId:chatId,
            senderId:currentUserId,
            text:newMessage
        })
        setNewMessage("")
    }









    return (
        <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <input
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring focus:ring-violet-500 rounded-full outline-none focus:text-gray-700"
                name="message"
                required
                value={newMessage}
                onChange={(e)=>{
                    setNewMessage(e.target.value);
                    if(e.target.value){
                        setBtnDisabled(false);
                    }else{
                        setBtnDisabled(true)
                    }
                }}
             />

             <button onClick={handleSubmit} disabled={btnDisabled || isLoading}>
                <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
             </button>
        </div>
    );
}

export default Options;
