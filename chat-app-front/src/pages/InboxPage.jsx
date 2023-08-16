import Navigation from "../components/inbox/Navigation.jsx";
import Sidebar from "../components/inbox/Sidebar.jsx";
import ChatBody from "../components/inbox/chatbody/ChatBody.jsx";


const InboxPage = () => {

    return (
        <>
            <div>
                <Navigation />
                <div className="max-w-7xl mx-auto -mt-1">
                    <div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
                        <Sidebar />
                        <ChatBody />
                    </div>
                </div>
            </div>
        </>
    );
};

export default InboxPage;