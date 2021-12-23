import React from "react";
import { useParams } from "react-router";

export function Userinfo(): React.ReactElement {
  const params = useParams();
  let userId = params?.userId && params.userId.match(/\d+/);
  if (!userId) {
    return <NotFound />;
  }
  return <Info userId={params.userId} />;
}

export function NotFound(): React.ReactElement {
  return <div>未找到用户信息</div>;
}

interface InfoProps {
  userId: string;
}
export function Info(props: Partial<InfoProps>): React.ReactElement {
  return <div>用户信息{props.userId}</div>;
}
