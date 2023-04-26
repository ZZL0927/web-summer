export class Playlist {
    title;
    cover;
    listen_num;
    constructor(obj) {
        this.title = obj.title;
        this.cover = obj.cover;
        this.listen_num = obj.listen_num;
    }
}
export class Songlist {
    name;
    subtitle;
    singer;
    interval;
    cover;
    constructor(obj) {
        this.name = obj.name;
        this.subtitle = obj.subtitle;
        this.singer = obj.singer;
        this.interval = obj.interval;
        this.cover = obj.cover;
    }
}
export class Mvlist {
    title;
    singer;
    listen_num;
    cover;
    constructor(obj) {
        this.title = obj.title;
        this.singer = obj.singer;
        this.listen_num = obj.listen_num;
        this.cover = obj.cover;
    }
}
export class QQMusic {
    playlist;
    songlist;
    mvlist;
}
//# sourceMappingURL=types.js.map