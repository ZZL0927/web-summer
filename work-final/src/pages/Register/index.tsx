import React from "react";
import styles from "./index.module.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input,message } from "antd";
import { useNavigate } from "react-router-dom";
import * as api from '../../services/api'
export default function Register() {
    const navigate = useNavigate()
  const onFinish = async(values: {username:string,password1:string,password2:string}) => {
    try {
        if(values.password1.trim()!==values.password2.trim())
        {
            message.warning("两次密码不一致")
            return
        }
        if(values.username.trim().length>20)
        {
          message.warning("用户名长度不能大于20")
        }
        if(values.password1.trim().length<6||values.password1.trim().length>12)
        {
          message.warning("密码长度应在6到12位")
          return
        }
        let res = await api.register({account:values.username.trim(),pwd:values.password1.trim(),confirmPwd:values.password2.trim()})
        if(res.stat === 'ok')
        {   
            message.success("注册成功")
            navigate('/login')
        }else{
            message.error(res.msg)
        }
    } catch (error) {
    }
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
            <h2>注册</h2>
          <Form.Item
            name="username"
            rules={[{ required: true,type:"string", whitespace:true}]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password1"
            rules={[{ required: true,type:"string", whitespace:true}]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item
            name="password2"
            rules={[{ required: true,type:"string", whitespace:true}]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="确认密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
