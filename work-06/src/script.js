import { cards } from "./task.js";
let list = document.querySelector(".list");
for (let i = 0; i < cards.length; i++) {
  list.innerHTML += `
    <div class="card">
        <div class="imgbox">
            <img src=${cards[i].cover} alt="">
        </div>
        <div class="img-bottom">
            <div class="left">
                <img src=${cards[i].avatar} alt="">
                <span class="author-name">${cards[i].name}</span>
                ${
                  cards[i].badge.length > 0
                    ? `<span class="badge">${cards[i].badge}</span>`
                    : ""
                }
            </div>
            <div class="right">
                <img src="./imgs/icon-like.svg" alt="">
                <span>${cards[i].likes}</span>
                <img src="./imgs/icon-view.svg" alt="">
                <span>${cards[i].views}</span>
            </div>
        </div>
    </div>
    `;
}
let open = document.querySelector(".open");
if (open) {
  open.onclick = () => {
    open.style.display = "none";
    document.querySelector(".close").style.display = "block";
    document.querySelector(".main").style.display = "none";
    document.querySelector(".menu-inner").style.display = "block";
  };
}
let close = document.querySelector(".close");
if (close) {
  close.onclick = () => {
    close.style.display = "none";
    document.querySelector(".open").style.display = "block";
    document.querySelector(".main").style.display = "block";
    document.querySelector(".menu-inner").style.display = "none";
  };
}
