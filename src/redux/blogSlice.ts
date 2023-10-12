import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface BlogState {
    blogs: Array<any>,
    singleBlog: any,
    loading: boolean,
    error: string | undefined,
    keyword: string,
}

interface BlogData {
    id: number,
    title: string,
    content: string,
}

interface SingleBlogData {
    id: string | undefined;
}

interface DeleteBlogData {
    id: string | undefined;
}

const initialState: BlogState = {
    blogs: [],
    singleBlog: {},
    loading: false,
    error: "",
    keyword: "",
}


export const fetchBlogs = createAsyncThunk("fetchBlogs", async () => {
    const response = await fetch("http://localhost:8000/blogs");
    const data = await response.json();
    return data;
});

export const fetchSingleBlog = createAsyncThunk("fetchSingleBlog", async ({ id }: SingleBlogData) => {
    const response = await fetch(`http://localhost:8000/blogs/${id}`);
    const data = await response.json();
    return data;
});

export const postBlogs = createAsyncThunk("postBlogs", async ({ id, title, content }: BlogData) => {
    const response = await fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, content }),
    });
    const data = await response.json();
    return data;

});

export const deleteBlogs = createAsyncThunk("deleteBlogs", async ({ id }: DeleteBlogData) => {
    const response = await fetch(`http://localhost:8000/blogs/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    return data;
});

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        searchBlogFunc: (state, action) => {
            state.keyword = action.payload;
        },
    },
    extraReducers: (builder) => {
        // FETCH BLOGS
        builder.addCase(fetchBlogs.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.blogs = action.payload;
        });
        builder.addCase(fetchBlogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        // FETCH SINGLE BLOG
        builder.addCase(fetchSingleBlog.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(fetchSingleBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.singleBlog = action.payload;
        });
        builder.addCase(fetchSingleBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        // POST
        builder.addCase(postBlogs.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(postBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.blogs = [...state.blogs, action.payload]
        });
        builder.addCase(postBlogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        // DELETE
        builder.addCase(deleteBlogs.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.blogs = state.blogs.filter((blog) => blog.id !== action.meta.arg.id);
        });
        builder.addCase(deleteBlogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
})

export const { searchBlogFunc } = blogSlice.actions


export default blogSlice.reducer