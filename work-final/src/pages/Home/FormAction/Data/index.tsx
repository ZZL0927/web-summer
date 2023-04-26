import React, { FormEvent, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as api from '../../../../services/api'
import styles from './index.module.scss' 
import empty from '../../../../assets/empty.png'
import dayjs from 'dayjs'
import TextArea from 'antd/lib/input/TextArea'
import { IFormResult,Result,IProblem } from '../../../../types'
import { Checkbox, Radio, Rate, Table, Tabs } from 'antd'
import PieChart from '../../../../component/PieChart'
import LineChart from '../../../../component/LineChart'
export default function Data() {
  const {state} = useLocation()  
  const id = (state as {id:string}).id
  const [count,setCount] = useState(0)
  const [current,setCurrent] = useState(1)
  const [data,setData] = useState<IFormResult>()
  const getForm = async(id:string)=>{
    let res = await api.getInputForm(id)
    setCount(res.data.items.length)
    setData(res.data)
  }
  const down = ()=>{
    if(current>1)
    {
        setCurrent(cur=>cur-1)
    }
  }
  const up = ()=>{
    if(current<count)
    {
        setCurrent(cur=>cur+1)
    }
  }
  const changeId = (e:FormEvent)=>{
    let result = (e.target as HTMLInputElement).value
    if((parseInt(result)+"")!==result)return
    if(parseInt(result)>count||parseInt(result)===0)return
    setCurrent(parseInt(result))
  }
  const desc = ['1.0分', '2.0分', '3.0分', '4.0分', '5.0分'];

  const { TabPane } = Tabs;

    const onChange = (key: string) => {
    console.log(key);
    };
  useEffect(()=>{
    getForm(id!)
  },[id])
  return (
    <div className={styles["data-body"]}>
        <Tabs defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="数据统计" key="1">
            {count===0&&<div className={styles.empty}>
            <img src={empty} alt="无数据" />
            <span>暂无收集结果</span>
            <Link to='/home/formAction/form' state={{id}}>邀请填写</Link>
            </div>}
            {count>0&&
            <div className={styles.content}>
                <span className={styles.header}>共收集{count}份数据&nbsp;(正在收集)</span>
                <div className={styles.body}>
                    {data!.info.problems.map((item:IProblem,index:number)=>{
                        if(item.type==='input')
                        {
                            return (<div className={styles.item} key={index}>
                                        <div className={styles.top}>
                                        <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                            <span>{item.title}</span>
                                        </div>
                                        <div className={data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length!==0?styles.text:styles.none}>{data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length!==0?(<Table columns={
                                            [{
                                            title: '序号',
                                            dataIndex: 'index',
                                            key: 'index',
                                            align:'center',
                                            width:170
                                            },
                                            {
                                                title: '内容',
                                                dataIndex: 'content',
                                                key: 'content',
                                                align:'center'
                                            }]} dataSource={data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).map((i,index)=>({
                                                key:index+'',
                                                index:index+'',
                                                content:i.result.value
                                            }))} pagination={false} bordered={true} />)
                                        :"该项未填写"}</div>
                                    </div>)
                        }
                        else if(item.type==='date')
                        {
                            return (
                                <div className={styles.item} key={index}>
                                    <div className={styles.top}>
                                    <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className={data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length!==0?styles.text:styles.none}>{data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length!==0?(<Table columns={
                                            [{
                                            title: '序号',
                                            dataIndex: 'index',
                                            key: 'index',
                                            align:'center',
                                            width:170
                                            },
                                            {
                                                title: '内容',
                                                dataIndex: 'content',
                                                key: 'content',
                                                align:'center'
                                            }]} dataSource={data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).map((i,index)=>({
                                                key:index+'',
                                                index:index+'',
                                                content:dayjs(parseInt(i.result.value as string)).format("YYYY/MM/DD")
                                            }))} pagination={false} bordered={true} />)
                                        :"该项未填写"}</div>
                                </div>
                            )
                        }
                        else if(item.type==='score')
                        {
                            return (
                                <div className={styles.item} key={index}>
                                    <div className={styles.top}>
                                        <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <span>
                                        <div className={data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length!==0?styles.text:styles.none}>{data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length!==0?(
                                            <div className={styles.score}>
                                                <span>平均分:</span> <span>{parseFloat((data!.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>(pre+(cur.result.value as number)),0)/(data!.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length)).toPrecision(2))}分</span><Rate tooltips={desc}  value={parseFloat((data!.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>(pre+(cur.result.value as number)),0)/(data!.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length)).toPrecision(2))} />
                                                
                                            </div>
                                        )
                                        :"该项未填写"}</div>
                                    </span>
                                </div>
                            )
                        }
                        else if(item.type==='time')
                        {
                            return (
                                <div className={styles.item} key={index}>
                                    <div className={styles.top}>
                                    <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className={data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length!==0?styles.text:styles.none}>{data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length!==0?(<Table columns={
                                            [{
                                            title: '序号',
                                            dataIndex: 'index',
                                            key: 'index',
                                            align:'center',
                                            width:170
                                            },
                                            {
                                                title: '内容',
                                                dataIndex: 'content',
                                                key: 'content',
                                                align:'center'
                                            }]} dataSource={data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).map((i,index)=>({
                                                key:index+'',
                                                index:index+'',
                                                content:dayjs(parseInt(i.result.value as string)).format("HH:mm")
                                            }))} pagination={false} bordered={true} />)
                                        :"该项未填写"}</div>
                                </div>
                            )
                        }
                        else if(item.type==="singleSelect")
                        {
                            return (
                                <div className={styles.item} key={index}>
                                    <div className={styles.top}>
                                    <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                    <span className={styles.select}>【单选】</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className={styles.single}>
                                    <Tabs tabPosition="bottom">
                                        <TabPane tab="表格" key="1">
                                            {data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length!==0?(<Table columns={
                                            [{
                                            title: '选项',
                                            dataIndex: 'option',
                                            key: 'option',
                                            align:'center',
                                            },
                                            {
                                                title: '计数',
                                                dataIndex: 'count',
                                                key: 'count',
                                                align:'center'
                                            },
                                            {
                                                title: '比例',
                                                dataIndex: 'rate',
                                                key: 'rate',
                                                align:'center'
                                            }
                                        ]} dataSource={item.setting!.options.map((i,num)=>({
                                                key:num+'',
                                                option:i.title,
                                                count:data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>{
                                                    if((cur.result.value as {title:string}).title===i.title)
                                                    {
                                                        return pre+1
                                                    }else{
                                                        return pre
                                                    }
                                                },0),
                                                rate:parseFloat(((data!.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>{
                                                    if((cur.result.value as {title:string}).title===i.title)
                                                    {
                                                        return pre+1
                                                    }else{
                                                        return pre
                                                    }
                                                },0))/(data!.items.length)*100).toFixed(2))+'%'
                                            }))} pagination={false} bordered={true} />)
                                        :"该项未填写"}
                                        </TabPane>
                                        <TabPane tab="饼图" key="2" >
                                        <PieChart series={[{
                                            type:'pie',
                                            data:item.setting!.options.map((i,num)=>({
                                                value:(data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>{
                                                    if((cur.result.value as {title:string}).title===i.title)
                                                    {
                                                        return pre+1
                                                    }else{
                                                        return pre
                                                    }
                                                },0))||0,
                                                name:i.title
                                            }))
                                        }]}></PieChart>
                                        </TabPane>
                                        <TabPane tab="条形图" key="3">
                                        <LineChart option={{
                                            xAxis:{
                                                data:item.setting!.options.map(i=>i.title)
                                            },
                                            yAxis:{},
                                            series:[{
                                                type:'bar',
                                                data: item.setting!.options.map((i,num)=>{
                                                    return (data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>{
                                                        if((cur.result.value as {title:string}).title===i.title)
                                                        {
                                                            return pre+1
                                                        }else{
                                                            return pre
                                                        }
                                                    },0))||0
                                                }),
                                                barWidth: '20%'
                                            }]
                                        }}></LineChart>
                                        </TabPane>
                                    </Tabs>
                                    </div>
                                </div>
                            )
                        }
                        else if(item.type==="multiSelect")
                        {
                            return (
                                <div className={styles.item} key={index}>
                                    <div className={styles.top}>
                                    <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                    <span className={styles.select}>【多选】</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className={styles.multi}>
                                    <Tabs tabPosition="bottom">
                                        <TabPane tab="表格" key="1">
                                            {data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length!==0?(<Table columns={
                                            [{
                                            title: '选项',
                                            dataIndex: 'option',
                                            key: 'option',
                                            align:'center',
                                            },
                                            {
                                                title: '计数',
                                                dataIndex: 'count',
                                                key: 'count',
                                                align:'center'
                                            },
                                            {
                                                title: '比例',
                                                dataIndex: 'rate',
                                                key: 'rate',
                                                align:'center'
                                            }
                                        ]} dataSource={item.setting!.options.map((i,num)=>({
                                                key:num+'',
                                                option:i.title,
                                                count:data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>{
                                                    if((cur.result.value as {id:string,title:string}[]).some(x=>x.title===i.title))
                                                    {
                                                        return pre+1
                                                    }else{
                                                        return pre
                                                    }
                                                },0),
                                                rate:parseFloat(((data!.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>{
                                                    if((cur.result.value as {id:string,title:string}[]).some(x=>x.title===i.title))
                                                    {
                                                        return pre+1
                                                    }else{
                                                        return pre
                                                    }
                                                },0))/(data!.items.length)*100).toFixed(2))+'%'
                                            }))} pagination={false} bordered={true} />)
                                        :"该项未填写"}
                                        </TabPane>
                                        <TabPane tab="饼图" key="2">
                                        <PieChart series={[{
                                            type:'pie',
                                            data:item.setting!.options.map((i,num)=>({
                                                value:(data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>{
                                                    if((cur.result.value as {id:string,title:string}[]).some(x=>x.title===i.title))
                                                    {
                                                        return pre+1
                                                    }else{
                                                        return pre
                                                    }
                                                },0))||0,
                                                name:i.title
                                            }))
                                        }]}></PieChart>
                                        </TabPane>
                                        <TabPane tab="条形图" key="3">
                                        <LineChart option={{
                                            xAxis:{
                                                data:item.setting!.options.map(i=>i.title)
                                            },
                                            yAxis:{},
                                            series:[{
                                                type:'bar',
                                                data: item.setting!.options.map((i,num)=>{
                                                    return (data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>{
                                                        if((cur.result.value as {id:string,title:string}[]).some(x=>x.title===i.title))
                                                        {
                                                            return pre+1
                                                        }else{
                                                            return pre
                                                        }
                                                    },0))||0
                                                }),
                                                barWidth: '20%'
                                            }]
                                        }}></LineChart>
                                        </TabPane>
                                    </Tabs>
                                    </div>
                                </div>
                            )
                        }
                        else{
                            return (
                                <div className={styles.item} key={index}>
                                    <div className={styles.top}>
                                    <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className={styles.pull}>
                                    <Tabs tabPosition="bottom">
                                        <TabPane tab="表格" key="1">
                                            {data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).length!==0?(<Table columns={
                                            [{
                                            title: '选项',
                                            dataIndex: 'option',
                                            key: 'option',
                                            align:'center',
                                            },
                                            {
                                                title: '计数',
                                                dataIndex: 'count',
                                                key: 'count',
                                                align:'center'
                                            },
                                            {
                                                title: '比例',
                                                dataIndex: 'rate',
                                                key: 'rate',
                                                align:'center'
                                            }
                                        ]} dataSource={item.setting!.options.map((i,num)=>({
                                                key:num+'',
                                                option:i.title,
                                                count:data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>{
                                                    if((cur.result.value as {title:string}).title===i.title)
                                                    {
                                                        return pre+1
                                                    }else{
                                                        return pre
                                                    }
                                                },0),
                                                rate:parseFloat(((data!.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>{
                                                    if((cur.result.value as {title:string}).title===i.title)
                                                    {
                                                        return pre+1
                                                    }else{
                                                        return pre
                                                    }
                                                },0))/(data!.items.length)*100).toFixed(2))+'%'
                                            }))} pagination={false} bordered={true} />)
                                        :"该项未填写"}
                                        </TabPane>
                                        <TabPane tab="饼图" key="2" >
                                        <PieChart series={[{
                                            type:'pie',
                                            data:item.setting!.options.map((i,num)=>({
                                                value:(data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>{
                                                    if((cur.result.value as {title:string}).title===i.title)
                                                    {
                                                        return pre+1
                                                    }else{
                                                        return pre
                                                    }
                                                },0))||0,
                                                name:i.title
                                            }))
                                        }]}></PieChart>
                                        </TabPane>
                                        <TabPane tab="条形图" key="3">
                                        <LineChart option={{
                                            xAxis:{
                                                data:item.setting!.options.map(i=>i.title)
                                            },
                                            yAxis:{},
                                            series:[{
                                                type:'bar',
                                                data: item.setting!.options.map((i,num)=>{
                                                    return (data?.items.map(x=>x.result[index]).filter(y=>y.result!==undefined).reduce((pre,cur)=>{
                                                        if((cur.result.value as {title:string}).title===i.title)
                                                        {
                                                            return pre+1
                                                        }else{
                                                            return pre
                                                        }
                                                    },0))||0
                                                }),
                                                barWidth: '20%'
                                            }]
                                        }}></LineChart>
                                        </TabPane>
                                    </Tabs>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>

            </div>
            }
            </TabPane>
            <TabPane tab="数据详情" key="2">
            {count===0&&<div className={styles.empty}>
            <img src={empty} alt="无数据" />
            <span>暂无收集结果</span>
            <Link to='/home/formAction/form' state={{id}}>邀请填写</Link>
            </div>}
            {count>0&&
            <div className={styles.content}>
                <span className={styles.header}>共收集{count}份数据&nbsp;(正在收集)</span>
                <div className={styles.change}><span className={styles.action} onClick={down}>&lt;</span>第<input className={styles.current} value={current} onChange={(e:FormEvent)=>{changeId(e)}}/>份<span onClick={up} className={styles.action}>&gt;</span></div>
                <span className={styles.time}>提交时间{dayjs(data!.info.ctime).format('YYYY/MM/DD HH:mm:ss')}</span>
                <h2 className={styles.title}>{data!.info.title}</h2>
                <h4 className={styles.subTitle}>{data!.info.subTitle}</h4>
                <div className={styles.body}>
                    {data!.items[current-1].result.map((item:Result,index:number)=>{
                        if(item.type==='input')
                        {
                            return (<div className={styles.item} key={index}>
                                        <div className={styles.top}>
                                        <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                            <span>{item.title}</span>
                                        </div>
                                        <TextArea className={item.result?styles.text:styles.none} value={item.result?(item.result.value+''):"该项未填写"} autoSize bordered={false}/>
                                    </div>)
                        }else if(item.type==='date')
                        {
                            return (
                                <div className={styles.item} key={index}>
                                    <div className={styles.top}>
                                    <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className={styles.date}>
                                        <span className={item.result?styles.text:styles.none}>{item.result?dayjs((item.result.value as number)/1).format('YYYY年MM月DD日'):"该项未填写"}</span>
                                    </div>
                                </div>
                            )
                        }else if(item.type==='score')
                        {
                            return (
                                <div className={styles.item} key={index}>
                                    <div className={styles.top}>
                                        <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <span>
                                        <Rate tooltips={desc}  value={item.result?(item.result.value as number):0} />
                                        {item.result?(item.result.value ? <span className="ant-rate-text">{desc[(item.result.value as number) - 1]}</span> : ''):""}
                                    </span>
                                </div>
                            )
                        }else if(item.type==='time')
                        {
                            return (
                                <div className={styles.item} key={index}>
                                    <div className={styles.top}>
                                    <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className={styles.time}>
                                        <span className={item.result?styles.text:styles.none}>{item.result?dayjs((item.result.value as number)/1).format('YYYY年MM月DD日 hh:mm:ss'):"该项未填写"}</span>
                                    </div>
                                </div>
                            )
                        }else if(item.type==="singleSelect")
                        {
                            return (
                                <div className={styles.item} key={index}>
                                    <div className={styles.top}>
                                    <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                    <span className={styles.select}>【单选】</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className={styles.single}>
                                        <Radio.Group className={styles.group} value={item.result?(item.result.value as {id:string,title:string}).title:''}>
                                        {                                
                                            item.setting?.options.map((i:{
                                                title: string;
                                                status: 2;
                                                id: string;
                                            },index:number)=>{
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
                                    <span className={styles.index}>{index+1}.&nbsp;&nbsp;{item.required&&<span className={styles.required}>*</span>}</span>
                                    <span className={styles.select}>【多选】</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className={styles.multi}>
                                    <Checkbox.Group className={styles.group} value={item.result?(item.result.value as {id:string,title:string}[]).map((x:{id:string,title:string})=>x.title):[]}>
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
                                    <div className={styles.pull}>
                                    <span className={item.result?styles.text:styles.none}>{item.result?(item.result.value as {id:string,title:string}).title:"该项未填写"}</span>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>

            </div>
            }
            </TabPane>
        </Tabs>
      
    </div>
  )
}
