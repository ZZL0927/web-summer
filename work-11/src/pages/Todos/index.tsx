import React, { FormEvent, useState,KeyboardEvent } from "react";
import { ReactComponent as IconHome } from "../../../src/assets/imgs/home.svg";
import { ReactComponent as IconAdd } from "../../../src/assets/imgs/add.svg";
import useTodo from "../../hooks/useTodo";
import Content from '../../component/Item'
import { v4 as uuidv4 } from "uuid";
import styles from "./index.module.scss";
import { ITodo } from "../../libs/todo";
export default function Todos() {
  let { todos,addTodos } = useTodo();
  const [content, setContent] = useState("");
  
  const getTodos = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && content.length > 0) {
      let todoItem = {
        id: uuidv4(),
        content:content,
        star:false,
        finished:false
      };
      setContent('')
      addTodos(todoItem)
    }
  };
  return (
    <div className={styles.outer}>
    <div className={styles.todo}>
      <header className={styles.header}>
        <IconHome />
        任务
      </header>
      <Content todos={todos.filter((item:ITodo)=>item.finished===false)}></Content>
      <div className={styles.footer}>
        <IconAdd />
        <input
          value={content}
          type="text"
          placeholder="添加任务"
          onChange={(e: FormEvent) => {
            if ((e.target as HTMLInputElement).value.includes(" ")) return;
            setContent((e.target as HTMLInputElement).value);
          }}
          onKeyDown={getTodos}
        />
      </div>
    </div>
    </div>
  );
}
