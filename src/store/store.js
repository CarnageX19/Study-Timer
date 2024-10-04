import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../features/ThemeSlice'
import authReducer from '../features/AuthSlice'

export const store = configureStore({
    reducer:{
        theme:themeReducer,
        auth:authReducer
    }
})