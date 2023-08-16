import {apiSlice} from "../api/apiSlice.js";
import {SuccessToast} from "../../../helper/ValidationHelper.js";
import {SetMessages} from "./messagesSlice.js";
import {conversationsApi} from "../conversations/conversationsApi.js";


export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) =>
                `/message/get-messages/${id}`,
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                    dispatch(SetMessages(res?.data?.data))
                }catch(err) {
                    //do nothing
                    console.log(err);
                }
            },
        }),
        addNewMessage: builder.mutation({
            query: (data) => ({
                url: "/message/add-new-message",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){

                // optimistic cache update start
               const pathResult1 = dispatch(
                    conversationsApi.util.updateQueryData(
                        "getConversations",
                        arg.senderId.toString(),//tag/id
                        (draft) => {
                            //draft.data ///getConversations Array// My data
                            //alert(JSON.stringify(draft.data))
                            const conversations = draft.data.filter((cv)=> cv._id !== arg.conversationId.toString());
                            const draftConversation = draft.data.find((cv)=>cv._id === arg.conversationId.toString());
                            draftConversation.text = arg.text;
                            draftConversation.updatedAt = new Date().toISOString();
                            draft.data = [draftConversation, ...conversations];
                            //draft.data.push(arg);
                        }
                    )
                );
                // optimistic cache update end

                // optimistic cache update start
               const pathResult2 = dispatch(
                    messagesApi.util.updateQueryData(
                        "getMessages",
                        arg.conversationId.toString(),//tag/id
                        (draft) => {
                            //draft.data ///getMessages Array// My data
                            arg.updatedAt = new Date().toISOString();
                            draft.data.push(arg);
                        }
                    )
                );
                // optimistic cache update end

                try{
                    const res = await queryFulfilled;
                    //SuccessToast("Message Send Success");
                }catch(err) {
                    //do nothing
                    pathResult1.undo();
                    pathResult2.undo();
                }
            },
        })
    }),
})


export const {useGetMessagesQuery, useAddNewMessageMutation} = messagesApi;