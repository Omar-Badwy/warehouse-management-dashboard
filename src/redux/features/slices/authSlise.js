import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    user : JSON.parse(localStorage.getItem("user")) || {name: "omar",email: "admin.com",password: "123456"},
    isAuth: !!localStorage.getItem("user"),
     
}

export const authSlice  = createSlice({
    name:"auth",
    initialState,

    reducers: {

        updateUser: (state,action) => {

            const {data, password} = action.payload

            const defaultUser = {
                name: data.name,
                email: data.email,
                password: password,
            }

            state.user = defaultUser

            localStorage.setItem("user",JSON.stringify(state.user))

        },

        updatePassword: (state,action) => {
            const confirmPassword = action.payload
            state.user.password = confirmPassword
            
            localStorage.setItem("user",JSON.stringify(state.user))
            
        },

        login: (state,action) => {

            const data = action.payload

            const defaultUser = {
                name: data.name,
                email: data.email,
                password: data.password,
            }

            state.user = defaultUser
            state.isAuth = true;

            localStorage.setItem("user",JSON.stringify(state.user))
        },

        logout: (state) => {
            state.isAuth = false
        },
    },
})

export const { login, logout, updateUser, updatePassword,} = authSlice.actions
export default authSlice.reducer