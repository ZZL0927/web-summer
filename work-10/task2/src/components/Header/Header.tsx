import React, { Component } from "react";
import iconArticle from "../../img/icon_article.webp";
import iconHot from "../../img/icon_hot.webp";
import { NavLink } from "react-router-dom";
import "./Header.css";
export default class Header extends Component {
  render() {
    return (
      <header>
        <p className="top">排行榜</p>
        <div className="title">
          <NavLink to="/" exact className="tab">
            <div className="post">
              <img src={iconArticle} alt="" />
              <span>好文精选</span>
            </div>
          </NavLink>
          <NavLink to="/news" className="tab">
            <div className="news active">
              <img src={iconHot} alt="" />
              <span>热门资讯</span>
            </div>
          </NavLink>
        </div>
      </header>
    );
  }
}
