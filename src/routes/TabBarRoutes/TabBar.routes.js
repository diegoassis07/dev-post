import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../screens/Home";
import Search from "../../screens/Search";
import Profile from "../../screens/Profile";
import NewPost from "../../screens/NewPost";
import PostsUser from "../../screens/PostsUser";

import Feather from "@expo/vector-icons/Feather";

const TabBar = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{
          title: "Novo Post",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#36393F",
          },
        }}
      />
      <Stack.Screen
        name="PostsUser"
        component={PostsUser}
        options={{
          headerTintColor: "#FFF",
          headerStyle: { backgroundColor: "#36393F" },
        }}
      />
    </Stack.Navigator>
  );
}

export const TabBarRoutes = () => {
  return (
    <TabBar.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",

        tabBarStyle: {
          backgroundColor: "#202225",
          borderTopWidth: 0,
        },
      }}
    >
      <TabBar.Screen
        name="HomeTab"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" size={size} color={color} />;
          },
        }}
      />
      <TabBar.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="search" size={size} color={color} />;
          },
        }}
      />
      <TabBar.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" size={size} color={color} />;
          },
        }}
      />
    </TabBar.Navigator>
  );
};
