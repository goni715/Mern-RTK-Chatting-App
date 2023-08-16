// import Blank from "./Blank";
import ChatHead from "./ChatHead.jsx";
import Messages from "./Messages.jsx";
import Options from "./Options.jsx";

const ChatBody = () =>{
    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
                <ChatHead/>
                <Messages />
                <Options />
                {/* <Blank /> */}
            </div>
        </div>
    );
}

export default ChatBody;
