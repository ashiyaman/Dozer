import {createStore} from "redux"
import todoReducer from "./todoReducer.js"
import { addTodo, removeTodo } from "./actions.js"

const store = createStore(todoReducer)

store.subscribe(() => {
    updateTodoList()
})

const todoInput = document.querySelector("#todoInput")
const addTodoBtn = document.querySelector("#addTodo")
const todoList = document.querySelector("#todoList")

const addTodoHandler = () => {
    const todoValue = todoInput.value
    if(todoValue){
        store.dispatch(addTodo(todoValue))       
    }
}

addTodoBtn.addEventListener("click", addTodoHandler)

window.removeTodoHandler = (todoIndex) => {
    if(todoIndex){
        store.dispatch(removeTodo(todoIndex))
    }
}

const updateTodoList = () => {
    const state = store.getState()
    todoList.innerHTML = state.todos.map((todo, index) => {return `<li>${todo} <button onClick="removeTodoHandler(${index})">Remove</button></li>`})
}

updateTodoList()