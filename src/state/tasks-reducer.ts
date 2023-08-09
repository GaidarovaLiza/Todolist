import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsACType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        case "SET-TODOS": {
            const copyState = {...state}
            action.todos.forEach((td) => {
                copyState[td.id] = []
            })
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

//actions

export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskId: string, model: UpdateTaskModelType, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', model, todolistId, taskId} as const)
export const changeTaskTitleAC = (taskId: string, model: UpdateTaskModelType, todolistId: string) =>
    ({type: 'CHANGE-TASK-TITLE', model, todolistId, taskId} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

//thunks

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const deleteTasksTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const createTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTasksTC = (taskId: string, todolistId: string, data: FlexType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find((t) => t.id === taskId)

    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            deadline: task.deadline,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            status: task.status,
            ...data
        }

        todolistsAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(taskId, model, todolistId))
                dispatch(changeTaskTitleAC(taskId, model, todolistId))
            })
    }
}

//types

interface FlexType {
    title?: string
    deadline?: string
    startDate?: string
    priority?: TaskPriorities
    description?: string
    status?: TaskStatuses
}

type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsACType
    | ReturnType<typeof setTasksAC>


