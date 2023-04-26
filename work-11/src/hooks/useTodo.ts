import { useCallback, useContext, useEffect } from "react";
import { ITodo } from "../libs/todo";
import { todoContext } from "./store";
export default function useTodo() {
  let { todos,showFooter,todo,setTodos,setFooter,setTodo } = useContext(todoContext);
  // 全局的设置底部开关按钮
  const changeFooter = useCallback((isActive: boolean)=>{
    setFooter(isActive)
  },[setFooter])
  // 获取当前选中的任务
  const getTodo = useCallback((todo:ITodo)=>{
    setTodo(todo)
  },[setTodo])
  // 获取任务列表
  const listTodos = useCallback(() => {
    if (localStorage.getItem("todos")) {
      let Itodos = JSON.parse(localStorage.getItem("todos")!);
      setTodos(Itodos)
    } else {
      setTodos([])
    }
  }, [setTodos]);
  // 增加任务
  const addTodos = useCallback(
    (Itodo: ITodo) => {
      if (!localStorage.getItem("todos")) {
        localStorage.setItem("todos", JSON.stringify([Itodo]));
        setTodos([Itodo])
      } else {
        let Itodos = JSON.parse(localStorage.getItem("todos")!);
        localStorage.setItem("todos", JSON.stringify([Itodo,...Itodos ]));
        setTodos([Itodo,...Itodos ])
      }
    },
    [setTodos]
  );
  // 重点项目切换
  const starTodos = useCallback(
    (Itodo: ITodo) => {
      let Itodos = JSON.parse(localStorage.getItem("todos")!);
      Itodos.find((item: ITodo) => item.id === Itodo.id).star = !Itodos.find(
        (item: ITodo) => item.id === Itodo.id
      ).star;
      localStorage.setItem("todos", JSON.stringify(Itodos));
      setTodos(Itodos)
      changeFooter(false)
    },
    [setTodos,changeFooter]
  );
  // 是否完成
  const doneTodos = useCallback(
    (Itodo: ITodo) => {
      let Itodos = JSON.parse(localStorage.getItem("todos")!);
      Itodos.find((item: ITodo) => item.id === Itodo.id).finished = !Itodos.find(
        (item: ITodo) => item.id === Itodo.id
      ).finished;
      localStorage.setItem("todos", JSON.stringify(Itodos));
      setTodos(Itodos)
      changeFooter(false)
    },
    [ setTodos,changeFooter]
  );
  // 删除任务
  const delTodos = useCallback(
    (Itodo: ITodo) => {
      let Itodos = JSON.parse(localStorage.getItem("todos")!);
      let result = Itodos.filter((item:ITodo)=>item.id!==Itodo.id)
      localStorage.setItem("todos", JSON.stringify(result));
      setTodos(result)
      changeFooter(false)
    },
    [setTodos,changeFooter]
  );
  useEffect(() => {
    listTodos();
    getTodo({
      id: '',
    content: '',
    star: false,
    finished: false,
    })
    changeFooter(false)
  }, [listTodos,changeFooter,getTodo]);
  return {
    todos,
    todo,
    showFooter,
    addTodos,
    starTodos,
    doneTodos,
    delTodos,
    getTodo,
    changeFooter
  };
}
