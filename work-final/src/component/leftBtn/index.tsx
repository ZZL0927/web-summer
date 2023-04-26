import React, { FormEvent } from "react";
import { Button } from "antd";
import { ReactComponent as IconTiankong } from "../../assets/btnIcon/tiankong.svg";
import { ReactComponent as IconDanxuan } from "../../assets/btnIcon/danxuan.svg";
import { ReactComponent as IconDuoxuan } from "../../assets/btnIcon/duoxuan.svg";
import { ReactComponent as IconXiala } from "../../assets/btnIcon/xiala.svg";
import { ReactComponent as IconFenshu } from "../../assets/btnIcon/fenshu.svg";
import { ReactComponent as IconRiqi } from "../../assets/btnIcon/riqi.svg";
import { ReactComponent as IconShijian } from "../../assets/btnIcon/shijian.svg";
import useProblem from "../../hooks/useProblem";

const IconList = [
  <IconTiankong />,
  <IconDanxuan />,
  <IconDuoxuan />,
  <IconXiala />,
  <IconFenshu />,
  <IconRiqi />,
  <IconShijian />,
];
export default function LeftBtn(props: {
  btns: {
    title: string;
    type: string;
  }[];
}) {
  let {
    problem,
    setShow,
    addFormInput,
    addFormDate,
    addFormTime,
    addFormScore,
    addFormSingleSelect,
    addFormMultiSelect,
    addFormPullSelect,
  } = useProblem();
  return (
    <>
      {props.btns.map(
        (
          item: {
            title: string;
            type: string;
          },
          index: number
        ) => {
          return (
            <Button
              key={index}
              onClick={(e: FormEvent) => {
                e.stopPropagation();
                setShow(problem.length + 1);
                if (item.type === "input") {
                  addFormInput();
                } else if (item.type === "date") {
                  return addFormDate();
                } else if (item.type === "time") {
                  return addFormTime();
                } else if (item.type === "score") {
                  return addFormScore();
                } else if (item.type === "singleSelect") {
                  return addFormSingleSelect();
                } else if (item.type === "multiSelect") {
                  return addFormMultiSelect();
                } else if (item.type === "pullSelect") {
                  return addFormPullSelect();
                }
              }}
            >
              {IconList[index]}
              {item.title}
            </Button>
          );
        }
      )}
    </>
  );
}
