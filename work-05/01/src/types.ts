interface IPlaylist {
  title: string;
  cover: string;
  listen_num: number;
}
export class Playlist implements IPlaylist {
  title: string;
  cover: string;
  listen_num: number;
  constructor(obj: Playlist) {
    this.title = obj.title;
    this.cover = obj.cover;
    this.listen_num = obj.listen_num;
  }
}
interface ISonglist {
  name: string;
  subtitle: string;
  singer: string[];
  interval: number;
  cover: string;
}
export class Songlist implements ISonglist {
  name: string;
  subtitle: string;
  singer: string[];
  interval: number;
  cover: string;
  constructor(obj: Songlist) {
    this.name = obj.name;
    this.subtitle = obj.subtitle;
    this.singer = obj.singer;
    this.interval = obj.interval;
    this.cover = obj.cover;
  }
}
interface IMvlist {
  title: string;
  singer: string;
  listen_num: number;
  cover: string;
}
export class Mvlist implements IMvlist {
  title: string;
  singer: string;
  listen_num: number;
  cover: string;
  constructor(obj: Mvlist) {
    this.title = obj.title;
    this.singer = obj.singer;
    this.listen_num = obj.listen_num;
    this.cover = obj.cover;
  }
}
export class QQMusic {
  playlist: Playlist[];
  songlist: Songlist[];
  mvlist: Mvlist[];
}
