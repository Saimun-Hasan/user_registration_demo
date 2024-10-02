import { apiSlice } from './ApiSlice';

const USERS_URL = 'http://localhost:5000/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),

        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} = usersApiSlice;