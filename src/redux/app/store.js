import { configureStore } from '@reduxjs/toolkit'

import categoriesReducer from '../features/slices/categoriesSlice'
import ordersReducer from '../features/slices/ordersSlice'
import productsReducer from '../features/slices/productsSlice'
import clientsReducer from '../features/slices/clientsSlice'
import authReducer from '../features/slices/authSlise'
import notificationsReducer from '../features/slices/notificationsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    clients: clientsReducer,
    categories: categoriesReducer,
    orders: ordersReducer,
    notifications: notificationsReducer,
  },

})