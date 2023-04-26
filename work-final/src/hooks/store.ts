import { createContext } from "react";
interface UserContext {
  show: number;
  avatar: string;
  nickName: string;
  setShow: (show: number) => void;
  setAvatar: (avatar: string) => void;
  setNickName: (nickName: string) => void;
}
const userContext = createContext<UserContext>({
  show: -1,
  setShow: () => {},
  avatar: "",
  setAvatar: () => {},
  nickName: "",
  setNickName: () => {},
});
interface ProblemContext {
  problem: {
    id: string;
    // 表单子项的类型
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
  }[];
  listStar: {
    id: string;
    uId: string;
    status: 2;
    problem?: {
      id?: string;
      isNew?: boolean;
      title: string;
      type:
        | "input"
        | "date"
        | "time"
        | "score"
        | "singleSelect"
        | "multiSelect"
        | "pullSelect";
      required: boolean;
      setting?: {
        options: {
          title: string;
          status: 2;
        }[];
      };
    };
  }[];
  title: string;
  subTitle: string;
  setTitle: (id: string) => void;
  setSubTitle: (id: string) => void;
  setProblem: (
    arr: {
      id: string;
      // 表单子项的类型
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
    }[]
  ) => void;
  setListStar: (
    arr: {
      id: string;
      uId: string;
      status: 2;
      problem?: {
        id?: string;
        isNew?: boolean;
        title: string;
        type:
          | "input"
          | "date"
          | "time"
          | "score"
          | "singleSelect"
          | "multiSelect"
          | "pullSelect";
        required: boolean;
        setting?: {
          options: {
            title: string;
            status: 2;
          }[];
        };
      };
    }[]
  ) => void;
}
const problemContext = createContext<ProblemContext>({
  title: "",
  subTitle: "",
  problem: [],
  listStar: [],
  setProblem: () => {},
  setListStar: () => {},
  setTitle: () => {},
  setSubTitle: () => {},
});
interface QuestionsContext {
  questions: {
    title: string;
    type: string;
  }[];
  setQuestions: (
    arr: {
      title: string;
      type: string;
    }[]
  ) => void;
}
const questionsContext = createContext<QuestionsContext>({
  questions: [],
  setQuestions: () => {},
});
const UserProvider = userContext.Provider;
const ProblemProvider = problemContext.Provider;
const QuestionsProvider = questionsContext.Provider;
export {
  userContext,
  UserProvider,
  problemContext,
  ProblemProvider,
  questionsContext,
  QuestionsProvider,
};
