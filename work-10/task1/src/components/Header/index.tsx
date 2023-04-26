import React, { Component } from "react";
import logo from "../../img/logo.gif";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
export default class index extends Component {
  render() {
    return (
      <header>
        <div className="content">
          <div className="left">
            <Link to="/" className="jump">
              <img src={logo} alt="" />
              <span className="title">时间胶囊</span>
            </Link>
            <Link to="/" className="jump">首页</Link>
            <NavLink to="/put" className="jump">
              添加
            </NavLink>
            <NavLink to="/open" className="jump">
              打开
            </NavLink>
          </div>
          <a href="/" className="diary">
            回胶囊日记
          </a>
        </div>
      </header>
    );
  }
}
