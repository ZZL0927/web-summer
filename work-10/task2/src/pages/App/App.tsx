import React, { Component } from "react";
import { Route } from "react-router-dom";
import Posts from "../Posts/Posts";
import News from "../News/News";
import Detail from "../Detail/Detail";
import './App.css'
export default class App extends Component {
  render() {
    return (
      <>
      <Route path="/" exact component={Posts}></Route>
      <Route path="/news" exact component={News}></Route>
      <Route path="/news/detail" component={Detail}></Route>
      </>
    )
  }
}
