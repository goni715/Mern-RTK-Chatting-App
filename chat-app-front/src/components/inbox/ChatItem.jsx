import {Link, useNavigate} from "react-router-dom";
import logo from '../../assets/images/logo.svg';
import {getUserDetails} from "../../helper/SessionHelper.js";
import {format} from "timeago.js";

const ChatItem = ({ item }) => {

    const members = item?.Members || [];
    const currentUserId = getUserDetails()['id'];
    const foreignUser = members.find((cv)=> cv._id !== currentUserId);
    const navigate = useNavigate();

    const handleClick = () => {
        let encodedValue = btoa(foreignUser?.userName);
        let avatar = btoa("https://res.cloudinary.com/dwok2hmb7/image/upload/v1689323016/Social-Media/jnsismbondws3jmqdoum.png");

        navigate(`/inbox/${item?._id}/${encodedValue}/${avatar}`, );
    }



    return (

        <>
            <li onClick={handleClick}>
                <Link
                    className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                    to=""
                >
                    <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={logo}
                        alt="avatar"
                    />
                    <div className="w-full pb-2 hidden md:block">
                        <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-gray-600">
                       {foreignUser?.userName}
                    </span>
                            <span className="block ml-2 text-sm text-gray-600">
                        {format(item?.updatedAt)}
                    </span>
                        </div>
                        <span className="block ml-2 text-sm text-gray-600">
                    {item?.text}
                </span>
                    </div>
                </Link>
            </li>
        </>

    );
}


export default ChatItem;