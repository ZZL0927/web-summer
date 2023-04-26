import React, {useState } from 'react'
import styles from './index.module.scss'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import { ReactComponent as IconLogo } from "../../assets/formLogo.svg";
import { ReactComponent as IconBack } from "../../assets/back.svg";
import {IProblem} from '../../types'
import { ProblemProvider} from "../../hooks/store";
import { Avatar, message, Modal, Popover } from 'antd';
import * as api from '../../services/api'
import { UserOutlined } from '@ant-design/icons';
export default function Home() {
    const navigate = useNavigate()
    const x = useLocation()
    const {state} = useLocation() 
    // 表单项
    const [title,setTitle] = useState('未命名标题')
    const [subTitle,setSubTitle] = useState('未命名副标题')
  const [problem, setProblem] = useState<IProblem[]>([]);
  const [listStar, setListStar] = useState<{
    id:string,
    uId:string,
    status:2,
    problem?:{
      id?:string,
      isNew?:boolean
      title:string,
      type:"input"|"date"|"time"|"score"|"singleSelect"|"multiSelect"|"pullSelect",
      required:boolean
      setting?:{
        options:{
          title:string,
          status:2
        }[]
      }
    }
  }[]>([]);
  const userInfo = ()=>{
    navigate('/user')
  }
  const logout = async()=>{
    await api.logout()
    localStorage.setItem("nickName",'')
    localStorage.setItem("avatar",'')
    navigate('/login')
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  // 保存为草稿
  const createForm = async()=>{
    try {
      if(state)
      {
        await api.deleteForm({id:(state as {id:string}).id})
      }
      if(title.length===0)
    {
      message.warning("请将表单标题填写完整")
      setIsModalVisible(false);
      return
    }
      for(let x =0;x<problem.length;x++)
    {
      let item=problem[x]
        if(item.title==='')
        {
          message.warning("请将标题填写完整")
          setIsModalVisible(false);
          return
        }
        if((item.type==="singleSelect"||item.type==='multiSelect'||item.type==="pullSelect"))
        {
          if(item.setting?.options.some(i=>i.title===''))
          {
            message.warning('请将选项填写完整')
            setIsModalVisible(false);
            return
          }
          let options = item.setting?.options.map(i=>i.title)!
          for(let i of options)
          {
            if(options.indexOf(i)!==options.lastIndexOf(i))
            {
              message.warning('选项不可以重复')
              setIsModalVisible(false);
              return
            }
          }
        }

      }
      let res = await api.createForm({title,subTitle,problems:problem})
      if(res.stat==='ok')
      {
        navigate('/home/formList')
        message.success("草稿创建成功")
      }else{
        message.error(res.msg)
      }
    } catch (error) {}
  }
  const handleOk = () => {
    createForm()
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    navigate("/home")
    setIsModalVisible(false);
  };
  const goHome = ()=>{
    if(x.pathname.startsWith('/home/createForm'))
    {
      showModal()
    }else{
      navigate("/home")
    }
  }
  const content = (
    <div className={styles["user-actions"]}>
      <p onClick={userInfo}>个人中心</p>
      <p onClick={logout}>退出登录</p>
    </div>
  );
  return (
    <ProblemProvider value={{ problem,listStar,title,subTitle,setTitle,setListStar, setSubTitle,setProblem }}>

    <div className={styles.home}>
        <header className={styles.header}>
            <div className={styles.left} onClick={goHome}>
                {(x.pathname.startsWith('/home/createForm')||x.pathname.startsWith('/home/formAction')||x.pathname.startsWith('/home/preview'))&&<IconBack className={styles.back}/>}
                <IconLogo className={styles.logo}/>
                <span className={styles["left-title"]}>{x.pathname.startsWith('/home/formList')?"金山表单":title}</span>
            </div>
            <div className={styles["user-info"]}>
            {localStorage.getItem("nickName")&&<Popover content={content} title={localStorage.getItem("nickName")} trigger="hover" className={styles.popover} style={{ width: 10 }}>
              {localStorage.getItem('avatar')!.length>0&&<img  src={localStorage.getItem('avatar')!} alt="头像"></img>}
              {localStorage.getItem('avatar')!.length===0&&<Avatar className={styles.avatar} icon={<UserOutlined />} />}
            </Popover>}
            </div>
        </header>
        <div className={styles.content}>
            <Outlet />
        </div>
        <Modal title="是否保存修改" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="保存" cancelText="不保存">
        <p>保存为草稿在列表显示，方便下次编辑</p>
      </Modal>
    </div>
    </ProblemProvider>

  )
}
