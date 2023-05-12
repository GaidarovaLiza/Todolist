import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type TsarType = AddTodolistType | RemoveTodolistType | ChangeTodolistTitleType | ChangeFilterType

export const todolistReducer = (state: TodolistType[], action: TsarType) => {
    switch (action.type) {
        case 'ADD_TODOLIST': {
            const newTodolist: TodolistType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: "all"
            };
            return [...state, newTodolist];
        }
        case
        "REMOVE_TODOLIST"
        : {
            const filteredState = state.filter(tl => tl.id != action.payload.id)
            return filteredState
        }
        case
        "CHANGE_TODOLIST_TITLE"
        : {
            const todolist = state.map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
            return todolist
        }
        case
        "CHANGE_FILTER"
        : {
            const todolistId = action.payload.todolistId;
            const newFilterValue = action.payload.value;
            return state.map(t => t.id === todolistId ? {...t, filter: newFilterValue} : t)
        }
        default : {
            return state
        }
    }
}

type AddTodolistType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (title: string, id: string) => {
    return {
        type: "ADD_TODOLIST",
        payload: {
            title,
            id,
        }
    } as const
}

type RemoveTodolistType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE_TODOLIST",
        payload: {
            id
        }
    } as const
}

type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        payload: {
            id,
            title
        }
    } as const
}

type ChangeFilterType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE_FILTER",
        payload: {
            value,
            todolistId
        }
    } as const
}