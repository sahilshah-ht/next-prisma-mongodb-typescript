import { createSlice } from "@reduxjs/toolkit";
import { UiState } from ".";
import { uiActions } from "./ui.actions";
const initialState: UiState = {
    sidebar: {
        isOpen: true
    }
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: uiActions,
});

export const {
    toggleSidebar
} = uiSlice.actions;


export const uiReducer = uiSlice.reducer;