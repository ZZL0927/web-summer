import { useCallback, useContext } from "react";
import { problemContext, userContext } from "./store";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";
import * as api from "../services/api";
import { IStar } from "../types";
export default function useProblem() {
  const { problem, listStar, setListStar, setProblem } =
    useContext(problemContext);
  const { show, setShow } = useContext(userContext);
  // 增加输入框表单
  const addFormInput = useCallback(
    (star?: IStar) => {
      let type:
        | "input"
        | "singleSelect"
        | "multiSelect"
        | "pullSelect"
        | "date"
        | "time"
        | "score" = "input";
      let arr = {
        id: uuidv4(),
        title: star ? star.problem?.title! : "请输入内容",
        type,
        required: star ? star.problem?.required! : false,
        isNew: star ? star.problem?.isNew! : false,
      };
      setProblem([...problem, arr]);
    },
    [setProblem, problem]
  );
  // 姓名模板
  const addName = useCallback(() => {
    let type:
      | "input"
      | "singleSelect"
      | "multiSelect"
      | "pullSelect"
      | "date"
      | "time"
      | "score" = "input";
    let arr = {
      id: uuidv4(),
      title: "请输入姓名",
      type,
      required: true,
      isNew: false,
    };
    setShow(problem.length + 1);
    setProblem([...problem, arr]);
  }, [setProblem, problem, setShow]);
  const addFormDate = useCallback(
    (star?: IStar) => {
      let type:
        | "input"
        | "singleSelect"
        | "multiSelect"
        | "pullSelect"
        | "date"
        | "time"
        | "score" = "date";
      let arr = {
        id: uuidv4(),
        title: star ? star.problem?.title! : "请选择日期",
        type,
        required: star ? star.problem?.required! : false,
        isNew: star ? star.problem?.isNew! : false,
      };
      setProblem([...problem, arr]);
    },
    [setProblem, problem]
  );
  const addFormTime = useCallback(
    (star?: IStar) => {
      let type:
        | "input"
        | "singleSelect"
        | "multiSelect"
        | "pullSelect"
        | "date"
        | "time"
        | "score" = "time";
      let arr = {
        id: uuidv4(),
        title: star ? star.problem?.title! : "请选择时间",
        type,
        required: star ? star.problem?.required! : false,
        isNew: star ? star.problem?.isNew! : false,
      };
      setProblem([...problem, arr]);
    },
    [setProblem, problem]
  );
  const addFormScore = useCallback(
    (star?: IStar) => {
      let type:
        | "input"
        | "singleSelect"
        | "multiSelect"
        | "pullSelect"
        | "date"
        | "time"
        | "score" = "score";
      let arr = {
        id: uuidv4(),
        title: star ? star.problem?.title! : "请打分",
        type,
        required: star ? star.problem?.required! : false,
        isNew: star ? star.problem?.isNew! : false,
      };
      setProblem([...problem, arr]);
    },
    [setProblem, problem]
  );
  const addFormSingleSelect = useCallback(
    (star?: IStar) => {
      let type:
        | "input"
        | "singleSelect"
        | "multiSelect"
        | "pullSelect"
        | "date"
        | "time"
        | "score" = "singleSelect";
      let status: 1 | 2 = 2;
      let arr = {
        id: uuidv4(),
        title: star ? star.problem?.title! : "请选择一个选项",
        type,
        required: star ? star.problem?.required! : false,
        isNew: star ? star.problem?.isNew! : false,
        setting: {
          options: [
            {
              title: "",
              status,
            },
            {
              title: "",
              status,
            },
          ],
        },
      };
      if (star) {
        arr.setting.options = [...star.problem?.setting?.options!];
      }
      setProblem([...problem, arr]);
    },
    [setProblem, problem]
  );
  const addSex = useCallback(() => {
    let type:
      | "input"
      | "singleSelect"
      | "multiSelect"
      | "pullSelect"
      | "date"
      | "time"
      | "score" = "singleSelect";
    let status: 1 | 2 = 2;
    let arr = {
      id: uuidv4(),
      title: "请选择性别",
      type,
      required: false,
      isNew: false,
      setting: {
        options: [
          {
            title: "男",
            status,
          },
          {
            title: "女",
            status,
          },
        ],
      },
    };
    setShow(problem.length + 1);
    setProblem([...problem, arr]);
  }, [setProblem, problem, setShow]);
  const addFormMultiSelect = useCallback(
    (star?: IStar) => {
      let type:
        | "input"
        | "singleSelect"
        | "multiSelect"
        | "pullSelect"
        | "date"
        | "time"
        | "score" = "multiSelect";
      let status: 1 | 2 = 2;
      let arr = {
        id: uuidv4(),
        title: star ? star.problem?.title! : "请选择一个或多个选项",
        type,
        required: star ? star.problem?.required! : false,
        isNew: star ? star.problem?.isNew! : false,
        setting: {
          options: [
            {
              title: "",
              status,
            },
            {
              title: "",
              status,
            },
          ],
        },
      };
      if (star) {
        arr.setting.options = [...star.problem?.setting?.options!];
      }
      setProblem([...problem, arr]);
    },
    [setProblem, problem]
  );
  const addFormPullSelect = useCallback(
    (star?: IStar) => {
      let type:
        | "input"
        | "singleSelect"
        | "multiSelect"
        | "pullSelect"
        | "date"
        | "time"
        | "score" = "pullSelect";
      let status: 1 | 2 = 2;
      let arr = {
        id: uuidv4(),
        title: star ? star.problem?.title! : "请选择一个选项",
        type,
        required: star ? star.problem?.required! : false,
        isNew: star ? star.problem?.isNew! : false,
        setting: {
          options: [
            {
              title: "",
              status,
            },
            {
              title: "",
              status,
            },
          ],
        },
      };
      if (star) {
        arr.setting.options = [...star.problem?.setting?.options!];
      }
      setProblem([...problem, arr]);
    },
    [setProblem, problem]
  );
  // 切换题型
  const getType = useCallback(
    (
      id: string,
      type:
        | "input"
        | "singleSelect"
        | "multiSelect"
        | "pullSelect"
        | "date"
        | "time"
        | "score"
    ) => {
      let res = problem.findIndex((item) => item.id === id);
      let arr;
      if (type === "input") {
        arr = {
          id: uuidv4(),
          title: "请输入内容",
          type,
          required: false,
          isNew: false,
        };
      } else if (type === "date") {
        arr = {
          id: uuidv4(),
          title: "请选择日期",
          type,
          required: false,
          isNew: false,
        };
      } else if (type === "time") {
        arr = {
          id: uuidv4(),
          title: "请选择时间",
          type,
          required: false,
          isNew: false,
        };
      } else if (type === "score") {
        arr = {
          id: uuidv4(),
          title: "请打分",
          type,
          required: false,
          isNew: false,
        };
      } else if (type === "singleSelect") {
        let status: 1 | 2 = 2;
        arr = {
          id: uuidv4(),
          title: "请选择一个选项",
          type,
          required: false,
          isNew: false,
          setting: {
            options: [
              {
                title: "",
                status,
              },
              {
                title: "",
                status,
              },
            ],
          },
        };
      } else if (type === "multiSelect") {
        let status: 1 | 2 = 2;
        arr = {
          id: uuidv4(),
          title: "请选择一个或多个选项",
          type,
          required: false,
          isNew: false,
          setting: {
            options: [
              {
                title: "",
                status,
              },
              {
                title: "",
                status,
              },
            ],
          },
        };
      } else if (type === "pullSelect") {
        let status: 1 | 2 = 2;
        arr = {
          id: uuidv4(),
          title: "请选择一个选项",
          type,
          required: false,
          isNew: false,
          setting: {
            options: [
              {
                title: "",
                status,
              },
              {
                title: "",
                status,
              },
            ],
          },
        };
      }
      if (arr) {
        problem.splice(res, 1, arr);
        setProblem([...problem]);
      }
    },
    [setProblem, problem]
  );
  // 通过id获取类型
  const getProblemById = useCallback(
    (id: string) => {
      let res = problem.find((item) => item.id === id)!;
      return res;
    },
    [problem]
  );
  // 复制
  const repeatProblem = useCallback(
    (id: string) => {
      let res = { ...problem.find((item) => item.id === id)! };
      res.id = uuidv4();
      problem.splice(problem.findIndex((item) => item.id === id)!, 0, res);
      setShow(problem.findIndex((item) => item.id === id)! + 1);
      setProblem([...problem]);
    },
    [setProblem, problem, setShow]
  );
  // 切换是否必填
  const changeRequired = useCallback(
    (id: string) => {
      let res = { ...problem.find((item) => item.id === id)! };
      res.required = !res.required;
      problem.splice(problem.findIndex((item) => item.id === id)!, 1, res);
      setProblem([...problem]);
    },
    [setProblem, problem]
  );
  // 删除
  const deleteProblem = useCallback(
    (id: string) => {
      problem.splice(problem.findIndex((item) => item.id === id)!, 1);
      setProblem([...problem]);
    },
    [setProblem,problem]
  );
  // 子项标题
  const changeProblemTitle = useCallback(
    (id: string, title: string) => {
      let res = { ...problem.find((item) => item.id === id)! };
      res.title = title;
      problem.splice(problem.findIndex((item) => item.id === id)!, 1, res);
      setProblem([...problem]);
    },
    [setProblem, problem]
  );
  // 是否允许重复
  const changeRepeat = useCallback(
    (id: string) => {
      let res = { ...problem.find((item) => item.id === id)! };
      res.isNew = !res.isNew;
      problem.splice(problem.findIndex((item) => item.id === id)!, 1, res);
      setProblem([...problem]);
    },
    [setProblem, problem]
  );
  // 删除选项
  const deleteOption = useCallback(
    (id: string, index: number) => {
      let res = problem.find((item) => item.id === id);
      if (res?.setting?.options.length === 1) {
        message.error("至少要包含一个选项");
        return;
      }
      res?.setting?.options.splice(index, 1);
      problem.splice(problem.findIndex((item) => item.id === id)!, 1, res!);
      setProblem([...problem]);
    },
    [setProblem, problem]
  );
  // 删除选项
  const addOption = useCallback(
    (id: string) => {
      let status: 1 | 2 = 2;
      let res = problem.find((item) => item.id === id);
      res?.setting?.options.push({
        title: "",
        status,
      });
      problem.splice(problem.findIndex((item) => item.id === id)!, 1, res!);
      setProblem([...problem]);
    },
    [setProblem, problem]
  );
  // 改变选项title
  const changeOptionTitle = useCallback(
    (id: string, index: number, title: string) => {
      let res = problem.find((item) => item.id === id);
      res!.setting!.options[index].title = title;
      problem.splice(problem.findIndex((item) => item.id === id)!, 1, res!);
      setProblem([...problem]);
    },
    [setProblem, problem]
  );
  // 添加至常用题
  const starProblem = useCallback(
    async (id: string) => {
      let star = problem.find((item) => item.id === id)!;
      if (star.title.length === 0) {
        message.warning("请将标题填写完整");
        return;
      }
      if (
        (star.type === "multiSelect" ||
          star.type === "singleSelect" ||
          star.type === "pullSelect") &&
        !star.setting!.options.every((item) => item.title.length > 0)
      ) {
        message.warning("请将选项的值填写完整");
        return;
      }
      try {
        let res = await api.collectProblem({
          problem: { ...star },
        });
        if (res.stat === "ok") {
          message.success("添加成功");
          let res = await api.getListStar();
          setListStar(res.data.items);
        } else {
          message.error(res.msg);
        }
      } catch (error) {}
    },
    [setListStar, problem]
  );
  // 添加常用至表单
  const addStarToForm = useCallback(
    (star: IStar) => {
      setShow(problem.length + 1);
      if (star.problem?.type === "input") {
        addFormInput(star);
      } else if (star.problem?.type === "date") {
        addFormDate(star);
      } else if (star.problem?.type === "time") {
        addFormTime(star);
      } else if (star.problem?.type === "score") {
        addFormScore(star);
      } else if (star.problem?.type === "singleSelect") {
        addFormSingleSelect(star);
      } else if (star.problem?.type === "multiSelect") {
        addFormMultiSelect(star);
      } else {
        addFormPullSelect(star);
      }
    },
    [
      addFormInput,
      addFormDate,
      addFormTime,
      addFormScore,
      addFormSingleSelect,
      addFormMultiSelect,
      addFormPullSelect,
      setShow,
      problem.length,
    ]
  );
  const getListStar = useCallback(async () => {
    let res = await api.getListStar();
    setListStar(res.data.items);
  }, [setListStar]);
  return {
    problem,
    listStar,
    show,
    setProblem,
    addFormInput,
    addFormDate,
    addFormTime,
    addFormScore,
    getType,
    getProblemById,
    repeatProblem,
    changeRequired,
    deleteProblem,
    changeProblemTitle,
    changeRepeat,
    addFormSingleSelect,
    deleteOption,
    addOption,
    changeOptionTitle,
    addFormMultiSelect,
    addFormPullSelect,
    starProblem,
    addStarToForm,
    getListStar,
    addName,
    addSex,
    setShow,
  };
}
