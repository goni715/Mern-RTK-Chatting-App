import Message from "./Message.jsx";
import {useGetMessagesQuery} from "../../../redux/features/messages/messagesApi.js";
import {useParams} from "react-router-dom";
import Error from "../../ui/Error.jsx";

const Messages = () =>{
    const {chatId} = useParams()
    const {data, isLoading, isError, error} = useGetMessagesQuery(chatId);
    const messages = data?.data || [];



    // decide what to render
    let content = null;

    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (!isLoading && isError) {
        content = (
            <div>
                <Error message={error?.data?.data} />
            </div>
        );
    } else if (!isLoading && !isError && messages?.length === 0) {
        content = <div>No messages found!</div>;
    } else if (!isLoading && !isError && messages?.length > 0) {

        content = messages.map((message,i) => (
            <Message key={i.toString()} item={message} />
        ));

    }

    return (
       <>
           <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
               <ul className="space-y-2">
                   {content}
               </ul>
           </div>
       </>
    );
}

export default Messages;