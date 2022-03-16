import React, {DOMAttributes} from "react";
import styles from "./index.module.scss";
interface Props extends DOMAttributes<any>{
  name: string|number;
}

export const FormLabel = (props: Props): React.ReactElement => {

  return (
    <div className={styles.formLabel}>
      <div className={styles.formTitle}>{props?.name} :</div>
      {props.children}
    </div>
  );
};
