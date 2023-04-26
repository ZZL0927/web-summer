import React, { Component } from "react";
import "./PostItem.css";
import "./icon.css";
import { IArticle } from "../../types";
import top1 from "../../img/rank-top1.png";
import top2 from "../../img/rank-top2.png";
import top3 from "../../img/rank-top3.png";
import top4 from "../../img/rank-top4.png";
import top5 from "../../img/rank-top5.png";
import { RouteComponentProps, withRouter } from "react-router-dom";
class PostItem extends Component<RouteComponentProps & IArticle> {
  goDetail = (id: string) => {
    this.props.history.push(`/news/detail?id=${id}`);
  };
  render() {
    let tops = [top1, top2, top3, top4, top5];
    return (
      <div className="card" onClick={() => {
        this.goDetail(this.props.id);
      }}>
        <div className="img-box">
          {/* 左上角图片 */}
          {(+this.props.content!) <= 4 && (
            <img src={tops[+this.props.content!]} className="top"></img>
          )}
          <img src={this.props.banner} alt="" />
        </div>
        <p className="post-title">{this.props.title}</p>
        <div className="post-footer">
          <i className="iconfont icon-comment"> {this.props.comments}</i>
          <i className="iconfont icon-zhi"> {this.props.likes}</i>
        </div>
      </div>
    );
  }
}
export default withRouter(PostItem)
