import React, { FormEvent, useState } from "react";
import FooterActions from "../FooterActions";
import styles from "./index.module.scss";
import { IProps } from "../../types";
import { message, Select } from "antd";
import useProblem from "../../hooks/useProblem";
const { Option } = Select;
export default function Date(props: IProps) {
  const { show, setShow, changeProblemTitle, getProblemById } = useProblem();
  // 更改日期格式
  const handleChange = (value: string) => {
    if (value === "ym") {
      setAnswer("ym");
    } else if (value === "ymd") {
      setAnswer("ymd");
    } else {
      setAnswer("ymdm");
    }
  };
  const [answer, setAnswer] = useState(" 年 月");
  return (
    <div
      className={show === props.index ? styles.input : styles.normal}
      onClick={(e: FormEvent) => {
        e.stopPropagation();
        setShow(props.index);
      }}
    >
      <div className={styles.title}>
        <span>{props.index}. </span>
        <input
          type="text"
          value={getProblemById(props.id).title}
          onChange={(e: FormEvent) => {
            if ((e.target as HTMLInputElement).value.trim().length >= 500) {
              message.info("最多输入500个字");
              return;
            }
            changeProblemTitle(
              props.id,
              (e.target as HTMLInputElement).value.trim()
            );
          }}
        />
      </div>
      <div className={styles.answer}>
        <span>年</span>
        <span>月</span>
        {(answer === "ymd" || answer === "ymdm") && <span>日</span>}
        {answer === "ymdm" && <span>分</span>}
      </div>
      {show === props.index && (
        <>
          <div className="time">
            <span>日期格式：</span>
            <Select
              defaultValue="ym"
              onChange={handleChange}
              placement="bottomLeft"
            >
              <Option value={"ym"} key={"ym"}>
                {"年-月"}
              </Option>
              <Option value={"ymd"} key={"ymd"}>
                {"年-月-日"}
              </Option>
              <Option value={"ymdm"} key={"ymdm"}>
                {"年-月-日-分"}
              </Option>
            </Select>
          </div>
          <FooterActions id={props.id}></FooterActions>
        </>
      )}
    </div>
  );
}
