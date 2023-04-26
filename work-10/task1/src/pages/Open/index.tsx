import React, { Component } from "react";
import Header from "../../components/Header";
import "./index.css";
import * as api from "../../service/api";
import dayjs from "dayjs";
import { ICapsule } from "../../types";
interface Open{
  capsuleType:number,
  currentTime:number,
  capsuleId:string
}
export default class index extends Component<any,ICapsule & Open> {
  state = {
    // 胶囊状态
    capsuleType: 0,
    capsuleId: "",
    id: "",
    name: "",
    content: "",
    time: "",
    tip: "",
    email: "",
    currentTime: 0,
  };
  timer :number =0
  // 获取胶囊ID
  getId = (event: any) => {
    this.setState({
      capsuleId: (event.target as HTMLInputElement).value
    });
  };
  // 发起请求，获取胶囊内容
  getCapsule = async () => {
    let res = await api.getCapsule(this.state.capsuleId);
    if (res.data) {
      if (Date.parse(res.data.time) <= new Date().getTime()) {
        this.setState({
          capsuleType: 1,
          name: res.data.name,
          time: res.data.time,
          content: res.data.content,
        });
      } else {
        // 立即执行一次，抵消setinterval进行操作需要延迟一秒的效果
        this.setState({
          currentTime: new Date().getTime(),
          capsuleType: 2,
          name: res.data.name,
          time: res.data.time,
          tip: res.data.tip,
        });
        this.timer = window.setInterval(() => {
          this.setState({
            currentTime: new Date().getTime(),
          });
          if (
            Math.floor((Date.parse(this.state.time )- this.state.currentTime) / 1000) <= 1
          ) {
            window.clearInterval(this.timer);
          }
        }, 1000);
      }
    } else {
      this.setState({
        capsuleType: 3,
      });
    }
  };
  // 清除定时器
  componentWillUnmount() {
    window.clearInterval(this.timer);
  }
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <main className="open-main">
          <h1 className="main-header">打开胶囊</h1>
          <div className="inner-main">
            <form method="post" className="open-input-area">
              <div className="open-input-box">
                <span>胶囊Key: </span>
                <input
                  type="text"
                  className="open-capsule"
                  onChange={this.getId}
                />
                <div className="open" onClick={this.getCapsule}>
                  打开胶囊
                </div>
              </div>
              <div className="show">
                {this.state.capsuleType === 1 && (
                  <>
                    <p className="content-title">
                      <span>{this.state.name}</span>
                      <span> 在 </span>
                      <span>
                        {dayjs(this.state.time).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                      <span> 对你说：</span>
                    </p>
                    <div className="content-text">{this.state.content}</div>
                  </>
                )}
                {this.state.capsuleType === 2 && (
                  <>
                    <p className="content-title">
                      这颗胶囊未到提取时间，不能打开。
                    </p>
                    <p className="time">
                      <span>打开时间在 </span>
                      <span className="time-end">
                        {this.state.time}
                      </span>
                      <span>，距离现在 </span>
                      <span className="time-last">
                        {Math.floor(
                          (Date.parse(this.state.time) - this.state.currentTime) / 1000
                        )}
                      </span>
                      <span> 秒。</span>
                    </p>
                    <div className="content-text">
                      <p className="tip-title">
                        <span className="name">{this.state.name}</span>
                        <span> 给你留的提示信息：</span>
                      </p>
                      <span>{this.state.tip}</span>
                    </div>
                  </>
                )}
                {this.state.capsuleType === 3 && (
                  <>
                    <p className="no-found">没有这个胶囊Key</p>
                  </>
                )}
              </div>
            </form>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
