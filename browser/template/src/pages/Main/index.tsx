import React, { KeyboardEvent } from "react";
import Todo from '../Todo'
import * as api from "../../services/api";
import { ITodo } from "../../types.js";
interface State {
  todos: ITodo[];
  value: string;
}
export default class Main extends React.Component<any,State> {
  state: State = {
    todos: [],
    value: "",
  };
  async list() {
    try {
      const res = await api.list();
      // 获取服务端传来的数据
      this.setState({
        todos:res.data
      })
      console.log(res.data);
    } catch (err) {
      console.trace(err);
    }
  }

  // 回车键事件
  keyDown = async (event:KeyboardEvent) => {
    let value = this.state.value
    if (value && event.keyCode === 13) {
      try {
        const res = await api.create(this.state.value)
        this.setState({
          value:''
        })
        this.list()
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // 监听input框的改变
  changeValue = (event:any) => {
    let value = event.target.value.trim();
    this.setState({
      value,
    });
  };
  // 改变数据的完成情况
  toggle = (todo: ITodo) => {
    if(todo.finished===true)
    {
      try {
        const res = api.cancel(todo.id)
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }else{
      try {
        const res = api.done(todo.id)
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    this.list()
  };
  // 删除数据
  deleteTodo = (todo:ITodo) => {
    try {
      const res = api.deleteTodo(todo.id)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    this.list()
  };
  componentDidMount() {
    this.list();
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1 className="title">TS Todo</h1>
          <input
            type="text"
            autoComplete="off"
            placeholder="What needs to be done?"
            className="input-box"
            onChange={this.changeValue}
            onKeyDown={this.keyDown}
            value={this.state.value}
          />
        </header>
        <main className="todos">
          {this.state.todos.map((todo, i) => {
            return (
              <Todo
                todo={todo}
                key={i}
                toggle={() => {
                  this.toggle(todo);
                }}
                deleteTodo={() => {
                  this.deleteTodo(todo);
                }}
              ></Todo>
            );
          })}
        </main>
      </React.Fragment>
    )
  }
}
