import { Stack } from "expo-router";
import { Fragment } from "react";
import { UserWrapper } from "../../context/user_context";

export default () => {
  return (
    <Fragment>
      <UserWrapper>
        <Stack screenOptions={{ headerShown: false }} />
      </UserWrapper>
    </Fragment>
  );
};
