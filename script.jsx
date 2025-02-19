import todoReducer from "./todoReducer.js"
import {createStore} from "redux"

const store = createStore(todoReducer)

store.subscribe(() => {
    updateTodoList()
})

const todoInput = document.querySelector("#todoInput")
const addTodo = document.querySelector("#addTodo")
const todoList = document.querySelector("#todoList")

const addTodoHandler = () => {
    const todoValue = todoInput.value
    if(todoValue){
        store.dispatch({type: "ADD_TODO", payload: todoValue})
    }
}

addTodo.addEventListener("click", addTodoHandler)

window.removeTodoHandler = (todoIndex) => {
    console.log(todoIndex)
    if(todoIndex){
        store.dispatch({type: "REMOVE_TODO", payload: todoIndex})
    }
}

const updateTodoList = () => {
    const state = store.getState()
    todoList.innerHTML = state.todos.map((todo, index) => {return `<li>${todo} <button onClick="removeTodoHandler(${index})">Remove</button></li>`})
}

updateTodoList()