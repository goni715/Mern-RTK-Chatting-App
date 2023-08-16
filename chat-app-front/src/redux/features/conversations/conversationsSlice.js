import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    conversations:[],
    error:""
}


const conversationsSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        SetConversations: (state,action) => {
            state.conversations = action.payload;
        },
        SetConversationError: (state,action) => {
            state.error = action.payload;
        }
    }
})


export const {SetConversations, SetConversationError} = conversationsSlice.actions

const conversationsSliceReducer = conversationsSlice.reducer;
export default conversationsSliceReducer;