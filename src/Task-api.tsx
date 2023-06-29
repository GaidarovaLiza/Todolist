import React, {useEffect, useState} from 'react'
import {taskAPI} from "./api/task-api";


export default {
    title: 'API'
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const todoId = '17c9fa09-057c-4d70-9fb1-ded2c8d54d34'

    useEffect(() => {
        taskAPI.getTask(todoId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState(null)
    const todoId = '17c9fa09-057c-4d70-9fb1-ded2c8d54d34'
    const title = 'REDUX'

    useEffect(() => {
        taskAPI.createTask(todoId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const deleteTask = () => {
    const [state, setState] = useState(null)
    const todoId = '17c9fa09-057c-4d70-9fb1-ded2c8d54d34'
    const taskId = '17c9fa09-057c-4d70-9fb1-ded2c8d54d24'

    useEffect(() => {
        taskAPI.deleteTask(todoId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState(null)
    const todoId = '17c9fa09-057c-4d70-9fb1-ded2c8d54d34'
    const taskId = '17c9fa09-057c-4d70-9fb1-ded2c8d54d24'
    const title = 'REACT'

    useEffect(() => {
        taskAPI.updateTask(todoId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}