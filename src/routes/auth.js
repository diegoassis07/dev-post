import * as Native from "react-native";
import { StackRoutes } from "./Stack/Stack.routes";
import { TabBarRoutes } from "./TabBarRoutes/TabBar.routes";
import { useGlobal } from "../contexts/auth";

export const AuthRoutes = () => {
  const { hasUser, loading } = useGlobal();

  if (loading) {
    return (
      <Native.View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "#36393F",
        }}
      >
        <Native.ActivityIndicator size={"large"} color="#E52246" />
      </Native.View>
    );
  }

  return <>{hasUser ? <TabBarRoutes /> : <StackRoutes />}</>;
};
