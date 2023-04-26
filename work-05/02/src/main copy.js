import * as request from "./request.js";
let authors = [];
// 请求json数据
export async function load(number) {
  let result = await Promise.resolve(request.get("data/task.json"));
  authors = result.data.icon[number];
}
export function createList() {
  let cards = document.querySelector(".cards");
  let card = document.querySelectorAll(".card");
  for (let i = 0; i < authors.length; i++) {
    let svgs = [];
    // 小图标
    for (let icon of authors[i].icons) {
      let svg = icon.show_svg.split("\\").join("");
      svgs.push(svg);
    }
    // 三块版图
    card[i].innerHTML = `
      <div class="author">
          <div class="author-img">
              <img src="./img/author.png" alt="">
          </div>
          <span class="author-name">${authors[i].User.nickname}</span>
      </div>
      <div class="icons">
          ${svgs.join("")}
      </div>
    `;
  }
}
async function run() {
  // 点击事件

  // 获取切换的元素
  let tabs = document.querySelectorAll(".tab");
  let cards = document.querySelector(".cards");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].onclick = async () => {
      // 将所有的选项都设为不选中
      for (let tab of tabs) {
        tab.className = "tab";
      }
      // 给当前的设置为选中
      tabs[i].className = "tab active";
      await load(i);
      createList();
      document.getElementsByTagName("html")[0].style["font-size"] = 26 + "px";
      let icons = document.querySelectorAll(".icons");
      // 6个图标时，图标变大，需更改html字体大小
      if (authors[0].icons.length === 6) {
        document.getElementsByTagName("html")[0].style["font-size"] = 60 + "px";
        for (let icon of icons) {
          icon.className = "icons six";
        }
      }
    };
  }
  // 最开始加载第一个
  await load(0);
  // 创建标签
  createList();
}
run();
