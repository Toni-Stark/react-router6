import React from "react";
import styles from "./index.module.scss";

interface Props {
  onChange: (e: any) => void;
}

export const InputForm = (props: Props): React.ReactElement => {
  return (
    <input className={styles.input} type="text" onChange={props.onChange}/>
  );
};
