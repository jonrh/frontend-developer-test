import React from "react";

import DecideUsers from "./components/DecideUsers";
import ListOfUsers from "./components/ListOfUsers";
import { SafeAreaView } from "react-native";

/** Initial version of app navigation. For now just a simple redirect. */
const Main: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*<ListOfUsers />*/}
      <DecideUsers />
    </SafeAreaView>
  );
};

export default Main;
