import * as request from "./request.js";
import { IArea, IAlbum, Area, Album } from "./types.js";

// 当前选中area的id
let currentArea: number;
let areas: Area[] = [];
let albums: Album[] = [];

// 请求json数据
async function load() {
  let [_areas, _albums] = await Promise.all([
    request.get<IArea[]>("data/areas.json"),
    request.get<IAlbum[]>("data/albums.json"),
  ]);
  areas = _areas.map((obj) => new Area(obj));
  albums = _albums.map((obj) => new Album(obj));
  // 设置当前选中第一个tab
  currentArea = areas[0].id;
}

// 切换tab
function changeTab(id: number) {
  // 如果是当前tab，不执行任何操作
  if (id === currentArea) return;
  // 设置当前选中的id
  currentArea = id;
  for (let area of areas) {
    // 修改这部分代码，实现切换tab选中状态的className
    if (area.id === id) {
      // area.el.className = xxxx
      area.el.className = "active";
    } else {
      // area.el.className = xxxx
      area.el.className = "";
    }
  }
  // 重新创建列表
  createList();
}

// 创建tabs
function createTabs() {
  let tabs = document.querySelector(".tabs");
  for (let area of areas) {
    // 修改这部分代码，实现创建tab标签的功能，记得和currentArea进行比较，设置选中状态的className
    let li = document.createElement("li");
    li.innerText = area.name;
    li.addEventListener("click", () => changeTab(area.id));
    tabs.appendChild(li);
    // 关联area对象和对应的DOM节点
    area.el = li;
    if (area.id == currentArea) {
      area.el.className = "active";
    }
  }
}

// 删除专辑
function deleteAlbum(album: Album) {
  // 实现删除列表项的代码，删除album关联的DOM，albums中删除该album对象，不需要重绘整个列表
  let list = document.getElementsByClassName("list")[0];
  list.removeChild(album.el);
  albums.splice(
    albums.findIndex((item) => JSON.stringify(item) == JSON.stringify(album)),
    1
  );
}

// 创建列表
function createList() {
  let list = document.querySelector(".list");
  // 根据当前选中的area过滤需要渲染的列表数据
  let rows = albums.filter((item) => item.area === currentArea);
  // 创建fragment，一次性插入，也可以直接appendChild每一个列表项到list里面
  let fragment = document.createDocumentFragment();
  // 遍历列表数据生成列表项元素
  for (let row of rows) {
    // 如果el为null，说明还没有创建过对应的DOM节点，否则可以直接复用，不用重复创建
    if (row.el === null) {
      // 修改这部分代码，改成创建自己设计的列表项DOM结构
      let album = document.createElement("div");
      album.className = "card";
      // 创建一个装照片的盒子
      let imgBox = document.createElement("div");
      imgBox.className = "imgBox";
      // img1表示歌曲的封面图
      let img1 = document.createElement("img");
      img1.className = "showImg";
      img1.setAttribute("src", row.cover);
      imgBox.appendChild(img1);
      // 删除图标
      let img2 = document.createElement("img");
      img2.className = "deleteImg";
      img2.setAttribute("src", "imgs/delete.png");
      imgBox.appendChild(img2);
      // 歌曲的名称
      let name = document.createElement("p");
      name.className = "name";
      name.innerHTML = row.name;
      // 歌手姓名
      let singer = document.createElement("p");
      singer.className = "singer";
      singer.innerHTML = row.singer;
      // 发行时间
      let release_time = document.createElement("p");
      release_time.className = "time";
      release_time.innerHTML = row.release_time;
      album.appendChild(imgBox);
      album.appendChild(name);
      album.appendChild(singer);
      album.appendChild(release_time);
      // 绑定删除事件，这里直接绑定给了子项，需要修改为绑定给删除图标
      album.addEventListener("click", () => deleteAlbum(row));
      // album.innerText = row.name;
      // 关联数据对象和DOM节点
      row.el = album;
    }
    // 将每一个列表项DOM先插入到fragment
    fragment.appendChild(row.el);
  }
  // 清空列表容器
  list.innerHTML = "";
  // 插入新的列表项
  list.appendChild(fragment);
}

async function run() {
  // 等待json数据加载完毕
  await load();
  // 创建标签
  createTabs();
  // 创建列表
  createList();
}

run();
