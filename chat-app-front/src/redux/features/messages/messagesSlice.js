import {createSlice} from "@reduxjs/toolkit";


const initialState = {
     messages: []
}


const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        SetMessages:(state, action) => {
            state.messages =action.payload;
        },
        AddTodo:(state, action)=>{

            state.messages.push(action.payload);

        },
    }
})

export const {SetMessages, AddTodo} = messagesSlice.actions;

const messagesSliceReducer = messagesSlice.reducer;
export default messagesSliceReducer;