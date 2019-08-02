import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { SimpleLineIcons } from "@expo/vector-icons";

import Info from "./screens/Info";
import DecideUsers from "./screens/DecideUsers";
import ListOfUsers from "./components/ListOfUsers";
import { SafeAreaView } from "react-native";
import SwipeTester from "./components/SwipeTester";
import SwipeTester2 from "./components/SwipeTester2";
import { THEME_COLOUR_PURPLE } from "./utilities/Constants";

function ListOfUsersScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ListOfUsers />
    </SafeAreaView>
  );
}

function DecideUsersScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DecideUsers />
    </SafeAreaView>
  );
}

function ChatScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>This screen will show matches and other open chats</Text>
      <SimpleLineIcons name="bubble" size={32} color="black" />
      <SimpleLineIcons name="heart" size={32} color="black" />
      <SimpleLineIcons name="exclamation" size={32} color="black" />
    </SafeAreaView>
  );
}

const TabNavigator = createBottomTabNavigator(
  {
    Chat: ChatScreen,
    Decide: DecideUsersScreen,
    Info: Info,

    // Debug screens
    // List: ListOfUsersScreen,
    // Swipe1: SwipeTester,
    // Swipe2: SwipeTester2,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;

        // Give the appropriate tab bar icon to each screen
        if (routeName === "Chat") {
          return <SimpleLineIcons name="bubble" size={32} color={tintColor} />;
        } else if (routeName === "Decide") {
          return <SimpleLineIcons name="heart" size={32} color={tintColor} />;
        } else if (routeName === "Info") {
          return <SimpleLineIcons name="info" size={32} color={tintColor} />;
        } else {
          // As a placeholder while I develop, show some icon for dev screens
          return <SimpleLineIcons name="emotsmile" size={32} color={tintColor} />;

          // Before I finish we should return null here, uncomment when I'm done testing
          // return null;
        }
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: THEME_COLOUR_PURPLE,
      inactiveTintColor: "gray",
    },
  }
);

export default createAppContainer(TabNavigator);
