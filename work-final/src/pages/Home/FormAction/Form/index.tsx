import { useLocation } from 'react-router-dom'
import Preview from '../../Preview'

export default function Form() {
    const {state} = useLocation()
    const id = (state as {id:string}).id
  return <Preview id={id}/>
}
