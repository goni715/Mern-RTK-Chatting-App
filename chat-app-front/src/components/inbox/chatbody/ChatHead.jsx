import {useParams} from "react-router-dom";

const ChatHead = () =>{
    const {name: encodedName, avatar:encodedAvatar} = useParams();
    const name = atob(encodedName);
    const avatar = atob(encodedAvatar);

    return (
        <div className="relative flex items-center p-3 border-b border-gray-300">
            <img
                className="object-cover w-10 h-10 rounded-full"
                src={avatar}
                alt="pic"
            />
            <span className="block ml-2 font-bold text-gray-600">{name}</span>
        </div>
    );
}

export default ChatHead;