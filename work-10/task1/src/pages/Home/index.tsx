import React, { Component } from "react";
import "./index.css";
import bigLogo from "../../img/logo_big.png";
import { Link } from "react-router-dom";
export default class index extends Component {
  render() {
    return (
      <div className="home">
        <img src={bigLogo} alt="" />
        <h1 className="title">时间胶囊</h1>
        <div className="action">
          <Link to="/put">
            <span className="big">Put</span>
            <span className="small">添加</span>
          </Link>
          <Link to="/open">
            <span className="big">Open</span>
            <span className="small">打开</span>
          </Link>
        </div>
        <div className="footer">
          <a href="/">什么是时间胶囊？</a>.<a href="/">回胶囊日记</a>
        </div>
      </div>
    );
  }
}
