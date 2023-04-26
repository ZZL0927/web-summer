import React from 'react'
import {ReactComponent as IconFinished} from "../../../src/assets/imgs/finished.svg"
import styles from './index.module.scss'
import Content from '../../component/Item'
import useTodo from '../../hooks/useTodo';
import { ITodo } from '../../libs/todo';
export default function Finished() {
  const {todos} = useTodo()
  return (
    <div className={styles.finished}>
      <header className={styles.header}><IconFinished />完成</header>
      <Content todos={todos.filter((item:ITodo)=>item.finished===true)} ></Content>
    </div>
  )
}
