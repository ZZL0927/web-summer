import React, { Component } from "react";
import "./NewsItem.css";
import { IArticle } from "../../types";
import { RouteComponentProps, withRouter } from "react-router-dom";
class NewsItem extends Component<RouteComponentProps & IArticle> {
  goDetail = (id: string) => {
    this.props.history.push(`/news/detail?id=${id}`);
  };
  render() {
    return (
      <div
        className="new"
        onClick={() => {
          this.goDetail(this.props.id);
        }}
      >
        <img src={this.props.banner} alt="" />
        <div className="right">
          <p className="news-title">{this.props.title}</p>
          <p className="news-author">{this.props.author}</p>
        </div>
      </div>
    );
  }
}
export default withRouter(NewsItem);
