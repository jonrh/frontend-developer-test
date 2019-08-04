import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface Props {}

/** Displays a fullscreen notice that there are no more users to decide on. */
const AllCaughtUp: React.FC<Props> = props => {
  return (
    <View style={s.container}>
      <Text style={s.header}>All caught up 🎉</Text>
      <Text style={s.text}>
        The Feeld API only provides 100 unique user per day. To use the app again please restart.
      </Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 40,
    fontWeight: "200",
  },

  text: {
    margin: 20,
    textAlign: "center",
  },
});

export default AllCaughtUp;
