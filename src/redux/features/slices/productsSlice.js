import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: JSON.parse(localStorage.getItem("proData")) || []
}

export const productSlice  = createSlice({
    name:"products",
    initialState,

    reducers: {

        add: (state,action) => {

            const {name,category,count,price} = action.payload.data
            state.products.push({id: Date.now(), name: name, category: category, count: count, price: price,})
            localStorage.setItem("proData",JSON.stringify(state.products))
            
        },

        edit: (state, action) => {
            const editProduct = action.payload.data

            for(let product of state.products){
                if(editProduct.id === product.id){
                    console.log("the id is correct")
                    product.name = editProduct.name
                    product.category = editProduct.category
                    product.count = editProduct.count
                    product.price = editProduct.price
                }
            }
            localStorage.setItem("proData",JSON.stringify(state.products))
        },

        dlt: (state, action) => {
            const id = action.payload.id
            state.products = state.products.filter( (product) => product.id !== id);
            localStorage.setItem("proData",JSON.stringify(state.products))

        },

        dltAll: (state) => {
            state.products = []
            localStorage.setItem("proData",JSON.stringify(state.products))
        }
    },
})

export const {add, edit , dlt , dltAll} = productSlice.actions

export default productSlice.reducer