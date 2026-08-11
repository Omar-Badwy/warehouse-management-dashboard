import { configureStore } from '@reduxjs/toolkit'

import categoriesReducer from '../features/slices/categoriesSlice'
import ordersReducer from '../features/slices/ordersSlice'
import productsReducer from '../features/slices/productsSlice'
import clientsReducer from '../features/slices/clientsSlice'
import authReducer from '../features/slices/authSlise'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    clients: clientsReducer,
    categories: categoriesReducer,
    orders: ordersReducer,
  },

})