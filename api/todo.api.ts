import { IAddTodo, IData, IEditTodo, IResponse } from '@/types/todo.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const img_url = 'https://to-dos-api.softclub.tj/images'

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://to-dos-api.softclub.tj/api/' }),
  endpoints: (build) => ({
    getTodo: build.query<IResponse,unknown>({
      query: () => `to-dos`,
    }),
    deleteTodo: build.mutation<IResponse,number>({
        query: (id:number) => ({
            url: `to-dos?id=${id}`,
            method: 'DELETE',
            // body: patch,
        }),
    }),
    addTodo: build.mutation<IResponse, IAddTodo>({
        query: ({name, description, images}) => {
            const formData = new FormData()
            formData.append('Name', name)
            formData.append('Description', description)
            images.forEach((image) => formData.append('Images', image))
            return {
                url: 'to-dos', 
                method: 'POST',
                body: formData,
            }
        }
    }),
    editTodo: build.mutation<IResponse, IEditTodo>({
        query: (todo) => ({
            url: 'to-dos',
            method: 'PUT',
            body: todo,
        })
    }),
    getTodoById: build.query<IResponse<IData>, number>({
        query: (todoId) => `to-dos/${todoId}`,
    }),
    addTodoImages: build.mutation<IResponse, { todoId: number; images: File[] }>({
        query: ({ todoId, images }) => {
            const formData = new FormData()
            images.forEach((image) => formData.append('Images', image))
            return {
            url: `to-dos/${todoId}/images`,
            method: 'POST',
            body: formData,
            }
        },
    }),
    deleteTodoImage: build.mutation<IResponse, number>({
        query: (imageId) => ({
            url: `to-dos/images/${imageId}`,
            method: 'DELETE',
        }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodoQuery, useDeleteTodoMutation, useAddTodoMutation, useEditTodoMutation, useGetTodoByIdQuery, useAddTodoImagesMutation, useDeleteTodoImageMutation } = todoApi