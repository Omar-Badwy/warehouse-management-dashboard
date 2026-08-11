import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

    const initialState = {
        clients: JSON.parse(localStorage.getItem("clientsData")) || []
    }

    const getCurrentDate = () => {
        const date = new Date();

        return date.toLocaleString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    };

export const clientsSlice  = createSlice({
    name:"clients",
    initialState,

    reducers: {

        addClient: (state,action) => {
            
            const { name,phone,email,address } = action.payload.data

            state.clients.push({id: uuidv4(), name: name, phone: phone, email: email, 
                address: address, createdAt: getCurrentDate() , updatedAt: null,})

            localStorage.setItem("clientsData",JSON.stringify(state.clients))
        },

        editClient: (state,action) => {

            const clientInput = action.payload.data

            for(let client of state.clients){
                if(clientInput.id === client.id){
                    client.name = clientInput.name
                    client.phone = clientInput.phone
                    client.email = clientInput.email
                    client.address = clientInput.address
                    client.updatedAt = getCurrentDate()
                }
            }

            localStorage.setItem("clientsData",JSON.stringify(state.clients))
        },

        dltClient: (state,action) => {

            const { id } = action.payload
            state.clients = state.clients.filter( (client) => client.id !== id);
            localStorage.setItem("clientsData",JSON.stringify(state.clients))
        },
    },
})

export const { addClient, editClient, dltClient,} = clientsSlice.actions

export default clientsSlice.reducer