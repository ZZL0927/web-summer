import { CaretDownOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Checkbox, Popover, Select } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { FormEvent, useContext } from "react";
import { ReactComponent as IconDelete } from "../../assets/delete.svg";
import { questionsContext } from "../../hooks/store";
import useProblem from "../../hooks/useProblem";
import styles from "./index.module.scss";
interface ID {
  id: string;
}
const { Option } = Select;
const content1 = (
  <div>
    <p>设置所有题目为必填</p>
    <p>设置所有题目为非必填</p>
  </div>
);

export default function FooterActions(props: ID) {
  // 从自定义Hooks获取增删查改的逻辑
  const {
    getType,
    getProblemById,
    repeatProblem,
    changeRequired,
    deleteProblem,
    starProblem,
  } = useProblem();

  const content2 = (
    <div>
      <p
        className={styles.star}
        onClick={() => {
          starProblem(props.id);
        }}
      >
        将此题目设置为常用题
      </p>
    </div>
  );
  //  切换题型
  const handleChange = (
    value:
      | "input"
      | "singleSelect"
      | "multiSelect"
      | "pullSelect"
      | "date"
      | "time"
      | "score"
  ) => {
    getType(props.id, value);
  };
  const onChange = (e: CheckboxChangeEvent) => {
    changeRequired(props.id);
  };
  let { questions } = useContext(questionsContext);
  return (
    <div className={styles["footer-action"]}>
      <div className="change-question">
        <span>题型切换: </span>
        <Select
          defaultValue={getProblemById(props.id).type}
          onChange={handleChange}
          placement="bottomLeft"
        >
          {questions.map((item, index) => {
            return (
              <Option value={item.type} key={index}>
                {item.title}
              </Option>
            );
          })}
        </Select>
      </div>
      <div className={styles["right-actions"]}>
        <span
          className={styles.clone}
          onClick={(e: FormEvent) => {
            e.stopPropagation();
            repeatProblem(props.id);
          }}
        >
          复制
        </span>
        <span className={styles.split}></span>
        <Checkbox
          onChange={onChange}
          checked={getProblemById(props.id).required}
        >
          <span className={styles.tip}>必填</span>
        </Checkbox>
        <Popover trigger="click" content={content1} title="" placement="bottom">
          <CaretDownOutlined />
        </Popover>
        <span className={styles.split}></span>
        <IconDelete
          onClick={() => {
            deleteProblem(props.id);
          }}
        />
        <Popover trigger="click" content={content2} title="" placement="bottom">
          <EllipsisOutlined />
        </Popover>
      </div>
    </div>
  );
}
