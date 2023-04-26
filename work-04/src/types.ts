export interface IBook {
  // "title": "Python编程：从入门到实践",
  // "author": "埃里克·马瑟斯",
  // "rating": 86.3,
  // "readingCount": 746,
  // "cover": "https://wfqqreader-1252317822.image.myqcloud.com/cover/930/22806930/t7_22806930.jpg",
  // "tag": "好评如潮"
  title: string;
  author: string;
  rating: number;
  readingCount: number;
  cover: string;
  tag: string;
}
export class Book implements IBook {
  title: string;
  author: string;
  rating: number;
  readingCount: number;
  cover: string;
  tag: string;
  constructor(obj: IBook) {
    this.title = obj.title;
    this.author = obj.author;
    this.rating = obj.rating;
    this.readingCount = obj.readingCount;
    this.cover = obj.cover;
    this.tag = obj.tag;
  }
}
