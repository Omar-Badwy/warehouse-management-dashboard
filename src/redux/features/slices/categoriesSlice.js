import { v4 as uuidv4 } from 'uuid';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: JSON.parse(localStorage.getItem("catData")) || []
}

export const categorySlice  = createSlice({
    name:"categories",
    initialState,

    reducers: {

         addCat: (state,action) => {

            const {name} = action.payload.data

            const date = new Date()
            const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true }

            state.categories.push({id: uuidv4(), name: name, created: date.toLocaleTimeString('en-US', options), updated: null,})
            localStorage.setItem("catData",JSON.stringify(state.categories))
            
        },

        editCat: (state, action) => {
            const categoryInput = action.payload.data

            for(let category of state.categories){
                if(categoryInput.id === category.id){
                    const date = new Date()
                    const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true }

                    category.name = categoryInput.name
                    category.updated = date.toLocaleTimeString('en-US', options)
                }
            }
            localStorage.setItem("catData",JSON.stringify(state.categories))
        },

        dltCat: (state, action) => {
            const id = action.payload.id
            state.categories = state.categories.filter( (category) => category.id !== id);
            localStorage.setItem("catData",JSON.stringify(state.categories))

        },

    },
})

export const {
    addCat, 
    editCat, 
    dltCat, 
    increaseCat, 
    editCountCat, 
    decreaseCat
} = categorySlice.actions

export default categorySlice.reducer