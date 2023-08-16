import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../features/api/apiSlice.js";
import authSliceReducer from "../features/auth/authSlice.js";
import conversationsSliceReducer from "../features/conversations/conversationsSlice.js";
import messagesSliceReducer from "../features/messages/messagesSlice.js";


//configure store
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authSliceReducer,
        conversations: conversationsSliceReducer,
        messages: messagesSliceReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware)


})

export default store;