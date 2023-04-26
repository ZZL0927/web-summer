import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { Navigate, NavLink,Outlet, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
export default function FormAction() {
  const {state} = useLocation()  
  let id
  if(state)
  {
    id = (state as {id:string}).id
  }
  const x = useLocation()
  const navigate = useNavigate()
  let check = useNavigationType()
  useEffect(()=>{
    // 判断用户是否通过正常的手段进入该页面，如果不是，则跳转到表单列表
    if(check==='POP'&&!state)navigate('/home/formList')
    
  })
  return (
    <div className={styles["form-action"]}>
        <div className={styles.header}>
            <header>
                    <NavLink to={`/home/formAction/data`} state={{id}} className={({isActive})=>{return isActive?styles.active:''}}>数据统计&分析</NavLink>
                    <NavLink to={`/home/formAction/form`} state={{id}} className={({isActive})=>{return isActive?styles.active:''}}>表单问题</NavLink>
                    <NavLink to={`/home/formAction/share`}  state={{id}} className={({isActive})=>{return isActive?styles.active:''}}>分享</NavLink>
            </header>
        </div>
        <div className={styles.content}>
            <div className={styles.body}>
                <Outlet/>
                {x.pathname==='/home/formAction'&&<Navigate to={`/home/formAction/data`} state={{id}}></Navigate>}
            </div>
        </div>
    </div>
  )
}
