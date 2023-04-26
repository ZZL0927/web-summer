import React from 'react'
import { useParams } from 'react-router-dom';
import Preview from '../Preview'
import styles from './index.module.scss'
export default function InputForm() {
  const id = useParams().id
  return (
    <div className={styles.body}>
      <Preview id={id}></Preview>
    </div>
  )
}
