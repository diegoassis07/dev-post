import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./src/routes/auth";
import { AuthProvider } from "./src/contexts/auth";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          translucent={false}
          backgroundColor="#36393F"
        />
        <AuthRoutes />
      </AuthProvider>
    </NavigationContainer>
  );
}
