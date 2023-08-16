import {apiSlice} from "../api/apiSlice.js";
import {SetAuthError} from "../auth/authSlice.js";
import {SetConversationError, SetConversations} from "./conversationsSlice.js";


export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (currentUserId) => `/conv/get-conversations/${currentUserId}`,
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                    dispatch(SetConversations(res?.data?.data));

                }catch(err) {
                    const error = err?.error?.data?.data;
                    dispatch(SetAuthError(error))
                }
            },
        }),
        checkConversation: builder.mutation({
            query: (data) => ({
                url: "/conv/check-conversation",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.status === "success"){
                        dispatch(SetConversationError(""))
                    }
                }catch(err) {
                    if(err?.error?.status === 409){
                        dispatch(SetConversationError(err?.error?.data?.data))
                    }
                }
            },
        }),
        createConversation: builder.mutation({
            query: (data) => ({
                url: "/conv/create-conversation",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                    const newConversation = res?.data?.data;
                    //Pessimistic cache update start
                     dispatch(
                        conversationsApi.util.updateQueryData(
                            "getConversations",
                            arg.firstId.toString(),//tag/id
                            (draft) => {
                                //draft.data.push(arg);
                                draft.data = [newConversation, ...draft.data];
                            }
                        )
                    )
                    //Pessimistic cache update end

                }catch(err) {
                    //do nothing
                    //console.log(err);
                }
            },
        })
    }),
})

export const { useGetConversationsQuery, useCreateConversationMutation, useCheckConversationMutation } = conversationsApi;
