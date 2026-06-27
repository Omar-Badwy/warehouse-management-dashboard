import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    user : JSON.parse(localStorage.getItem("user")) || null,
    isAuth: !!localStorage.getItem("user"),
     
}

export const authSlice  = createSlice({
    name:"auth",
    initialState,

    reducers: {
        login: (state,action) => {

            state.user = action.payload
            state.isAuth = true;

            localStorage.setItem("user",JSON.stringify(action.payload))
        },

        logout: (state) => {

            state.user = null
            state.isAuth = false

            localStorage.removeItem("user");
        },
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer