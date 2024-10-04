import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme:"light"
}

export const ThemeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        changeTheme:(state,action)=>{
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
})


export const {changeTheme} = ThemeSlice.actions

export default ThemeSlice.reducer