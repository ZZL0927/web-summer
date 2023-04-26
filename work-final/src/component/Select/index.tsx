import React, { FormEvent } from "react";
import { ReactComponent as IconCircle } from "../../assets/circle.svg";
import { ReactComponent as IconCha } from "../../assets/cha.svg";
import { ReactComponent as IconAdd } from "../../assets/add.svg";
import styles from "./index.module.scss";
import { IProps } from "../../types";
import FooterActions from "../FooterActions";
import useProblem from "../../hooks/useProblem";
import { message } from "antd";
export default function SingleSelect(props: IProps) {
  const {
    show,
    setShow,
    changeProblemTitle,
    getProblemById,
    deleteOption,
    addOption,
    changeOptionTitle,
  } = useProblem();
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
        <div className={styles["select-option"]}>
          {getProblemById(props.id).setting?.options.map((item, index) => {
            return (
              <div className={styles.option} key={index}>
                <IconCircle />
                <input
                  type="text"
                  placeholder={"选项" + (index + 1)}
                  value={item.title}
                  onChange={(e: FormEvent) => {
                    if (
                      (e.target as HTMLInputElement).value.trim().length >= 200
                    ) {
                      message.info("最多输入200个字");
                      return;
                    }
                    changeOptionTitle(
                      props.id,
                      index,
                      (e.target as HTMLInputElement).value.trim()
                    );
                  }}
                />
                <IconCha
                  className={styles.delete}
                  onClick={() => {
                    deleteOption(props.id, index);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div
          className={styles["add-option"]}
          onClick={() => {
            addOption(props.id);
          }}
        >
          <IconAdd />
          <span>选项</span>
        </div>
      </div>
      {show === props.index && <FooterActions id={props.id}></FooterActions>}
    </div>
  );
}
