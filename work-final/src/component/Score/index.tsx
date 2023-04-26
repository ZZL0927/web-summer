import React, { FormEvent } from "react";
import styles from "./index.module.scss";
import { IProps } from "../../types";
import FooterActions from "../FooterActions";
import { ReactComponent as IconStarFull } from "../../assets/starFull.svg";
import useProblem from "../../hooks/useProblem";
import { message } from "antd";
export default function Score(props: IProps) {
  const { show, setShow, changeProblemTitle, getProblemById } = useProblem();
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
        <IconStarFull />
        <IconStarFull />
        <IconStarFull />
        <IconStarFull />
        <IconStarFull />
      </div>
      {show === props.index && (
        <>
          <FooterActions id={props.id}></FooterActions>
        </>
      )}
    </div>
  );
}
