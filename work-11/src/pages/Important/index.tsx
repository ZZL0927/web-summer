import React from 'react'
import {ReactComponent as IconImportant} from "../../../src/assets/imgs/star.svg"
import styles from './index.module.scss'
import Content from '../../component/Item'
import useTodo from '../../hooks/useTodo';
import { ITodo } from '../../libs/todo';
export default function Important() {
  let { todos } = useTodo();
  return (
    <div className={styles.important}>
      <header className={styles.header}><IconImportant />重要</header>
      <Content todos={todos.filter((item:ITodo)=>item.star===true)} ></Content>
    </div>
  )
}
