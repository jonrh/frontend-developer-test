import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import users from "../demoUsers";
import { User, UserID } from "../Types";
import UsersView from "./UserView";

interface ButtonProps {
  buttonText: string; // The text label on the button
  onPress: () => void; // The function that will be invoked once the button is pressed
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <TouchableOpacity style={s.button} onPress={props.onPress}>
      <Text style={s.buttonText}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

interface Props {}
interface State {
  // Use a Map of users to get rid of duplicate user objects. The Feeld API returns duplicates.
  // This should probably be taken care of in the FeeldAPI code but I handle it here to start with.

  // People the user has not yet decided on (reject/skip/approve)
  unDecidedUsers: Map<UserID, User>;

  // People the user has already rejected, skipped or approved.
  decidedUsers: Map<UserID, User>;
}

/**
 * A view that displays a person the user can indicate if they have an interest in or not. By
 * swiping left the user indicates they do not have an interest, by swiping right they would like
 * to proceed to potentially opening a dialog with that user. It's also possible to skip,
 * essentially hiding the user.
 */
class DecideUsers extends React.Component<Props, State> {
  state: State = {
    unDecidedUsers: new Map(),
    decidedUsers: new Map(),
  };

  componentDidMount(): void {}

  // getUsers = () => {
  //   get20Users()
  //     .then(users => {
  //       this.setState({
  //         users: users,
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  render() {
    const user1 = users[2];

    return (
      <View style={s.container}>
        <UsersView user={user1} />

        <View style={s.buttonGroup}>
          <Button buttonText={"👎"} onPress={() => console.log("reject")} />
          <Button buttonText={"skip"} onPress={() => console.log("skip")} />
          <Button buttonText={"👍"} onPress={() => console.log("accept")} />
        </View>
      </View>
    );
  }
}

const isDebug = false;

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,

    backgroundColor: isDebug ? "red" : null,
  },

  buttonGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: isDebug ? "green" : null,
  },

  button: {
    flex: 1,
    alignItems: "center",

    backgroundColor: isDebug ? "brown" : null,
  },

  buttonText: {
    fontSize: 40,
  },
});

export default DecideUsers;
