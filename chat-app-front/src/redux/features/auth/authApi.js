import {apiSlice} from "../api/apiSlice.js";
import {SuccessToast} from "../../../helper/ValidationHelper.js";
import {SetAuthError} from "./authSlice.js";
import {setToken, setUserDetails} from "../../../helper/SessionHelper.js";


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
           query: (data) => ({
               url: "/auth/registration",
               method: "POST",
               body: data
           }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
               try{
                   const res = await queryFulfilled;
                   SuccessToast("Register Success");

               }catch(err) {
                   const error = err?.error?.data?.data;
                   dispatch(SetAuthError(error))
               }
            }
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    let MyToken = res.data['token'];
                    let user = res.data['data'][0]; //This is Object
                    setToken(MyToken);
                    let userDetails = {
                        email: user['email'],
                        userName: user['userName'],
                        id:user['_id']
                    }
                    setUserDetails(userDetails);
                    SuccessToast("Login Success");

                    setTimeout(()=>{
                        window.location.href="/inbox";
                    },200)


                }catch(err) {
                    //do nothing
                    //console.log(err);
                }
            }
        })
    }),
})


export const {useRegisterMutation, useLoginMutation} = authApi;