import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false, //by default no user is signed in
    email:null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.email = action.payload.email
            state.status = true
        },
        logout:(state,action)=>{
            state.email=null
            state.status=false
        }
    }
})

export const {login,logout} = authSlice.actions
export default authSlice.reducer