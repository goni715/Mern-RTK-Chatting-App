import {apiSlice} from "../api/apiSlice.js";


export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => `/user/get-all-users`
        }),
    }),
})

export const { useGetAllUsersQuery } = usersApi;
