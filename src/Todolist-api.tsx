import React, {useEffect, useState} from 'react'
import {todoListAPI} from "./api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const promise = todoListAPI.getTodoLists()
        promise.then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'REACT'

        todoListAPI.createTodoList(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '3e810bc9-4bf1-410b-986c-822ddc7005c5'

        todoListAPI.deleteTodoList(todoId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '17c9fa09-057c-4d70-9fb1-ded2c8d54d34'
        const title = 'REDUX'

        todoListAPI.updateTodoList(todoId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
