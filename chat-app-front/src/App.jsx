import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ConversationPage from "./pages/ConversationPage.jsx";
import InboxPage from "./pages/InboxPage.jsx";
import {getToken} from "./helper/SessionHelper.js";


const App = () => {

    if(getToken()){
        return(
            <>
                <>
                    <BrowserRouter>
                        <Routes>
                            <Route exact path="/inbox" element={<ConversationPage/>} />
                            <Route path="/" element={<Navigate to="/inbox" replace />} />
                            <Route exact path="/inbox/:chatId/:name/:avatar" element={<InboxPage/>} />
                        </Routes>
                    </BrowserRouter>
                </>
            </>
        )
    }else{
        return(
            <>
                <>
                    <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<LoginPage/>} />
                            <Route exact path="/register" element={<RegisterPage/>} />
                        </Routes>
                    </BrowserRouter>
                </>
            </>
        )
    }

};

export default App;