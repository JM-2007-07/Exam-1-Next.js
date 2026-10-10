import { todoApi } from '@/api/todo.api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
})

// Infer the `RootState`, `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store