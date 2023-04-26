import { ICapsule } from "./types.js";
import dayjs from "dayjs";
let capsules: ICapsule[] = [];

// 绑定点击事件
function run() {
  const openCapsule: HTMLElement = document.querySelector(".open")!;
  const capsuleInput: HTMLInputElement = document.querySelector(".capsule")!;
  const show: HTMLElement = document.querySelector(".show")!;
  // 定时器
  let timer;
  openCapsule.onclick = () => {
    const capsuleId = capsuleInput.value;
    show.innerHTML = "";
    // 每次点击先将上一次定时器关闭
    clearInterval(timer);
    // 读取数据
    if (localStorage.getItem("capsules")) {
      capsules = JSON.parse(localStorage.getItem("capsules")!);
    }
    // 找到了对应id
    if (capsules.length > 0 && capsules.find((item) => item.id === capsuleId)) {
      // 找到对应的胶囊
      const capsule = capsules.find((item) => item.id === capsuleId)!;
      console.log(capsule);
      // 胶囊可以正常打开
      if (capsule.time <= new Date().getTime()) {
        //    <p class="content-title"><span>张子龙</span><span> 在 </span><span>2022-07-19 09:12:15</span><span> 对你说：</span></p>
        //    <div class="content-text">test</div>
        const p = document.createElement("p");
        p.className = "content-title";
        const span1 = document.createElement("span");
        span1.innerText = capsule.name;
        const span2 = document.createElement("span");
        span2.innerText = " 在 ";
        const span3 = document.createElement("span");
        span3.innerText = dayjs(capsule.time).format("YYYY-MM-DD HH:mm:ss");
        const span4 = document.createElement("span");
        span4.innerText = " 对你说：";
        const div = document.createElement("div");
        div.className = "content-text";
        div.innerText = capsule.content;
        p.appendChild(span1);
        p.appendChild(span2);
        p.appendChild(span3);
        p.appendChild(span4);
        show.appendChild(p);
        show.appendChild(div);
      } else {
        // 胶囊没到时间
        //
        //  <p class="content-title">这颗胶囊未到提取时间，不能打开。</p>
        //   <p class="time"><span>打开时间在 </span><span class="time-end">2022-07-20 21:25:32</span><span>，距离现在 </span><span class="time-last">86243</span><span> 秒。</span></p>
        //   <div class="content-text">
        //     <p class="tip-title"><span class="name">张子龙</span><span> 给你留的提示信息：</span></p>
        //     <span>text</span>
        //  </div>
        const p1 = document.createElement("p");
        p1.className = "content-title";
        p1.innerText = "这颗胶囊未到提取时间，不能打开。";
        const p2 = document.createElement("p");
        p2.className = "time";
        const span1 = document.createElement("span");
        span1.innerText = "打开时间在 ";
        const span2 = document.createElement("span");
        span2.className = "time-end";
        span2.innerText = dayjs(capsule.time).format("YYYY-MM-DD HH:mm:ss");
        const span3 = document.createElement("span");
        span3.innerText = "，距离现在 ";
        const span4 = document.createElement("span");
        span4.className = "time-last";
        span4.innerText = Math.floor((capsule.time - new Date().getTime()) / 1000) + "";

        timer = setInterval(() => {
          let gap = Math.floor((capsule.time - new Date().getTime()) / 1000);
          if (gap <= 0) clearInterval(timer);
          span4.innerText = gap + "";
        }, 1000);

        const span5 = document.createElement("span");
        span5.innerText = " 秒。";
        p2.appendChild(span1);
        p2.appendChild(span2);
        p2.appendChild(span3);
        p2.appendChild(span4);
        p2.appendChild(span5);
        const div = document.createElement("div");
        div.className = "content-text";
        const p3 = document.createElement("p");
        p3.className = "tip-title";
        const span6 = document.createElement("span");
        span6.className = "name";
        span6.innerText = capsule.name;
        const span7 = document.createElement("span");
        span7.innerText = " 给你留的提示信息：";
        p3.appendChild(span6);
        p3.appendChild(span7);
        const span8 = document.createElement("span");
        span8.innerText = capsule.tip;
        div.appendChild(p3);
        div.appendChild(span8);
        show.appendChild(p1);
        show.appendChild(p2);
        show.appendChild(div);
      }
    } else {
      // 没找到对应id
      //   <p class="no-found">没有这个胶囊Key</p>
      const p = document.createElement("p");
      p.className = "no-found";
      p.innerText = "没有这个胶囊";
      show.appendChild(p);
    }
  };
}
run();
