import dayjs from "dayjs"
import { ICapsule } from "./types.js"
//   获取名字
const name: HTMLInputElement = document.querySelector("#name")!
//   获取邮箱
const email: HTMLInputElement = document.querySelector("#email")!
//   获取时间
const time: HTMLInputElement = document.querySelector("#time")!
//   获取内容
const content: HTMLInputElement = document.querySelector("#capsule-content")!
//   获取tip
const tip: HTMLInputElement = document.querySelector("#tips-content")!
let capsules: ICapsule[] = []
//   将时间输入框的内容动态添加
function initAction () {
  const timeInput: HTMLInputElement = document.querySelector(".time")!
  timeInput.value = dayjs().format("YYYY-MM-DD HH:mm:ss")
  if (localStorage.getItem("capsules")) {
    capsules = JSON.parse(localStorage.getItem("capsules")!)
  }
}

// 校验表单数据
function checkData () {
  let flag = true
  const nameTip = document.querySelector(".name-content") as HTMLElement
  // 红字提示
  nameTip.innerText = ""
  // 名字校验
  if (!name.value.trim()) {
    nameTip.innerText = "名字 必须填写"
    flag = false
  } else {
    if (name.value.length > 20) {
      nameTip.innerText = "名字 不能超过 20 个字."
      flag = false
    }
  }
  const emailTip: HTMLElement = document.querySelector(".email-content")!
  // 红字提示
  emailTip.innerText = ""
  // 邮箱校验
  if (!email.value.trim()) {
    emailTip.innerText = "邮箱 必须填写"
    flag = false
  } else {
    // 邮箱正则
    const emailRule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!email.value.match(emailRule)) {
      emailTip.innerText = "邮箱 必须是一个有效的电子邮箱地址."
      flag = false
    }
  }
  const timeTip: HTMLElement = document.querySelector(".time-content")!
  // 红字提示
  timeTip.innerText = ""
  // 胶囊的打开时间
  if (!time.value.trim()) {
    timeTip.innerText = "打开时间 必须填写"
    flag = false
  } else {
    // 时间正则
    const timeRule =
      /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/
    if (!time.value.match(timeRule)) {
      timeTip.innerText = "打开时间 格式不正确"
      flag = false
    }
  }
  const contentTip: HTMLElement = document.querySelector(".required-content")!
  // 红字提示
  contentTip.innerText = ""
  if (!content.value.trim()) {
    contentTip.innerText = "内容 必须填写"
    flag = false
  } else {
    if (content.value.length > 5000) {
      contentTip.innerText = "内容 不能超过 5000 个字."
      content.value = ""
      flag = false
    }
  }
  const tipTip:HTMLElement = document.querySelector(".tip-length")!
  // 红字提示
  tipTip.innerText = ""
  if (tip.value.length > 200) {
    tipTip.innerText = "未到期提示信息 不能超过 200 个字."
    flag = false
  }
  return flag
}
//    获取表单数据
function getData () {
  capsules.push({
    id: new Date().getTime() + "",
    name: name.value,
    email: email.value,
    time: Date.parse(time.value),
    content: content.value,
    tip: tip.value
  })
  //   将数据进行本地存储
  console.log("text")

  localStorage.setItem("capsules", JSON.stringify(capsules))
  //   将页面进行修改
  const header: HTMLElement = document.querySelector(".main-header")!
  header.innerText = "胶囊添加成功"
  const form = document.querySelector(".input-area")!
  form.innerHTML = ""
  const spanKey = document.createElement("span")
  spanKey.innerText = "胶囊Key"
  const inputBox = document.createElement("div")
  inputBox.className = "input-box"
  const input = document.createElement("input")
  input.value = capsules[capsules.length - 1].id
  const spanText = document.createElement("span")
  spanText.innerText = "你可以复制 key自己保存，也可以发送给你的好友，让他来打开胶囊。"
  inputBox.appendChild(input)
  inputBox.appendChild(spanText)
  form.appendChild(spanKey)
  form.appendChild(inputBox)
}
// 给提交按钮绑定点击事件
function submit () {
  const submit: HTMLElement = document.querySelector(".submit")!
  submit.onclick = function (event) {
    // 阻止默认事件
    event.preventDefault()
    // 如果校验通过
    if (checkData()) {
    // 将数据本地存储并更新页面
      getData()
    }
  }
}
// 主函数
function run () {
  initAction()
  submit()
}
run()
