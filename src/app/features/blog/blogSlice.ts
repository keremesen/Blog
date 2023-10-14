import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface BlogState {
    keyword: string;
}

const initialState: BlogState = {
    keyword: "",
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        searchBlogFunc: (state, action: PayloadAction<string>) => {
            state.keyword = action.payload;
        },
    },
});

export const { searchBlogFunc } = blogSlice.actions;

export default blogSlice.reducer;