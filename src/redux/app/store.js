import { configureStore } from '@reduxjs/toolkit'

import categoriesReducer from '../features/slices/categoriesSlice'
import ordersReducer from '../features/slices/ordersSlice'
import productsReducer from '../features/slices/productsSlice'


export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    orders: ordersReducer,
  },

})