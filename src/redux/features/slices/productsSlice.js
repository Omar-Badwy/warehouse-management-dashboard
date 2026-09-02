import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';


    const initialState = {
        products: JSON.parse(localStorage.getItem("proData")) || []
    }

export const productSlice  = createSlice({
    name:"products",
    initialState,

    reducers: {

        add: (state,action) => {

            const { name,categoryId,count,price } = action.payload.data

            const date = new Date()

            state.products.push({id: uuidv4(), name: name, categoryId: categoryId, count: count, 
                price: price, createdAt: date, updatedAt: null,})
            localStorage.setItem("proData",JSON.stringify(state.products))
            
        },

        edit: (state, action) => {
            const productInput = action.payload.data
            
            const date = new Date()

            for(let product of state.products){
                if(productInput.id === product.id){
                    product.name = productInput.name
                    product.categoryId = productInput.categoryId
                    product.count = productInput.count
                    product.price = productInput.price
                    product.updatedAt = date
                }
            }
            localStorage.setItem("proData",JSON.stringify(state.products))
        },

        decreasePro: (state, action) => {
            
            for (const orderProduct of action.payload) {

            const product = state.products.find(
                (product) => product.id === orderProduct.productId
            )

            if (product) {
                product.count -= orderProduct.quantity
            }
        }
            // localStorage.setItem("proData",JSON.stringify(state.products))
        },

        dlt: (state, action) => {
            const id = action.payload.id
            state.products = state.products.filter( (product) => product.id !== id);
            localStorage.setItem("proData",JSON.stringify(state.products))

        },

        dltAll: (state) => {
            state.products = []
            localStorage.setItem("proData",JSON.stringify(state.products))
        },

        dltAllWithCatId: (state,action) => {
            const categoryId = action.payload

            state.products = state.products
                .filter( (pro) => pro.categoryId !== categoryId)
            localStorage.setItem("proData",JSON.stringify(state.products))

        },

        deleteProductsByCategory: (state,action) => {
            const id = action.payload.id
            state.products = state.products.filter( (product) => product.categoryId !== id);
            localStorage.setItem("proData",JSON.stringify(state.products))
        },
    },
})

export const {add, edit , dlt , dltAll, dltAllWithCatId, deleteProductsByCategory, decreasePro,} = productSlice.actions

export default productSlice.reducer