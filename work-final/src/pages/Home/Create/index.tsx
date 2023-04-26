import React, { FormEvent, useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import * as api from "../../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, message, Modal } from "antd";
import { ReactComponent as IconXingming } from "../../../assets/btnIcon/xingming.svg";
import { ReactComponent as IconXingbie } from "../../../assets/btnIcon/xingbie.svg";
import Input from "../../../component/Input";
import { problemContext, QuestionsProvider  } from "../../../hooks/store";
import LeftBtn from "../../../component/leftBtn";
import Date from "../../../component/Date";
import Time from "../../../component/Time";
import Score from "../../../component/Score";
import SingleSelect from "../../../component/Select";
import useProblem from "../../../hooks/useProblem";
import { IStarProblem } from "../../../types";
const BasicList = [<IconXingming />, <IconXingbie />];
export default function Create() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const {problem,listStar,getListStar,addStarToForm,addName,addSex,setShow} = useProblem()
  const navigate = useNavigate()
  const {state} = useLocation()  
  // 题目类型
  const [listButton, setList] = useState<{ title: string; type: string }[]>([]);
  // 基础类型：姓名，性别
  const [basicList, setBasic] = useState<
    {
      id:string,
      type:string,
      title:string,
      required:boolean,
      setting:null|{
        options:{
          id:string,
          title:string,
          status:string
        }[]
      }
    }[]
  >([]);
  const {title,setTitle,subTitle,setSubTitle} = useContext(problemContext)
  const [newTitle,setNewTitle] = useState(title)
  // 获取题目类型
  const getList = async () => {
    try {
      let res = await api.getListType();
      setList(res.data.problemTypes);
    } catch (error) {}
  };
  // 获取基本类型
  const getBasic = async () => {
    try {
      let res = await api.getBasicList();
      setBasic(res.data.basicProblems);
    } catch (error) {}
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
      return
    }
      for(let x =0;x<problem.length;x++)
    {
      let item=problem[x]
        if(item.title==='')
        {
          message.warning("请将标题填写完整")
          setShow(x+1)
          return
        }
        if((item.type==="singleSelect"||item.type==='multiSelect'||item.type==="pullSelect"))
        {
          if(item.setting?.options.some(i=>i.title===''))
          {
            message.warning('请将选项填写完整')
            setShow(x+1)
            return
          }
          let options = item.setting?.options.map(i=>i.title)!
          for(let i of options)
          {
            if(options.indexOf(i)!==options.lastIndexOf(i))
            {
              message.warning('选项不可以重复')
              setShow(x+1)
              return
            }
          }
        }

      }
      let res = await api.createForm({title,subTitle,problems:problem})
      if(res.stat==='ok')
      {
        navigate('/home/formList')
        message.success("表单创建成功")
      }else{
        message.error(res.msg)
      }
    } catch (error) {}
  }
  // 创建表单
  const publicForm = async()=>{
    try {
      if(state)
      {
        await api.deleteForm({id:(state as {id:string}).id})
      }
      if(title.length===0)
    {
      message.warning("请将表单标题填写完整")
      return
    }
      for(let x =0;x<problem.length;x++)
    {
      let item=problem[x]
        if(item.title==='')
        {
          message.warning("请将标题填写完整")
          setShow(x+1)
          return
        }
        if((item.type==="singleSelect"||item.type==='multiSelect'||item.type==="pullSelect"))
        {
          if(item.setting?.options.some(i=>i.title===''))
          {
            message.warning('请将选项填写完整')
            setShow(x+1)
            return
          }
          let options = item.setting?.options.map(i=>i.title)!
          for(let i of options)
          {
            if(options.indexOf(i)!==options.lastIndexOf(i))
            {
              message.warning('选项不可以重复')
              setShow(x+1)
              return
            }
          }
        }
      }
      let res = await api.createForm({title,subTitle,problems:problem})
      if(res.stat==='ok')
      {
        await api.startForm({id:res.data!.id})
        navigate('/home/formList')
        message.success("表单创建成功")
      }else{
        message.error(res.msg)
      }
    } catch (error) {}
  }
  // 删除常用
  const deleteOften = async(id:string)=>{
    let res = await api.deleteStar({id})
    if(res.stat === 'ok')
    {
      getListStar()
      message.success("删除成功")
    }else{
      message.error("删除失败")
    }
  }
  // 预览
  const goReview = ()=>{
    if(title.length===0)
    {
      message.warning("请将表单标题填写完整")
      return
    }
    for(let x =0;x<problem.length;x++)
    {
      let item=problem[x]
        if(item.title==='')
        {
          message.warning("请将标题填写完整")
          setShow(x+1)
          return
        }
      if((item.type==="singleSelect"||item.type==='multiSelect'||item.type==="pullSelect"))
        {
          if(item.setting?.options.some(i=>i.title===''))
          {
            message.warning('请将选项填写完整')
            setShow(x+1)
            return
          }
          let options = item.setting?.options.map(i=>i.title)!
          for(let i of options)
          {
            if(options.indexOf(i)!==options.lastIndexOf(i))
            {
              message.warning('选项不可以重复')
              setShow(x+1)
              return
            }
          }
        }
    }
    navigate('/home/preview')
  }
  useEffect(() => {
    getList();
    getBasic();
    setShow(1);
    getListStar()
    return ()=>{
    }
  }, [getListStar,setShow]);

  return (
      <QuestionsProvider value={{questions:listButton,setQuestions:setList}}>
      <div className={styles["create-form"]}>
        <div className={styles.left}>
          <header>添加题目</header>
          <div className={styles.questions}>
            <LeftBtn btns={listButton}></LeftBtn>
          </div>
          <header>题目模板</header>
          <div className={styles.questions}>
            {basicList.map((item, index) => {              
              return (
                <Button key={index} onClick={item.type==="input"?(e:FormEvent)=>{e.stopPropagation();addName()}:(e:FormEvent)=>{e.stopPropagation();addSex()}}>
                  {BasicList[index]}
                  {item.title}
                </Button>
              );
            })}
          </div>
          <header className={styles.often}><span className={styles.title}>我的常用题</span><span className={styles["often-action"]} onClick={showModal}>管理</span></header>
          <div className={styles["list-star"]}>
            {listStar.map((item:IStarProblem,index:number)=>{
                return (
                  <Button key={index} onClick={(e:FormEvent)=>{e.stopPropagation();addStarToForm(item!)}}>
                    {item.problem?.title}
                  </Button>
                )
              })}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.center}>
            <input
              type="text"
              className={styles["form-title"]}
              placeholder="请输入表单标题"
              value={newTitle}
              onChange={(e:FormEvent)=>{if((e.target as HTMLInputElement).value.trim().length>20){message.warning("标题最大长度为20");return}setNewTitle((e.target as HTMLInputElement).value.trim())}}
              onBlur={(e:FormEvent)=>{setTitle((e.target as HTMLInputElement).value.trim())}}
            />
            <input
              type="text"
              className={styles["sub-title"]}
              placeholder="输入表单副标题"
              value={subTitle}
              onChange={(e:FormEvent)=>{if((e.target as HTMLInputElement).value.trim().length>15){message.warning("副标题最大长度为15");return}setSubTitle((e.target as HTMLInputElement).value.trim())}}
            />
            {problem.map((item,index)=>{
              
              if(item.type==="input")return (<Input index={index+1} id={item.id!} key={item.id!}></Input>)
              else if(item.type==="date")return (<Date index={index+1} id={item.id!} key={item.id!}></Date>)
              else if(item.type==="time")return (<Time index={index+1} id={item.id!} key={item.id!}></Time>)
              else if(item.type==="score")return (<Score index={index+1} id={item.id!} key={item.id!}></Score>)
              else if(item.type==="singleSelect"||"multiSelect"||"pullSelect")return (<SingleSelect index={index+1} id={item.id!} key={item.id!}></SingleSelect>)
              else return null
            })}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles["btn-action"]}>
            <Button onClick={(e:FormEvent)=>{e.stopPropagation();goReview()}}>预览</Button>
            <Button onClick={(e:FormEvent)=>{e.stopPropagation();createForm()}}>保存为草稿</Button>
          </div>
          <Button type="primary" onClick={(e:FormEvent)=>{e.stopPropagation();publicForm()}}>{state?"保存修改":"完成创建"}</Button>
        </div>
        <Modal title="管理常用题" className="modal" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel} width={850}>
        <div className={styles["often-content"]}>
          {listStar.map((item:IStarProblem,index:number)=>{
            return (
              <div className={styles.item} key={index}>
                <span className={styles["star-title"]}>{item.problem?.title}</span>
                <span className={styles.delete} onClick={()=>{deleteOften(item.id!)}}>删除</span>
              </div>
            )
          })}
        </div>
      </Modal>
      </div>
      </QuestionsProvider>
  );
}
