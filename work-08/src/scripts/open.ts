import "../css/open.css";
import * as api from "../services/api";
import * as dayjs from "dayjs";
import { ICapsule } from "./types";
const openCapsule: HTMLElement = document.querySelector(".open")!;
const capsuleInput: HTMLInputElement = document.querySelector(".capsule")!;
const show: HTMLElement = document.querySelector(".show")!;
// 定时器
let timer;
function createDomByTime(currentTime: number, capsule: ICapsule) {
  const p = document.createElement("p");
  p.className = "content-title";
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");
  const span4 = document.createElement("span");
  const span5 = document.createElement("span");
  const span6 = document.createElement("span");
  const span7 = document.createElement("span");
  const span8 = document.createElement("span");
  span5.innerText = " 秒。";
  const div = document.createElement("div");
  div.className = "content-text";
  const p2 = document.createElement("p");
  p2.className = "time";
  const p3 = document.createElement("p");
  p3.className = "tip-title";
  if (capsule.time <= currentTime) {
    span1.innerText = capsule.name;
    span2.innerText = " 在 ";
    span3.innerText = dayjs(capsule.time).format("YYYY-MM-DD HH:mm:ss");
    span4.innerText = " 对你说：";
    p.appendChild(span1);
    p.appendChild(span2);
    p.appendChild(span3);
    p.appendChild(span4);
    div.innerText = capsule.content;
    show.appendChild(p);
    show.appendChild(div);
  } else {
    p.innerText = "这颗胶囊未到提取时间，不能打开。";
    span1.innerText = "打开时间在 ";
    span2.className = "time-end";
    span2.innerText = dayjs(capsule.time).format("YYYY-MM-DD HH:mm:ss");
    span3.innerText = "，距离现在 ";
    span4.className = "time-last";
    span4.innerText =
      Math.floor((capsule.time - new Date().getTime()) / 1000) + "";
    timer = setInterval(() => {
      let gap = Math.floor((capsule.time - new Date().getTime()) / 1000);
      if (gap <= 0) clearInterval(timer);
      span4.innerText = gap + "";
    }, 1000);
    p2.appendChild(span1);
    p2.appendChild(span2);
    p2.appendChild(span3);
    p2.appendChild(span4);
    p2.appendChild(span5);
    show.appendChild(p);
    show.appendChild(p2);
    span6.className = "name";
    span7.innerText = capsule.name;
    span8.innerText = " 给你留的提示信息：";
    p3.appendChild(span6);
    p3.appendChild(span7);
    span8.innerText = capsule.tip;
    div.appendChild(p3);
    div.appendChild(span8);
    show.appendChild(div);
  }
}
// 绑定点击事件
function run() {
  openCapsule.onclick = async () => {
    const capsuleId = capsuleInput.value;
    show.innerHTML = "";
    // 每次点击先将上一次定时器关闭
    clearInterval(timer);
    // 找到了对应id
    try {
      const res = await api.getCapsule(capsuleId);
      if (res.data) {
        // 找到对应的胶囊
        const capsule = res.data;
        createDomByTime(new Date().getTime(), capsule);
      } else {
        // 没找到对应id
        // <p class="no-found">没有这个胶囊Key</p>
        const p = document.createElement("p");
        p.className = "no-found";
        p.innerText = "没有这个胶囊";
        show.appendChild(p);
      }
    } catch (error) {
      console.log(error);
    }
  };
}
run();
