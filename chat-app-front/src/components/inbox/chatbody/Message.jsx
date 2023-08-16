import {getUserDetails} from "../../../helper/SessionHelper.js";


const Message = ({ item }) =>{
    const currentUserId = getUserDetails()['id'];
    //{`flex justify-end`}
    return (
        <li className={item?.senderId === currentUserId ? "flex justify-end" : "flex-justify-start"}>
            <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                <span className="block">{item?.text}
                </span>
            </div>
        </li>
    );
}


export default Message;