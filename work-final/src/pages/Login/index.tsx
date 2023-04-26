import React, { useContext } from "react";
import styles from "./index.module.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import { userContext } from "../../hooks/store";
export default function Login() {
  let { setAvatar,setNickName } = useContext(userContext);
  const navigate = useNavigate();
  const onFinish = async (values: {username:string,password:string}) => {
    try {
      let res = await api.login({
        account: values.username.trim(),
        pwd: values.password.trim(),
      });
      if (res.stat === "ok") {
        let res = await api.getUserInfo()
        setAvatar(res.data.user.avatar)
        localStorage.setItem("avatar",res.data.user.avatar)
        localStorage.setItem("nickName",res.data.user.nickname)
        setNickName(res.data.user.nickname)
        message.success("登录成功！");
        navigate("/home");
      } else {
        message.error(res.msg);
      }
    } catch (error) {}
  };
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <div className={styles["head-c"]}>
          <span className={styles.logo}></span>
        </div>
      </header>
      <div className={styles.content}>
        <Form
          name="normal_login"
          className={styles["login-form"]}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <h2>登录</h2>
          <Form.Item
            name="username"
            rules={[{ required: true, type: "string", whitespace: true,message: '用户名不能为空'  }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, type: "string", whitespace: true,message: '密码不能为空'  }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <div className={styles.jump}>
            <Link to="/register">尚未注册？</Link>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
