import React, { FormEvent } from "react";
import styles from "./index.module.scss";
import { Checkbox, message, Popover } from "antd";
import { ReactComponent as Tip } from "../../assets/tip.svg";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import FooterActions from "../FooterActions";
import { IProps } from "../../types";
import useProblem from "../../hooks/useProblem";

const content = <div>勾选后，不允许填写者提交和已有数据重复的内容</div>;
export default function Input(props: IProps) {
  const { show, setShow, changeProblemTitle, getProblemById, changeRepeat } =
    useProblem();
  const onChange = (e: CheckboxChangeEvent) => {
    changeRepeat(props.id);
  };
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
      <div className={styles.answer}>填写者回答区</div>
      {show === props.index && (
        <>
          <div className={styles.isRepeat}>
            <Checkbox
              onChange={onChange}
              checked={getProblemById(props.id).isNew}
            >
              <span className={styles.tip}>不允许重复</span>
            </Checkbox>
            <Popover content={content} title="" placement="bottom">
              <Tip />
            </Popover>
          </div>
          <FooterActions id={props.id}></FooterActions>
        </>
      )}
    </div>
  );
}
