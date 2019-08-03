import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { createBottomTabNavigator, createAppContainer, BottomTabBar } from "react-navigation";
import { SimpleLineIcons } from "@expo/vector-icons";

import { THEME_COLOUR_PURPLE } from "./utilities/Constants";
import Info from "./screens/Info";
import DecideUsers from "./screens/DecideUsers";
// import ListOfUsers from "./graveyard/ListOfUsers";
// import SwipeTester from "./graveyard/SwipeTester";
// import SwipeTester2 from "./graveyard/SwipeTester2";
// import SwipeTester3 from "./graveyard/SwipeTester3";
// import DecideUsersOld from "./graveyard/DecideUsersOld";

const TabNavigator = createBottomTabNavigator(
  {
    Decide: DecideUsers,
    // DecideOld: DecideUsersOld, // The original voting without swiping & animations
    Info: Info,

    // Debug screens
    // Swipe3: SwipeTester3,
    // Swipe2: SwipeTester2,
    // List: ListOfUsers,
    // Swipe1: SwipeTester,
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
          // When all else fails, at least give the world a smiley icon : )
          return <SimpleLineIcons name="emotsmile" size={32} color={tintColor} />;
        }
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: THEME_COLOUR_PURPLE,
      inactiveTintColor: "gray",
    },
    tabBarComponent: props => <BottomTabBar {...props} style={s.tabBar} />,
  }
);

const s = StyleSheet.create({
  tabBar: {
    // Hide the line on top of the bottom tab bar
    borderTopColor: "rgba(0, 0, 0, 0)",
  },
});

export default createAppContainer(TabNavigator);
