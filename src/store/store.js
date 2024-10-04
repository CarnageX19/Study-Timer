import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../features/ThemeSlice'

export const store = configureStore({
    reducer:{
        themeSwitcher:themeReducer
    }
})