import React, { FormEvent, useState } from "react";
import FooterActions from "../FooterActions";
import styles from "./index.module.scss";
import { IProps } from "../../types";
import { message, Select } from "antd";
import useProblem from "../../hooks/useProblem";
const { Option } = Select;
export default function Time(props: IProps) {
  const { show, setShow, changeProblemTitle, getProblemById } = useProblem();
  const handleChange = (value: string) => {
    if (value === "hm") {
      setAnswer("hm");
    } else {
      setAnswer("hms");
    }
  };
  const [answer, setAnswer] = useState("hm");
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
        {answer === "hm" && <span>时-分</span>}
        {answer === "hms" && <span>时-分-秒</span>}
      </div>
      {show === props.index && (
        <>
          <div className="time">
            <span>日期格式：</span>
            <Select
              defaultValue="hm"
              onChange={handleChange}
              placement="bottomLeft"
            >
              <Option value={"hm"} key={"hm"}>
                {"时刻：时-分(24小时制)"}
              </Option>
              <Option value={"hms"} key={"hms"}>
                {"时长：时-分-秒"}
              </Option>
            </Select>
          </div>
          <FooterActions id={props.id}></FooterActions>
        </>
      )}
    </div>
  );
}
