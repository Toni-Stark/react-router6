import React, { useCallback, useState } from "react";

export const Login: React.FC = () => {
  const [screen, setScreen] = useState(0);

  const increasing = useCallback(() => {
    setScreen(screen + 1);
  }, [screen]);

  return <div onClick={increasing}>{screen}</div>;
};
