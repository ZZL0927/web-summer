import React, { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { Space, Table,Button, message,Tag,Popover   } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IAdd } from '../../../assets/add.svg'
import { ReactComponent as IStarEmpty } from '../../../assets/starEmpty.svg'
import { ReactComponent as IStar } from '../../../assets/star.svg'
import * as api from '../../../services/api'
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import useProblem from '../../../hooks/useProblem';
import { problemContext } from '../../../hooks/store';
interface DataType {
  key: string;
  name: string;
  ctime: number;
  status: 1|2|3|4;
  star: boolean;
}

export default function FormList() {
  const {setProblem} = useProblem()
  const {setTitle,setSubTitle} = useContext(problemContext)
  const [total,setTotal] = useState(0)
  const [current,setCurrent] = useState(0)
  const [formList,setFormList] = useState<{
    key: string,
    name: string,
    ctime: number,
    status:1|2|3|4
    star:boolean
  }[]>([])
  const [isStar,setStar] = useState(false)
  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'name',
      key: 'name',
      align:"left",
    },
    {
      dataIndex: 'ctime',
      key: 'ctime',
      align:"center",
      width:200,
      render:(_,{ctime})=>(
        <span>{dayjs(ctime).format('MM-DD HH:mm')}</span>
      )
    },
    {
      dataIndex: 'status',
      key: 'status',
      align:"center",
      width:150,
      render: (_,record) => {

        return (
        <>
          {record.status===1&&(<span>已删除</span>)}
          {record.status===2&&(<Tag color="orange">未发布</Tag>)}
          {record.status===3&&(<Tag color="blue"><>正在收集</></Tag>)}
          {record.status===4&&(<Tag color="red">停止收集</Tag>)}
        </>
      )},
    },
    {
      key: 'star',
      dataIndex: 'star',
      align:"center",
      width:50,
      render: (_,record) => (
        <>
          {record.star?<IStar className={styles.star} onClick={async(event:FormEvent)=>{
              event.stopPropagation();
              await api.cancelStarForm({id:record.key})
              let res
              if(!isStar)
              {
                res = await api.getFormList({offset:current,limit:5})
              }else{
                res = await api.getFormList({offset:current,limit:5,isStar:true})
                if(res.data.total%5===0&&current>0&&total%5!==0)
                {
                  setCurrent(current=>current-1)
                  res = await api.getFormList({offset:current-1,limit:5,isStar:true})
                }
              }
              setTotal(res.data.total)
              let list:{
                  key: string,
                  name: string,
                  ctime: number,
                  status:1|2|3|4,
                  star:boolean
              }[] = []
              res.data.items.forEach(item=>{
                list.push({
                  key:item.id,
                  name:item.title,
                  ctime:item.ctime,
                  status:item.status as 1|2|3|4,
                  star:item.isStar
                })
              })
              setFormList(list)
          }}/>:<IStarEmpty className="empty" onClick={async(event:FormEvent)=>{
              event.stopPropagation();
              await api.starForm({id:record.key})
              getFormList()
          }}/>}
        </>
      ),
    },
    {
      align:"center",
      key: 'action',
      width:50,
      render: (_, record) => (
        <Space size="middle">
          {record.status===1&&(<></>)}
          {record.status===2&&(<><Popover content={()=>{return (<div className={styles.menu}><Button onClick={(event)=>{startForm(record.key,event)}}>发布</Button><Button onClick={(event)=>{editForm(record.key,event)}}>编辑</Button><Button onClick={(event)=>{deleteForm(record.key,event)}} className={styles.delete}>删除</Button></div>)}}>...</Popover></>)}
          {record.status===3&&(<><Popover content={()=>{return (<div className={styles.menu}><Button onClick={(event)=>{shareForm(record.key,event)}}>分享</Button><Button onClick={(event)=>{checkResult(record.key,event)}}>查看结果</Button><Button onClick={(event)=>{endForm(record.key,event)}}>停止</Button><Button onClick={(event)=>{deleteForm(record.key,event)}} className={styles.delete}>删除</Button></div>)}}>...</Popover></>)}
          {record.status===4&&(<><Popover content={()=>{return (<div className={styles.menu}><Button onClick={(event)=>{checkResult(record.key,event)}}>查看结果</Button><Button onClick={(event)=>{deleteForm(record.key,event)}} className={styles.delete}>删除</Button></div>)}}>...</Popover></>)}
        </Space>
      ),
    },
  ];
  const navigate = useNavigate()
  // 新建表单
  const GoToCreate = ()=>{
    let type:"input" | "singleSelect" | "multiSelect" | "pullSelect" | "date" | "time" | "score"="input"
        let arr = {
            id: uuidv4(),
            title: "请输入内容",
            type,
            required: false,
            isNew: false,
        }        
        setProblem([arr])
    setTitle('新建表单')
    setSubTitle('新建表单副标题')
    navigate('/home/createForm')
  }
  // 编辑表单
  const editForm = async (id:string,event:FormEvent)=>{
    event.stopPropagation();
    let res = await api.getForm({id})
    setTitle(res.data.item.title)
    setSubTitle(res.data.item.subTitle)
    setProblem(res.data.item.problems)
    await api.deleteForm({id})
    navigate('/home/createForm',{state:{id}})
  }
  // 删除表单
  const deleteForm = async(id:string,event:FormEvent)=>{
    event.stopPropagation();
    try {
      await api.deleteForm({id})

    let res
    if(!isStar)
    {
      res = await api.getFormList({offset:current,limit:5})
      if(res.data.total%5===0&&current>0&&total%5!==0)
      {
        setCurrent(current=>current-1)
        res = await api.getFormList({offset:current-1,limit:5})
      }
    }else{
      res = await api.getFormList({offset:current,limit:5,isStar:true})
      if(res.data.total%5===0&&current>0&&total%5!==0)
      {
        setCurrent(current=>current-1)
        res = await api.getFormList({offset:current-1,limit:5,isStar:true})
      }
    }
    setTotal(res.data.total)
    let list:{
        key: string,
        name: string,
        ctime: number,
        status:1|2|3|4,
        star:boolean
    }[] = []
    res.data.items.forEach(item=>{
      list.push({
        key:item.id,
        name:item.title,
        ctime:item.ctime,
        status:item.status as 1|2|3|4,
        star:item.isStar
      })
    })
    setFormList(list)
      message.success("删除成功")
    } catch (error) {
    }
  }
  // 停止表单收集
  const endForm = async(id:string,event:FormEvent)=>{
    event.stopPropagation();
    try {
      await api.endForm({id})
      getFormList()
      message.success("停止成功")
    } catch (error) {
    }
  }
  // 表单发布
  const startForm = async(id:string,event:FormEvent)=>{
    event.stopPropagation();
    try {
      await api.startForm({id})
      getFormList()
      message.success("发布成功")
    } catch (error) {
    }
  }
  // 查看结果
  const checkResult = async(id:string,event:FormEvent)=>{
    event.stopPropagation();
    try {
      navigate(`/home/formAction`,{replace:false,state:{id}})
      let res = await api.getForm({id})
      setTitle(res.data.item.title)
      setSubTitle(res.data.item.subTitle)
      setProblem(res.data.item.problems)
    } catch (error) {
    }
  }
  // 分享页
  const shareForm = async(id:string,event:FormEvent)=>{
    event.stopPropagation();
    try {
      navigate(`/home/formAction/share`,{replace:false,state:{id}})
      let res = await api.getForm({id})
      setTitle(res.data.item.title)
      setSubTitle(res.data.item.subTitle)
      setProblem(res.data.item.problems)
    } catch (error) {
    }
  }
  // 获取表单数据
  const getData = async(page:number)=>{
    setCurrent(page-1)
    let res 
    if(!isStar)
    {
      res= await api.getFormList({offset:page-1,limit:5})
      setTotal(res.data.total)
    }else{
      res = await api.getFormList({offset:page-1,limit:5,isStar:true})
      setTotal(res.data.total)
    }
    
    let list:{
      key: string,
      name: string,
      ctime: number,
      status:1|2|3|4,
      star:boolean
    }[] = []
  res.data.items.forEach(item=>{
    list.push({
      key:item.id,
      name:item.title,
      ctime:item.ctime,
      status:item.status as 1|2|3|4,
      star:item.isStar
    })
  })
  setFormList(list)
  }
  const getFormList =  useCallback( async ()=>{
    let res
    if(!isStar)
    {
      res = await api.getFormList({offset:current,limit:5})
    }else{
      res = await api.getFormList({offset:current,limit:5,isStar:true})
    }
    setTotal(res.data.total)
    let list:{
        key: string,
        name: string,
        ctime: number,
        status:1|2|3|4,
        star:boolean
    }[] = []
    res.data.items.forEach(item=>{
      list.push({
        key:item.id,
        name:item.title,
        ctime:item.ctime,
        status:item.status as 1|2|3|4,
        star:item.isStar
      })
    })
    setFormList(list)
  },[isStar,current])
  // 更改是否显示标星表单
  const changeStar = async()=>{
    setCurrent(0)
    let res
    if(isStar)
    {
      res = await api.getFormList({offset:0,limit:5})
    }else{
      res = await api.getFormList({offset:0,limit:5,isStar:true})
    }
    
    setTotal(res.data.total)
    let list:{
        key: string,
        name: string,
        ctime: number,
        status:1|2|3|4,
        star:boolean
    }[] = []
    res.data.items.forEach(item=>{
      list.push({
        key:item.id,
        name:item.title,
        ctime:item.ctime,
        status:item.status as 1|2|3|4,
        star:item.isStar
      })
    })
    setFormList(list)
    setStar(star=>!star)
  }
  useEffect(()=>{
    getFormList()
  },[getFormList])
  return (
    <div className={styles.list}>
        <div className={styles.left}>
          <Button type='primary' onClick={GoToCreate}><IAdd/>新建</Button>
          <div className={styles["form-list"]}>表单列表</div>
        </div>
        <div className={styles.right}>
          <div className={styles["star-action"]} onClick={changeStar}>
            仅展示星标
            {isStar?<IStar/>:<IStarEmpty/>}
          </div>
          <Table className='table' columns={columns} dataSource={formList} pagination={{ current:current+1,pageSize:5,total,onChange:(page)=>{getData(page)} }}  showHeader={false}
              onRow={record=>{
                return {
                  onClick:async()=>{
                    if(record.status===2)
                    {
                      navigate(`/home/createForm`,{replace:false,state:{id:record.key}})
                      let res = await api.getForm({id:record.key})
                      setTitle(res.data.item.title)
                      setSubTitle(res.data.item.subTitle)
                      setProblem(res.data.item.problems)
                    }
                    if(record.status===3||record.status===4 )
                    {
                      navigate(`/home/formAction`,{replace:false,state:{id:record.key}})
                      let res = await api.getForm({id:record.key})
                      setTitle(res.data.item.title)
                      setSubTitle(res.data.item.subTitle)
                      setProblem(res.data.item.problems)
                    }
                  }
                }
              }}
          />
        </div>
    </div>
  )
}
