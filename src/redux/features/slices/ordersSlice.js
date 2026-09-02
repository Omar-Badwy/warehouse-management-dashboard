import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    orders : JSON.parse(localStorage.getItem("ordData")) || [],
}

const generateOrderId = (orders) => {
    if (orders.length === 0) {
        return "0001";
    }

    const lastId = Math.max(
        ...orders.map((order) => Number(order.id))
    );

    return String(lastId + 1).padStart(4, "0");
};


export const orderSlice  = createSlice({
    name:"orders",
    initialState,

    reducers: {

        addOrder: (state,action) => {

            const { orderInput,orderItems } = action.payload

            state.orders.push({id: generateOrderId(state.orders) , clientId: orderInput.clientId, products: orderItems, status: orderInput.status,
                createdAt: new Date(), updatedAt: null,})
            
            localStorage.setItem("ordData",JSON.stringify(state.orders))
        },

        editOrder: (state,action) => {

            const { id, items } = action.payload

            for(let order of state.orders){
                if(order.id === id){
                    order.products = items
                    order.updatedAt = new Date()
                }
            }
            
            localStorage.setItem("ordData",JSON.stringify(state.orders))
        },

        updateStatusOrder: (state,action) => {

            const { id, status } = action.payload

            for(let order of state.orders){
                if(order.id === id){
                    order.status = status
                    order.updatedAt = new Date()
                }
            }
            
            localStorage.setItem("ordData",JSON.stringify(state.orders))
        },

        dltOrder: (state,action) => {
            const { id } = action.payload
            state.orders = state.orders.filter( (ord) => ord.id !== id)
            localStorage.setItem("ordData",JSON.stringify(state.orders))
        },
    },
})

export const { addOrder, editOrder, updateStatusOrder, dltOrder,} = orderSlice.actions

export default orderSlice.reducer