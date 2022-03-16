import React, {useState} from "react";
import styles from "./index.module.scss";
import {FormLabel} from "../FormLabel";
import {InputForm} from "../InputForm";
interface Props {}

export const CrossCutting = (props: Partial<Props>): React.ReactElement => {
  const [text, setText] = useState("");

  return (
    <div className={styles.crossCutting}>
      <FormLabel name={"cross"}>
        <InputForm onChange={(e) => setText(e.target.value)} />
        <div className={styles.crossText}>{text}</div>
      </FormLabel>
    </div>
  );
};
