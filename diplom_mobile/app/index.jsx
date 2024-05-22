import { Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user_context";

export default () => {
  const [logged, setLogged] = useState(false);
  const usCtx = useContext(UserContext);
  useEffect(() => {
    // usCtx.authorize();
  }, []);

  return (
    <>
      <Redirect replace href="/user" />
    </>
  );
};
