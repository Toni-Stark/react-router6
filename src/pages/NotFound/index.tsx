import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.scss";
interface Props {}

export function NotFound(props: Partial<Props>): React.ReactElement {
  const navigator = useNavigate();
  const history = useLocation();

  useEffect(() => {
    navigator("/home");
  }, []);

  return <div className="not-found"></div>;
}
