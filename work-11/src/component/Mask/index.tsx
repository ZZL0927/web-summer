import React from 'react'
import useTodo from '../../hooks/useTodo';
import styles from './index.module.scss';
export default function Mask() {
    const {todo,showFooter,delTodos,starTodos,doneTodos,changeFooter} = useTodo()
  return (
    <div
          className={
            showFooter ? styles['open-footer-box'] : styles['close-footer-box']
          }>
            {/* 遮罩层 */}
          <div
            className={styles.mask}
            onClick={() => {
              changeFooter(false);
            }}></div>
          <div className={styles['footer-content']}>
            <div className={styles.actions}>选择操作</div>
            {/* 切换是否完成 */}
            <div
              className={styles.action}
              onClick={() => {
                doneTodos(todo);
                changeFooter(false);
              }}>
              {todo.finished ? '标记为未完成' : '标记为已完成'}
            </div>
            {/* 切换是否重要 */}
            <div
              className={styles.action}
              onClick={() => {
                starTodos(todo);
              }}>
              {todo.star ? '取消标记重要' : '标记为重要'}
            </div>
            {/* 删除 */}
            <div
              className={styles.delete}
              onClick={() => {
                delTodos(todo);
                changeFooter(false);
              }}>
              删除任务
            </div>
            {/* 取消 */}
            <div
              className={styles.cancle}
              onClick={() => {
                changeFooter(false);
              }}>
              取消
            </div>
          </div>
        </div>
  )
}
