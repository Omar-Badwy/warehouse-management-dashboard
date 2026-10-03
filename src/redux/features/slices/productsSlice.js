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

            state.products.push({id: uuidv4(), name: name, categoryId: categoryId, count: Number(count), 
                price: Number(price), createdAt: date, updatedAt: null,})
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

        editCompletedOrder: (state, action) => {

            const {orderData,orderItems} = action.payload

            if (orderData.status !== "completed") return;

            for (const orderProduct of orderData.products ) {

                const product = state.products.find(
                    (product) => product.id === orderProduct.productId
                )

                for(const orderProductItems of orderItems){

                    if(orderProduct.productId === orderProductItems.productId){
                        
                        if(orderProduct.quantity < orderProductItems.quantity){

                            const currntQty = Number(orderProductItems.quantity) - Number(orderProduct.quantity)

                            product.count -= currntQty

                        } 
                        
                        else if(orderProduct.quantity > orderProductItems.quantity) {

                            const currntQty =  Number(orderProduct.quantity) - Number(orderProductItems.quantity)

                            product.count += currntQty
                        }

                    } 

                }

            }

            // # New Products Added to the Order

                for (const newProduct of orderItems) {

                    const oldProduct = orderData.products.find(
                        (product) => product.productId === newProduct.productId
                    );

                    if (!oldProduct) {
                        const product = state.products.find(
                            (product) => product.id === newProduct.productId
                        );

                        if (product) {
                            product.count -= Number(newProduct.quantity);
                        }
                    }
                }
                 
                // # Deleted Products from the Order
                
                for (const oldProduct of orderData.products) {

                    const newProduct = orderItems.find(
                        (product) => product.productId === oldProduct.productId
                    );

                    if (!newProduct) {
                        const product = state.products.find(
                            (product) => product.id === oldProduct.productId
                        );

                        if (product) {
                            product.count += Number(oldProduct.quantity);
                        }
                    }
                }
            
            localStorage.setItem("proData",JSON.stringify(state.products))
        },

        completeOrder: (state, action) => {

            const {data,status,oldStatus} = action.payload
            
            for (const orderProduct of data) {

                const product = state.products.find(
                    (product) => product.id === orderProduct.productId
                )

                if (product) {

                    if(status === "completed" && oldStatus !== "completed") { product.count -= Number(orderProduct.quantity) }
                    if(status === "cancelled" && oldStatus === "completed") { product.count += Number(orderProduct.quantity) }
                    if(status === "pending" && oldStatus === "completed") { product.count += Number(orderProduct.quantity) }
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

export const {
        add, 
        edit , 
        dlt , 
        dltAll, 
        dltAllWithCatId, 
        deleteProductsByCategory, 
        completeOrder, 
        cancleOrder,
        editCompletedOrder,

    } = productSlice.actions

export default productSlice.reducer