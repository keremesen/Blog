import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
    modal: boolean;
}

const initialState: ModalState = {
    modal: false,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        modalFunc: (state) => {
            state.modal = !state.modal;
        },
    },
});

export const { modalFunc } = modalSlice.actions;

export default modalSlice.reducer;