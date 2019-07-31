import React from "react";

import DecideUsers from "./components/DecideUsers";
import ListOfUsers from "./components/ListOfUsers";

/** Initial version of app navigation. For now just a simple redirect. */
const Main: React.FC = () => {
  // return <ListOfUsers />;
  return <DecideUsers />;
};

export default Main;
