import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    orders : {},
}

export const orderSlice  = createSlice({
    name:"orders",
    initialState,

    reducers: {

    },
})

export default orderSlice.reducer