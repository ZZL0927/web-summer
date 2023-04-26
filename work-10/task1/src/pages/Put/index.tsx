import React, { Component } from "react";
import Header from "../../components/Header";
import "./index.css";
import * as api from "../../service/api";
import dayjs from "dayjs";
import { ICapsule } from "../../types";
interface Put {
  putType: boolean;
  checkName: number;
  checkEmail: number;
  checkTime: number;
  checkContent: number;
  checkTip: number;
}
export default class index extends Component {
  state = {
    name: "",
    email: "",
    time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    content: "",
    tip: "",
    // 添加胶囊状态
    putType: false,
    id: "",
    checkName: 0,
    checkEmail: 0,
    checkTime: 0,
    checkContent: 0,
    checkTip: 0,
  };
  // 受控组件
  setVal = (name:string) => {
    return (event:React.FormEvent)=>{
      this.setState({
        [name]: (event.target as HTMLInputElement).value
      });
    }
  };
  // 验证输入有效性
  checkData = () => {
    this.setState({
      checkName: 0,
      checkEmail: 0,
      checkTime: 0,
      checkContent: 0,
      checkTip: 0,
    });
    let flag = true;
    // 检查名字
    if (!this.state.name.trim()) {
      this.setState({
        checkName: 1,
      });
      flag = false;
    } else {
      if (this.state.name.length > 20) {
        this.setState({
          checkName: 2,
        });
        flag = false;
      }
    }
    // 邮箱校验
    if (!this.state.email.trim()) {
      this.setState({
        checkEmail: 1,
      });
      flag = false;
    } else {
      // 邮箱正则
      const emailRule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!this.state.email.match(emailRule)) {
        this.setState({
          checkEmail: 2,
        });
        flag = false;
      }
    }
    // 时间校验
    if (!this.state.time.trim()) {
      this.setState({
        checkTime: 1,
      });
      flag = false;
    } else {
      // 时间正则
      const timeRule =
        /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
      if (!this.state.time.match(timeRule)) {
        this.setState({
          checkTime: 2,
        });
        flag = false;
      }
    }
    // 内容校验
    if (!this.state.content.trim()) {
      this.setState({
        checkContent: 1,
      });
      flag = false;
    } else {
      if (this.state.content.length > 5000) {
        this.setState({
          checkContent: 2,
          content: "",
        });
        flag = false;
      }
    }
    // tip校验
    if (this.state.tip.length > 200) {
      this.setState({
        checkTip: 1,
        content: "",
      });
      flag = false;
    }
    return flag;
  };
  // 添加胶囊
  putCapsule = async (event: any) => {
    event.preventDefault();
    if (this.checkData()) {
      try {
        let res = await api.putCapsule({
          id: "",
          name: this.state.name,
          email: this.state.email,
          time: this.state.time,
          content: this.state.content,
          tip: this.state.tip,
        });

        this.setState({
          id: res.id!,
        });
      } catch (error) {}
      this.setState({
        putType: true,
      });
    }
  };
  // 显示页面内结构
  show = () => {
    if (this.state.putType) {
      return (
        <React.Fragment>
          <span>胶囊Key</span>
          <div className="input-box">
            <input type="text" value={this.state.id} readOnly />
            <span>
              你可以复制 key自己保存，也可以发送给你的好友，让他来打开胶囊。
            </span>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <span>你的名字</span>
          {this.state.checkName === 1 && (
            <div className="required name-content">名字 必须填写</div>
          )}
          {this.state.checkName === 2 && (
            <div className="required name-content">名字 不能超过 20 个字.</div>
          )}
          <input type="text" name="name" id="name" onChange={this.setVal('name')} />
          <span>你的邮箱</span>
          {this.state.checkEmail === 1 && (
            <div className="required email-content">邮箱 必须填写</div>
          )}
          {this.state.checkEmail === 2 && (
            <div className="required email-content">
              邮箱 必须是一个有效的电子邮箱地址.
            </div>
          )}
          <input type="text" name="email" id="email" onChange={this.setVal('email')} />
          <span className="open-time">打开时间</span>
          <div className="open-time">
            <input
              type="text"
              name="time"
              className="time"
              id="time"
              onChange={this.setVal('time')}
              value={this.state.time}
            />
            <span className="tips"> 打开时间之前，胶囊内容是看不到的。</span>
          </div>
          {this.state.checkTime === 1 && (
            <div className="required time-content">打开时间 必须填写</div>
          )}
          {this.state.checkTime === 2 && (
            <div className="required time-content">打开时间 格式不正确</div>
          )}
          <span>胶囊内容</span>
          {this.state.checkContent === 1 && (
            <div className="required required-content">内容 必须填写</div>
          )}
          {this.state.checkContent === 2 && (
            <div className="required required-content">
              内容 不能超过 5000 个字.
            </div>
          )}
          <textarea
            name="content"
            cols={50}
            rows={8}
            className="capsule-content"
            id="capsule-content"
            onChange={this.setVal('content')}
          ></textarea>
          <span className="tips">胶囊内容不能超过5000字。</span>
          <span className="before-time-tips">未到期提示信息</span>
          {this.state.checkTip === 1 && (
            <div className="tip-length">未到期提示信息 不能超过 200 个字.</div>
          )}
          <textarea
            name="tips"
            className="tips-content"
            id="tips-content"
            onChange={this.setVal('tip')}
          ></textarea>
          <span className="tips">
            在 打开时间 之前打开胶囊，会看到提示信息。
          </span>
          <input
            type="submit"
            value="添加胶囊"
            className="submit"
            readOnly
            onClick={this.putCapsule}
          />
        </React.Fragment>
      );
    }
  };
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <main>
          <h1 className="main-header">
            {this.state.putType ? "胶囊添加成功 " : "添加胶囊"}
          </h1>
          <div className="main">
            <form method="post" className="input-area">
              {this.show()}
            </form>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
