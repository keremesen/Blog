import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Blog {
    id: string,
    title: string,
    content: string,
}

type BlogsResponse = Blog[];

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
    tagTypes: ["Blog"],
    endpoints: (builder) => ({
        fetchBlogs: builder.query<BlogsResponse, void>({
            query: () => "blogs",
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Blog' as const, id })),
                        { type: 'Blog', id: 'LIST' },
                    ]
                    : [{ type: 'Blog', id: 'LIST' }],
        }),
        fetchSingleBlog: builder.query<Blog, string>({
            query: (id) => `blogs/${id}`,
        }),
        addBlog: builder.mutation<Blog, Partial<Blog>>({
            query: (body) => ({
                url: "blogs",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
        }),
        deleteBlog: builder.mutation<Blog, string>({
            query: (id) => ({
                url: `blogs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
        }),
    }),


})

export const { useFetchBlogsQuery, useFetchSingleBlogQuery, useAddBlogMutation, useDeleteBlogMutation } = apiSlice; 