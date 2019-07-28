import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { User } from "./Types";

interface Props {
  user: User;
}

/** A component that displays a user profile */
const UsersView: React.FC<Props> = props => {
  const { user } = props;
  const { name, age, gender, sexuality, about, desires, interests } = user.info;

  // If desires or interests arrays are defined display it. Otherwise don't show anything.
  const desiresView = desires ? <Text>{`Desires: ${desires.join(", ")}`}</Text> : null;
  const interetsView = interests ? <Text>{`Interets: ${interests.join(", ")}`}</Text> : null;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text>{`${age}y ${gender}, ${sexuality}`}</Text>
      <Text>{`About: ${about}`}</Text>
      {desiresView}
      {interetsView}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  name: {
    fontSize: 25,
  },
});

export default UsersView;
