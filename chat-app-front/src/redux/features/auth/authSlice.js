import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    accessToken: undefined,
    user: undefined,
    error: ""
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state,action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.accessToken=undefined;
            state.user=undefined;
        },
        SetAuthError: (state,action) => {
            state.error=action.payload;
            console.log(action.payload);
        }
    }
})



export const {userLoggedIn, userLoggedOut, SetAuthError} = authSlice.actions;
const authSliceReducer = authSlice.reducer;
export default authSliceReducer;