import React, { useContext } from 'react'
import { problemContext } from '../../../hooks/store'
import { ReactComponent as IconSuccess } from '../../../assets/success.svg'
import dayjs from 'dayjs'
import styles from './index.module.scss'
import { Button } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
export default function Success() {
  const id = useParams().id
  const {title} = useContext(problemContext)
  const navigate = useNavigate()
  const goSubmit = ()=>{
    navigate(`/home/inputForm/${id}`)
  }
  return (
    <div className={styles.success}>
      <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.main}>
            <IconSuccess/>
            <div className={styles.time}>
              <span className={styles.text}>提交成功</span>
              <span>今天{dayjs().format("HH:mm")}</span>
            </div>
          </div>
          <Button type='primary' onClick={goSubmit}>再填一份</Button>
      </div>
    </div>
  )
}
