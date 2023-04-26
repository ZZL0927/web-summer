import '../css/put.css'
import * as dayjs from 'dayjs'
import * as api from '../services/api'
//   获取名字
const name: HTMLInputElement = document.querySelector('#name')!
//   获取邮箱
const email: HTMLInputElement = document.querySelector('#email')!
//   获取时间
const time: HTMLInputElement = document.querySelector('#time')!
//   获取内容
const content: HTMLInputElement = document.querySelector('#capsule-content')!
//   获取tip
const tip: HTMLInputElement = document.querySelector('#tips-content')!
// 红字提示框
const nameTip = document.querySelector('.name-content') as HTMLElement
const emailTip = document.querySelector('.email-content') as HTMLElement
const timeTip = document.querySelector('.time-content') as HTMLElement
const contentTip = document.querySelector('.required-content') as HTMLElement
const tipTip = document.querySelector('.tip-length') as HTMLElement


//   将时间输入框的内容动态添加
function initAction () {
  const timeInput: HTMLInputElement = document.querySelector('.time')!
  timeInput.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}

// 自定义校验规则函数
function rules(title:string,value:string,rules:{maxlength?:number,minlength?:number,required?:boolean,match?:RegExp}){
  if(rules.required&&value.length===0)
  {
    return `${title} 必须填写`
  }
  else if(rules.maxlength&&value.length>rules.maxlength)
  {
    return `${title} 不能超过${rules.maxlength}个字`
  }
  else if(rules.minlength&&value.length<rules.minlength)
  {
    return `${title} 不能少于${rules.minlength}个字`
  }
  else if(rules.match&&!value.match(rules.match))
  {
    return `${title} 格式不正确`
  }
  return ''
}
// 显示红字提示
function checkData () {  
  nameTip.innerText = rules('名字',name.value.trim(),{required:true})
  emailTip.innerText = rules('邮箱',email.value.trim(),{required:true,match:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/})
  timeTip.innerText = rules('时间',time.value.trim(),{required:true,match:/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/})
  contentTip.innerText = rules('内容',content.value.trim(),{required:true,maxlength:5000})
  tipTip.innerText = rules('未到期提示信息',tip.value.trim(),{maxlength:200})
  // 都没有返回错误信息，则验证通过  
  return nameTip.innerText.length===0&&emailTip.innerText.length===0&&contentTip.innerText.length===0&&timeTip.innerText.length===0&&tipTip.innerText.length===0
}
//    获取表单数据
async function setData () {
  const data = {
    id: new Date().getTime() + '',
    name: name.value.trim(),
    email: email.value.trim(),
    time: Date.parse(time.value),
    content: content.value.trim(),
    tip: tip.value.trim()
  }
  // 将数据传给后端
  try {
    const res = await api.putCapsule(data)
    //   将页面进行修改
    const header: HTMLElement = document.querySelector('.main-header')!
    header.innerText = '胶囊添加成功'
    const form = document.querySelector('.input-area')!
    form.innerHTML = ''
    const spanKey = document.createElement('span')
    spanKey.innerText = '胶囊Key'
    const inputBox = document.createElement('div')
    inputBox.className = 'input-box'
    const input = document.createElement('input')
    input.value = res.id as string
    const spanText = document.createElement('span')
    spanText.innerText =
      '你可以复制 key自己保存，也可以发送给你的好友，让他来打开胶囊。'
    inputBox.appendChild(input)
    inputBox.appendChild(spanText)
    form.appendChild(spanKey)
    form.appendChild(inputBox)
  } catch (error) {
    console.log(error)
  }
}
// 给提交按钮绑定点击事件
function submit () {
  const submit: HTMLElement = document.querySelector('.submit')!
  submit.onclick = function (event) {
    // 阻止默认事件
    event.preventDefault()
    // 如果校验通过
    if (checkData()) {
      // 传递数据并更新页面
      setData()
    }
  }
}
// 主函数
function run () {
  initAction()
  submit()
}
run()
