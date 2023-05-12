import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {TasksStateType} from "../App";
import {addTodolistAC} from "./todolistReducer";

type TsarType =
    AddTaskType
    | RemoveTaskType
    | ChangeStatusTaskType
    | ChangeTaskTitleType
    | RemoveTodolistType
    | AddTodolistType

export const taskReducer = (state: TasksStateType, action: TsarType) => {
    switch (action.type) {
        case 'ADD_TASK' : {
            const todolistId = action.payload.todolistId;
            const task = {id: v1(), title: action.payload.title, isDone: false};
            const tasks = [task, ...state[todolistId]];
            return {
                ...state,
                [todolistId]: tasks
            };
        }
        case "REMOVE_TASK": {
            const todolistId = action.payload.todolistId;
            const updatedTasks = state[todolistId].filter(t => t.id !== action.payload.id);
            return {
                ...state,
                [todolistId]: updatedTasks
            };
        }
        case "CHANGE_STATUS": {
            const todolistId = action.payload.todolistId;
            const taskId = action.payload.id;
            const isDone = action.payload.isDone;
            const updatedTasks = state[todolistId].map(t => {
                if (t.id === taskId) {
                    return {...t, isDone: isDone};
                } else {
                    return t;
                }
            });
            return {
                ...state,
                [todolistId]: updatedTasks
            };
        }
        case "CHANGE_TITLE": {
            const todolistId = action.payload.todolistId;
            const taskId = action.payload.id;
            const title = action.payload.newTitle;
            const updatedTitle = state[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)
            return {
                ...state,
                [todolistId]: updatedTitle
            }
        }
        case "REMOVE_TODOLIST": {
            delete state[action.payload.id];
            return {
                ...state
            }
        }
        case "ADD_TODOLIST": {
            let newTodolistId = action.payload.id
            return {
                ...state,
                [newTodolistId]: []
            }
        }
        default:
            return state
    }

}

type AddTaskType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

type RemoveTaskType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE_TASK",
        payload: {
            id,
            todolistId
        }

    } as const
}

type  ChangeStatusTaskType = ReturnType<typeof changeStatusAC>

export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE_STATUS",
        payload: {
            id,
            isDone,
            todolistId
        }
    } as const
}

type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: "CHANGE_TITLE",
        payload: {
            id,
            newTitle,
            todolistId,
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

type AddTodolistType = ReturnType<typeof addTodolistAC>

// export const addTodolistAC = (title: string, id: string) => {
//     return {
//         type: "ADD_TODOLIST",
//         payload: {
//             title,
//             id
//         }
//     } as const
// }