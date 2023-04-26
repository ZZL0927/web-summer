import TextArea from 'antd/lib/input/TextArea'
import React, { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { problemContext } from '../../../hooks/store'
import useProblem from '../../../hooks/useProblem'
import styles from './index.module.scss'
import { DatePicker, Space,Rate,TimePicker,Radio, Checkbox, Select, Button, message, RadioChangeEvent} from 'antd';
import moment from 'moment';
import { Link, useLocation, useNavigate} from 'react-router-dom'
import * as api from '../../../services/api'
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { IResult } from '../../../types';
import LogoFinished from '../../../assets/mask.png'
const { Option } = Select;

export default function Preview(props:{id?:string}) {
    const {title,setTitle,subTitle,setSubTitle} = useContext(problemContext)
    const {problem,setProblem} = useProblem()
    const [value, setValue] = useState(0);
    const navigate = useNavigate()
    const [status,setStatus] = useState(0)
    const [result,setResult] = useState<IResult[]>([])
    const x = useLocation()
    const desc = ['1.0分', '2.0分', '3.0分', '4.0分', '5.0分'];
    const setForm = useCallback(async(id:string)=>{
        let res = await api.getForm({id})
        setStatus(res.data.item.status)
        setTitle(res.data.item.title)
        setSubTitle(res.data.item.subTitle)
        setProblem(res.data.item.problems)
    },[setTitle,setSubTitle,setProblem])
    const getResult = async(id:string)=>{
        let res = await api.getForm({id})
        setResult(res.data.item.problems)
    }
    const createForm = async()=>{
        try {
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
    useEffect(()=>{
        if(props.id)
        {
            setForm(props.id)
            getResult(props.id)
        }
    },[props.id,setForm])
  return (
    <div className={styles.form}>
    <h2 className={styles.title}>{title}</h2>
    <h4 className={styles.subTitle}>{subTitle}</h4>
    <div className={styles.body}>
        {problem.map((item,index)=>{
            if(item.type==='input')
            {
                return (<div className={styles.item} key={index}>
                            <div className={styles.top}>
                            

                                <div><span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>{item.title}</div>
                            </div>
                            <TextArea className={styles.text} placeholder="请输入" autoSize bordered={false} onChange={(e:FormEvent)=>{
                                let item = {...result[index]}
                                item.result = {
                                    value:(e.target as HTMLInputElement).value.trim()
                                }
                                result.splice(index,1,item)
                                setResult(result)
                            }}/>
                        </div>)
            }else if(item.type==='date')
            {
                return (
                    <div className={styles.item} key={index}>
                        <div className={styles.top}>
                        <div><span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>{item.title}</div>
                        </div>
                        <div className={styles.date}>
                            <Space direction="vertical">
                                <DatePicker bordered={false} placeholder="请输入" onChange={(dateString)=>{                                    
                                    let item = {...result[index]}
                                    item.result = {
                                        value:dateString+''
                                    }
                                    result.splice(index,1,item)
                                    setResult(result)
                                }}/>
                            </Space>
                        </div>
                    </div>
                )
            }else if(item.type==='score')
            {
                return (
                    <div className={styles.item} key={index}>
                        <div className={styles.top}>
                        <div><span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>{item.title}</div>
                        </div>
                        <span>
                            <Rate tooltips={desc} onChange={(e:number)=>{
                                setValue(e)
                                let item = {...result[index]}
                                item.result = {
                                    value:e
                                }
                                result.splice(index,1,item)
                                setResult(result)
                                }} value={value} />
                            {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                        </span>
                    </div>
                )
            }else if(item.type==='time')
            {
                return (
                    <div className={styles.item} key={index}>
                        <div className={styles.top}>
                        <div><span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>{item.title}</div>
                        </div>
                        <div className={styles.time}>
                            <TimePicker  defaultValue={moment('00:00:00', 'HH:mm:ss')} bordered={false} placeholder="请输入时间" onChange={(timeString)=>{
                                let item = {...result[index]}
                                item.result = {
                                    value:timeString+''
                                }
                                result.splice(index,1,item)
                                setResult(result)
                            }}/>
                        </div>
                    </div>
                )
            }else if(item.type==="singleSelect")
            {
                return (
                    <div className={styles.item} key={index}>
                        <div className={styles.top}>
                        <div><span className={styles.index}>{index+1}.&nbsp;<span className={styles.select}>【单选】</span>{item.required&&<span className={styles.required}>*</span>}</span>{item.title}</div>
                        </div>
                        <div className={styles.single}>
                        <Radio.Group className={styles.group} onChange={(e:RadioChangeEvent)=>{
                            let item = {...result[index]}
                            item["result"] = {value:{id:"",title:""}}
                            item.result!.value = {
                                id:uuidv4(),
                                title:e.target.value
                            }
                            result.splice(index,1,item)                            
                            setResult(result)
                        }}>
                            {
                                item.setting?.options.map((i,index)=>{
                                    return (
                                        <Radio key={index} value={i.title}>{i.title}</Radio>
                                    )
                                })
                            }
                        </Radio.Group>
                        </div>
                    </div>
                )
            }else if(item.type==="multiSelect")
            {
                return (
                    <div className={styles.item} key={index}>
                        <div className={styles.top}>
                        <div><span className={styles.index}>{index+1}.&nbsp;<span className={styles.select}>【多选】</span>{item.required&&<span className={styles.required}>*</span>}</span>{item.title}</div>
                        </div>
                        <div className={styles.multi}>
                        <Checkbox.Group className={styles.group} onChange={(e:CheckboxValueType[])=>{
                            let item = {...result[index]}
                            item["result"] = {value:{id:"",title:""}}
                                if(e.length>0)
                                {
                                    item.result!.value = e.map(i=>{
                                        return {
                                            id:uuidv4(),
                                            title:i+''
                                        }
                                    })
                                    if(item.result?.value.length===0)
                                    {
                                        delete item.result
                                    }
                                    result.splice(index,1,item)
                                    setResult(result)
                                }
                            }}>
                            {
                                item.setting?.options.map((i,index)=>{
                                    return <Checkbox key={index} value={i.title}>{i.title}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                        </div>
                    </div>
                )
            }else{
                return (
                    <div className={styles.item} key={index}>
                        <div className={styles.top}>
                        <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>

                            <span>{item.title}</span>
                        </div>
                        <div >
                        <Select className={styles.pull} placeholder="填写者选择区" bordered={false} onSelect={(e:string)=>{
                            let item = {...result[index]}
                            item["result"] = {value:{id:"",title:""}}
                            item.result!.value = {
                                id:uuidv4(),
                                title:e+''
                            }
                            result.splice(index,1,item)
                            setResult(result)
                        }}>
                            {
                                item.setting?.options.map((i,index)=>{
                                    return (
                                        <Option value={i.title} key={index}>{i.title}</Option>
                                    )
                                })
                            }
                            
                        </Select>
                            
                        </div>
                    </div>
                )
            }
        })}
    </div>
    <div className={styles.submit}>
        <Button type="primary" disabled={!x.pathname.startsWith("/home/inputForm")} onClick={async()=>{
            for(let item of result)
            {
                if(item.required===true&&(!item.result||item.result.value===""))
                {
                    message.info('请将必填项填写完整后提交')
                    return
                }
            }
            let res = await api.postInput({
                formId:props.id!,
                problems:result
            })
            if(res.stat==="ok")
            {
                message.info("表单提交成功")
                navigate(`/home/success/${props.id}`)
                let res = await api.getForm({id:props.id!})
                setTitle(res.data.item.title)
                setSubTitle(res.data.item.subTitle)
                setProblem(res.data.item.problems)
            }
        }}>提交</Button>
    </div>
    {x.pathname==="/home/formAction/form"&&<div className={styles.footer}>
        <Link to={`/home/inputForm/${props.id}`}>填写表单</Link>
    </div>}
    {x.pathname==="/home/preview"&&<div className={styles.footer}>
        <Button onClick={()=>{navigate('/home/createForm')}}>继续编辑</Button>
        <Button type='primary' onClick={createForm}>完成创建</Button>
    </div>}
    {status===4&&<div className={styles.mask}>
        <img src={LogoFinished} alt="已截止" />
        </div>}
</div>
  )
}
