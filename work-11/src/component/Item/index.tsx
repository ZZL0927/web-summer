import React from 'react'
import {ITodo } from '../../libs/todo'
import styles from './index.module.scss'
import { ReactComponent as IconEmpty } from "../../../src/assets/imgs/empty.svg";
import { ReactComponent as IconCircle } from "../../../src/assets/imgs/circle.svg";
import { ReactComponent as IconStar } from "../../../src/assets/imgs/star.svg";
import { ReactComponent as IconStarEmpty } from "../../../src/assets/imgs/starEmpty.svg";
import {ReactComponent as IconFinished} from "../../../src/assets/imgs/finished.svg"
import useTodo from '../../hooks/useTodo';
interface Props{
    todos:ITodo[],
}
export default function useItem(props:Props) {
  const{changeFooter,starTodos,doneTodos,getTodo} = useTodo()
  return (
    <div className={props.todos.length===0?styles.empty:styles.content}>
        {props.todos.length===0&&<IconEmpty />}
        {props.todos.map(item=>{
          return (
            <div key={item.id}>
              {item.finished?<IconFinished onClick={()=>{doneTodos(item)}} className={styles.done}/>:<IconCircle onClick={()=>{doneTodos(item)}}/>}
              <span className={item.finished?styles["done-content"]:''} onClick={()=>{changeFooter(true);getTodo(item)}}>{item.content}</span>
              {item.star?<IconStar onClick={()=>{starTodos(item)}} className={styles["star-color"]} />:<IconStarEmpty onClick={()=>{starTodos(item)}}/>}
            </div>
          )
        })}
      </div>
  )
}
