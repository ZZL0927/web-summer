import React, { useState } from 'react';
import './App.css'
import { UserProvider } from "./hooks/store";
import {useRoutes} from 'react-router-dom'
import { Spin } from 'antd';
import routes from './routes';
function App() {
  const [avatar,setAvatar] = useState('')
  const [nickName,setNickName] = useState('')
  const [show,setShow] = useState(-1)
  const element = useRoutes(routes)
  return (
    <UserProvider value={{avatar,setAvatar,nickName,setNickName,show,setShow}}>
        <Spin className="spin" size="large" tip="Loading..." delay={30}/>
        <div className="App" onClick={()=>{setShow(-1)}}>
        {element}
      </div>
    </UserProvider>
  );
}

export default App;
