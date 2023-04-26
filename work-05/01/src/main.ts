import * as request from "./request.js";
import { QQMusic, Playlist, Songlist, Mvlist } from "./types.js";

let musics: QQMusic;
let playlist: Playlist[] = [];
let songlist: Songlist[] = [];
let mvlist: Mvlist[] = [];

// 请求json数据
async function load() {
  musics = await Promise.resolve(request.get<QQMusic>("data/task.json"));
}
function createList() {
  let playList = document.querySelector(".imglist");
  let songList = document.querySelector(".song-img");
  let mvList = document.querySelector(".mv");
  playlist = musics.playlist;
  songlist = musics.songlist;
  mvlist = musics.mvlist;
  // 顶部
  for (let play of playlist) {
    playList.innerHTML += `
    <div class="imglist-item">
      <div class="imgbox">
          <img class="showImg" src="${play.cover}" alt="">
          <span class="play"></span>
      </div>
      <span class="img-title">${play.title}</span>
      <span class="play-count">
          <span>播放量：</span>
          <span class="play-count-data">${
            play.listen_num >= 10000
              ? (play.listen_num / 10000).toFixed(1) + "万"
              : play.listen_num
          }</span>
      </span>
    </div>`;
  }
  // 中部
  for (let song of songlist) {
    songList.innerHTML += `
    <div class="song-content">
        <div class="imgbox">
            <img class="showImg" src="${song.cover}" alt="">
            <span class="play song-play"></span>
        </div>
        <div class="text-content">
            <div class="content-left">
                <span>${song.name + song.subtitle}</span>
                <span>${song.singer.join(" /")}</span>
            </div>
            <span class="content-right">${
              "0" +
              Math.floor(song.interval / 60) +
              ":" +
              (song.interval % 60 >= 10
                ? song.interval % 60
                : "0" + (song.interval % 60))
            }</span>
        </div>
    </div>
    `;
  }
  // 底部
  for (let mv of mvlist) {
    mvList.innerHTML += `
    <div class="mv-item">
        <div class="imgbox">
            <img class="showImg" src="${mv.cover}" alt="">
            <span class="play mvplay"></span>
        </div>
        <p class="img-title">${mv.title}</p>
        <span class="mv-author">${mv.singer}</span>
        <span class="watch-count">
            <span class="iconfont">&#xe9f0;</span>
            <span>${
              mv.listen_num >= 10000
                ? (mv.listen_num / 10000).toFixed(1) + "万"
                : mv.listen_num
            }</span>
        </span>
    </div>
    `;
  }
}

async function run() {
  // 等待数据加载完毕
  await load();
  // 创建标签
  createList();
}
run();
