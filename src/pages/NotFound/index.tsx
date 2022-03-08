import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
interface Props {}

export function NotFound(props: Partial<Props>): React.ReactElement {
  const navigator = useNavigate();

  useEffect(() => {
    navigator("/home");
  }, []);

  return <div className={styles.notFound} />;
}
