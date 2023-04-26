import * as request from "./request.js";
import { Book } from "./types.js";

let books: Book[] = [];

// 请求json数据
async function load() {
  books = await Promise.resolve(request.get<Book[]>("data/books.json"));
}
function createList() {
  // 内容区
  let main = document.querySelector("main");

  // 图书前的数字
  let index = 1;
  for (let book of books) {
    let listItem = document.createElement("div");
    listItem.className = "list-item";
    // 图书前的数字
    let number = document.createElement("span");
    number.className = "number";
    number.innerText = index + "";
    index++;
    // 书封面图
    let bookFace = document.createElement("img");
    bookFace.src = book.cover;
    // 书的描述区
    let text = document.createElement("div");
    text.className = "text";
    // 书名区
    let title = document.createElement("div");
    title.className = "title";
    // 作者名
    let author = document.createElement("p");
    author.className = "author";
    author.innerText = book.author;
    // 推荐值
    let recommend = document.createElement("div");
    recommend.className = "recommend";
    // 书的描述区的内部
    text.appendChild(title);
    text.appendChild(author);
    text.appendChild(recommend);
    // 书名文字
    let bookTitle = document.createElement("span");
    bookTitle.className = "book-title";
    bookTitle.innerText = book.title;
    // 书的推荐
    let people = document.createElement("span");
    people.className = "people";
    title.appendChild(bookTitle);
    title.appendChild(people);
    // 书的推荐的人数
    let peopleImg = document.createElement("img");
    peopleImg.src = "./imgs/people.svg";
    let peopleCount = document.createElement("span");
    peopleCount.className = "count";
    peopleCount.innerText = book.readingCount + "";
    people.appendChild(peopleImg);
    people.appendChild(peopleCount);
    // 书的推荐率
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let span3 = document.createElement("span");
    let recommendImg = document.createElement("img");
    span1.innerText = "推荐值";
    span2.className = "recommend-count";
    span2.innerText = book.rating + "";
    span3.innerText = "%";
    if (book.tag.length !== 0) {
      if (book.tag == "好评如潮") {
        recommendImg.src = "./imgs/hprc.svg";
      } else if (book.tag == "值得一读") {
        recommendImg.src = "./imgs/zdyd.svg";
      } else {
        recommendImg.src = "./imgs/kzrk.svg";
      }
    }
    recommend.appendChild(span1);
    recommend.appendChild(span2);
    recommend.appendChild(span3);
    book.tag.length !== 0 && recommend.appendChild(recommendImg);

    listItem.appendChild(number);
    listItem.appendChild(bookFace);
    listItem.appendChild(text);

    main!.appendChild(listItem);
  }
}

async function run() {
  // 等待数据加载完毕
  await load();
  // 创建标签
  createList();
}
run();
