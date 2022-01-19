import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
interface Props {}

export function NotFound(props: Partial<Props>): React.ReactElement {
  const navigator = useNavigate();

  useEffect(() => {
    navigator("/home");
  }, []);

  return <div className="not-found"></div>;
}
