import {TasksStateType, TodolistType} from "../AppWithRedax";
import {taskReducer} from "./taskReducer";
import {addTodolistAC, todolistReducer} from "./todolistReducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.ID);
    expect(idFromTodolists).toBe(action.payload.ID);
});