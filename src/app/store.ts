import { configureStore } from '@reduxjs/toolkit'
import blogSlice from './features/blog/blogSlice'
import modalSlice from './features/modal/modalSlice'
import { apiSlice } from './features/blog/blogsApi'

export const store = configureStore({
    reducer: {
        blogs: blogSlice,
        modal: modalSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch