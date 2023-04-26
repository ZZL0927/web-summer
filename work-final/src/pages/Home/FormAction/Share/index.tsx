import React, { FormEvent, useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as api from '../../../../services/api'
import styles from './index.module.scss' 
import Logo from '../../../../assets/formLogo.svg'
import QRCode from 'qrcode.react'
import copy from 'copy-to-clipboard';
import { Button, message } from 'antd'
export default function Share() {
  const {state} = useLocation()
  const id = (state as {id:string}).id
  const [title,setTitle] = useState('')
  const getTitle = async(id:string)=>{
    let res = await api.getForm({id})
    setTitle(res.data.item.title)
  }
  const downLoad = ()=>{
    const canvasImg = document.getElementById('inputForm') as any; // 获取canvas类型的二维码
    const img = new Image();
    img.src = canvasImg!.toDataURL('image/png'); // 将canvas对象转换为图片的data url
    const downLink = document.getElementById('down_link') as any;
    downLink.href = img.src;
    downLink.download = '二维码'; // 图片name
  }
  const copyUrl = (e:FormEvent)=>{
    copy(document.domain+`/home/inputForm/${id}`)
    message.success("复制成功")
  }
  useEffect(()=>{
    getTitle(id)
  },[id])
  return (
    <div className={styles.share}>
      <p className={styles.header}>分享邀请他人填写</p>
      <div className={styles.qrcode}>
        <span className={styles.title}>{title}</span>
        <QRCode
          id="inputForm"
          value = {window.location.href.replace("formAction/share",`inputForm/${id}`)}
          imageSettings={{
            src:Logo,
            excavate:true,
            height:22,
            width:22
          }}
        />
      </div>
      <a id="down_link"  href='/' onClick={downLoad} className={styles.download}>下载二维码</a>
      <Button onClick={copyUrl}>复制链接</Button>
    </div>
  )
}
