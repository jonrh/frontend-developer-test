import React from "react";

import DecideUsers from "./components/DecideUsers";
import ListOfUsers from "./components/ListOfUsers";
import { SafeAreaView } from "react-native";
import SwipeTester from "./components/SwipeTester";
import SwipeTester2 from "./components/SwipeTester2";

/** Initial version of app navigation. For now just a simple redirect. */
const Main: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*<ListOfUsers />*/}
      <DecideUsers />
      {/*<SwipeTester />*/}
      {/*<SwipeTester2 />*/}
    </SafeAreaView>
  );
};

export default Main;
