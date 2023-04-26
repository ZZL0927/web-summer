import { Avatar, Button, Input, message, Modal, Upload } from "antd";
import React, { FormEvent, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import * as api from '../../services/api'
import { useNavigate } from "react-router-dom";
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
export default function User() {
    const navigate = useNavigate()
    const [avatar,setAvatar] = useState(localStorage.getItem('avatar')!)
    const [nickName,setNickName] = useState(localStorage.getItem('nickName'))
    const [isSetName,setName] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPwd, setIsPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [oldPwd,setOldPwd] = useState('')
    const [newPwd,setNewPwd] = useState('')
    const [confirmPwd,setConfirmPwd] = useState('')
    const logout = async()=>{
        let res = await api.logout()
        if(res.stat==='ok')
        {
            message.success('退出登录成功')
            navigate("/login")
        }
    }
    const changeName = ()=>{
        setName(true)
    }
    const cancel = ()=>{
        setNickName(localStorage.getItem("nickName"))
        setName(false)
    }
    const sure = async()=>{
        if(nickName?.trim().length===0)
        {
            message.warning("用户名不能为空")
            return
        }
        if(nickName!.trim().length>20)
        {
          message.warning("用户名长度不能超过20")
          return
        }
        let res = await api.setInfo({nickname:nickName!,avatar:"/avatar"})
        if(res.stat==='ok')message.success('用户信息设置成功')
        setName(false)
        localStorage.setItem('nickName',nickName!)
    }
    const showModal = () => {
        getUserInfo()
        setIsModalVisible(true);
      };
    const showPwd = () => {
        setIsPwd(true);
      };
    
      const handleOk = async() => {
        await api.setInfo({nickname:nickName!,avatar:imageUrl!})
        localStorage.setItem('avatar',imageUrl!)
        setAvatar(imageUrl!)
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      const pwdOk = async() => {
        if(oldPwd.length===0||newPwd.length===0||confirmPwd.length===0)
        {
            message.warning("密码不能为空")
            return
        }
        else if(newPwd!==confirmPwd){
            message.warning("两次密码不一致，请重新输入")
            return
        }
        if(newPwd.length<6||newPwd.length>12)
        {
          message.warning("密码长度应在6至12位")
          return
        }
        let res = await api.changePwd({oldPwd,pwd:newPwd,confirmPwd})
        if(res.stat==='ok')
        {
            message.success('修改成功')
            setNewPwd('')
            setOldPwd('')
            setConfirmPwd('')
            setIsPwd(false);
        }else{
            message.error(res.msg)
        }
      };
    
      const pwdCancel = () => {
        setNewPwd('')
        setOldPwd('')
        setConfirmPwd('')
        setIsPwd(false);
      };
      const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj as RcFile, url => {
            setLoading(false);
            setImageUrl(url);
          });
        }
      };
    
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
    const getUserInfo = async()=>{
        let res = await api.getUserInfo()
        setImageUrl(res.data.user.avatar)
    }
    useEffect(()=>{
        getUserInfo()
    },[])
  return (
    <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.logo}>WPS</span>
          <span>个人中心</span>
        </div>
      <div className={styles.main}>
        <div className={styles.content}>
            <div className={styles.logout}>
                <span onClick={logout}>退出账号</span>
            </div>
            <div className={styles.avatar}>
                <div className={styles["avatar-icon"]} onClick={showModal}>
                    {avatar&&<img src={avatar} alt="头像" />}
                    {!avatar&&<Avatar className={styles.avatar} size={64} icon={<UserOutlined />} />}
                </div>
                <p>{localStorage.getItem('nickName')}</p>
                <span className={styles.changePwd} onClick={showPwd}>修改密码</span>
            </div>
            <div className={styles.name}>
                <p>使用真实姓名，让工作伙伴认识你（一周仅可修改2次昵称）</p>
                <div className={styles["change-name"]}>
                    {!isSetName&&<div className={styles["show-name"]}>
                        <span>{nickName}</span>
                        <span className={styles.change} onClick={changeName}>修改</span>
                    </div>}
                    {isSetName&&<div className={styles["set-name"]}>
                        <Input value={nickName!} onChange={(e:FormEvent)=>{setNickName((e.target as HTMLInputElement).value)}}></Input>
                        <div className={styles.actions}>
                            <Button onClick={cancel}>取消</Button>
                            <Button type="primary" onClick={sure}>确认</Button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
      </div>
      <Modal title="上传新头像" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="确认"
        cancelText="取消">
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/img"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Modal>
      <Modal title="修改密码" visible={isPwd} onOk={pwdOk} onCancel={pwdCancel} okText="确认"
        cancelText="取消">
            <div className={styles.pwd}>
                <span>旧密码：</span>
                <Input value={oldPwd} onChange={(e:FormEvent)=>{setOldPwd((e.target as HTMLInputElement).value.trim())}} type="password"></Input>
            </div>
            <div className={styles.pwd}>
                <span>新密码：</span>
                <Input value={newPwd} onChange={(e:FormEvent)=>{setNewPwd((e.target as HTMLInputElement).value.trim())}} type="password"></Input>
            </div>
            <div className={styles.pwd}>
                <span>确认密码：</span>
                <Input value={confirmPwd} onChange={(e:FormEvent)=>{setConfirmPwd((e.target as HTMLInputElement).value.trim())}} type="password"></Input>
            </div>
      </Modal>
    </div>
  );
}
