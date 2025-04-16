import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        authUser:null,
        isLoggedIn:false,
        isSigningUp:false,
        isLoggingIn:false,
        error:null
    },
    reducers:{},
    
})

export default authSlice.reducer