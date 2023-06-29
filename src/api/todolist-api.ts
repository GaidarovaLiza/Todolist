import axios from "axios"

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {}
    }
)

export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodoList(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    updateTodoList(todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
    },
}


type TodolistType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}
