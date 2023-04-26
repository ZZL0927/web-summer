import React, { Component } from 'react'
import {ITodo} from '../../types'
interface Props{
    todo:ITodo
    toggle:()=>void
    deleteTodo:()=>void
}
export default class index extends Component<Props> {
    
  render() {
    let {todo} = this.props
    return (
      <div className={this.props.todo.finished?"todo-item done":"todo-item"}>
        <span className="iconfont icon-checkbox" onClick={this.props.toggle}></span>
        <span className="value">{todo.content}</span>
        <span className="iconfont icon-delete" onClick={this.props.deleteTodo}></span>
      </div>
    )
  }
}
