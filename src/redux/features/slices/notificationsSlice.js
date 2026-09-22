import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    notifications: JSON.parse(localStorage.getItem("notifications")) || [],

    notsProperties: JSON.parse(localStorage.getItem("notificationsProperties")) || {
        allowNotifications: true,
        allowSounds: true,
        allowPopNotifications: true,
    },
} 

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,

    reducers: {

        updateNotsProperties: (state,action) => {
            const property = action.payload

            state.notsProperties[property] =
                !state.notsProperties[property];

            localStorage.setItem("notificationsProperties",JSON.stringify(state.notsProperties))

        },

        addNotification: (state,action) => {
            const notification = action.payload

            if(state.notsProperties.allowNotifications){

                state.notifications.unshift({
                    id: uuidv4(), 
                    type: notification.type,
                    title: notification.title,
                    message: notification.message,
                    read: false,
                    createdAt: new Date(),
                })
    
                localStorage.setItem("notifications",JSON.stringify(state.notifications))
            }
        },

        dltNotification: (state,action) => {
            const id = action.payload

            state.notifications = state.notifications.filter( (not) => not.id !== id)

            localStorage.setItem("notifications",JSON.stringify(state.notifications))

        },

        markAsRead: (state,action) => {
            const id = action.payload

            for( let not of state.notifications){
                if(not.id === id){
                    not.read = true
                }
            }

            localStorage.setItem("notifications",JSON.stringify(state.notifications))
        },

        markAllAsRead: (state,action) => {

            for( let not of state.notifications){
                not.read = true
            }

            localStorage.setItem("notifications",JSON.stringify(state.notifications))
        },

        clearAllNotifications: (state,action) => {
            state.notifications = []
            localStorage.setItem("notifications",JSON.stringify(state.notifications))
        },
    },

})

export const { 
            addNotification, 
            dltNotification, 
            markAsRead, 
            markAllAsRead,
            clearAllNotifications,
            updateNotsProperties,
    } = notificationsSlice.actions

export default notificationsSlice.reducer