import ChatItem from "./ChatItem.jsx";
import {useGetConversationsQuery} from "../../redux/features/conversations/conversationsApi.js";
import Error from "../ui/Error.jsx";
import {getUserDetails} from "../../helper/SessionHelper.js";

const ChatItems = () =>{

    const currentUserId = getUserDetails()['id'];

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetConversationsQuery(currentUserId);

    const conversations = data?.data || [];




    // decide what to render

    let content = null;

    if (isLoading) {
        content = <li className="m-2 text-center">Loading...</li>;
    }

    if (!isLoading && isError) {
        content = (
            <li className="m-2 text-center">
                <Error message={error?.data} />
            </li>
        );
    }


    if (!isLoading && !isError && conversations?.length > 0) {
        content = conversations.map((item,i) => (
            <ChatItem key={i.toString()} item={item} />
        ));
    }


    if (!isLoading && !isError && conversations?.length === 0) {
        content = <li className="m-2 text-center">No conversations found!</li>;
    }






    return (

        <>
            <ul>
                {content}
            </ul>
        </>


    );
}

export default ChatItems;