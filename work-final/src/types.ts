export interface ILogin {
  account: string;
  pwd: string;
}
export interface IRegister {
  account: string;
  pwd: string;
  confirmPwd: string;
}
export interface IProblem {
  id: string;
  title: string;
  type:
    | "input"
    | "singleSelect"
    | "multiSelect"
    | "pullSelect"
    | "date"
    | "time"
    | "score";
  required: boolean;
  isNew: boolean;
  setting?: {
    options: {
      title: string;
      status: 1 | 2;
    }[];
  };
}
export interface IForm {
  title: string;
  subTitle: string;
  problems: IProblem[];
}
export interface IProps {
  index: number;
  id: string;
}
export interface IList {
  id: string;
  ctime: number;
  utime: number;
  status: number;
  author: string;
  isStar: boolean;
  title: string;
  subTitle: string;
  problems?: {
    id: string;
    title: string;
    type: string;
    required: boolean;
    isNew: boolean;
  }[];
}
export interface IStar{
    id?:string,
    uId?:string,
    status?:1|2,
    problem?:{
      id?:string,
      isNew?:boolean
      title:string,
      type:"input"|"date"|"time"|"score"|"singleSelect"|"multiSelect"|"pullSelect",
      required:boolean
      setting?:{
        options:{
          title:string,
          status:2
        }[]
      }
    }
}

export interface IResult{
  id: string
  title: string
  type: "input" | "singleSelect" | "multiSelect"| "pullSelect" | "date" | "time" | "score"
  required: boolean
  setting?: {
    options: {
      title: string
      status: 1 | 2
    }[]
  }
  result?: {
    value: string | number | {
        id: string
        title: string
      } | {
        id: string
        title: string
      }[]
  }
}
export interface Result{
  id:string,
  title:string,
  type:"input"|"date"|"time"|"score"|"singleSelect"|"multiSelect"|"pullSelect",
  required:boolean,
  isNew:boolean,
  setting?:{
    options:{
      title:string,
      status:2,
      id:string
    }[]
  },
  result:{
    value:string|number|{
      id:string,
      title:string
    }|{
      id:string,
      title:string
    }[]
  }
}
export interface IGetForm {
  id:string,
      ctime:number,
      utime:number,
      status:1|2|3|4,
      author:string,
      isStar:boolean,
      title:string,
      subTitle:string,
      problems:{
        id:string,
        title:string,
        type:"input"|"date"|"time"|"score"|"singleSelect"|"multiSelect"|"pullSelect",
        required:boolean,
        isNew:boolean,
        setting?:{
          options:{
            title:string,
            status:2,
            id:string
          }[]
        }
      }[]
}
export interface IFormResult{

    info:IGetForm,
    items:{
      id:string,
      formAuthor:string,
      formId:string,
      result:Result[]
    }[]
}
export interface IStarProblem {
  id:string,
  uId:string,
  status:2,
  problem?:{
    id?:string,
    isNew?:boolean
    title:string,
    type:"input"|"date"|"time"|"score"|"singleSelect"|"multiSelect"|"pullSelect",
    required:boolean
    setting?:{
      options:{
        title:string,
        status:2
      }[]
    }
  }
}