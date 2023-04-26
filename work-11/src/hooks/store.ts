import { createContext } from 'react'
import {ITodo} from '../libs/todo'
interface FooterContext {
  showFooter: boolean
  setFooter: (isActive: boolean) => void
}
interface TodoContext {
  todos: ITodo[]
  setTodos: (todos: ITodo[]) => void
}
interface ItemContext {
  todo: ITodo
  setTodo: (todo: ITodo) => void
}
const todoContext = createContext<ItemContext&TodoContext&FooterContext>({
  todos: [],
  setTodos:()=>{},
  showFooter: false,
  setFooter: () => {},
  todo:{id:"",
    content:"",
    star:false,
    finished:false},
  setTodo:()=>{}
})
const TodoProvider = todoContext.Provider 
export { todoContext,TodoProvider}