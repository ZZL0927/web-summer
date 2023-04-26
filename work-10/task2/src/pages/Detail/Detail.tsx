import React, { Component } from "react";
import * as api from "../../services/api";
import { RouteComponentProps } from "react-router-dom";
import "./Detail.css";
import qs from "querystring";
import { IArticle } from "../../types";
export default class Detail extends Component<RouteComponentProps & IArticle> {
  state: IArticle = {
    id: "",
    title: "",
    time: "",
    avatar: "",
    author: "",
    banner: "",
    likes: 0,
    comments: 0,
    content: "",
  };
  goBack = () => {
    this.props.history.goBack();
  };
  getDetail = async () => {
    // 接收search参数
    const { search } = this.props.location;
    const { id } = qs.parse(search.slice(1));
    let res = await api.detail(id + "");
    console.log(res);

    this.setState({
      author: res.data.author,
      title: res.data.title,
      avatar: res.data.avatar,
      time: res.data.time,
      content: res.data.content,
      banner:res.data.banner
    });
  };
  getArticle = () => {
    return { __html: this.state.content + "" };
  };
  componentDidMount() {
    this.getDetail();
  }
  render() {
    return (
      <>
        <div className="detail-body">
          <div className="detail-header">
            <span className="back" onClick={this.goBack}>
              &lt;
            </span>
            <img src={this.state.avatar} alt="" />
            <span className="detail-author">{this.state.author}</span>
          </div>
          <div className="detail-main">
            <img src={this.state.banner} alt="" className="detail-banner"/>
            <div className="detail-content">
            <p className="detail-title">{this.state.title}</p>
            <p className="detail-time">{this.state.time}</p>
            <div dangerouslySetInnerHTML={this.getArticle()}></div>
            </div>
            
          </div>
        </div>
      </>
    );
  }
}
