import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

import { User } from "../utilities/Types";
import { get20Users } from "../utilities/FeeldAPI";
import UserView from "../components/UserView";
import { isDebug } from "../utilities/Constants";

interface Props {}
interface State {
  users: User[];
  errorMessage: string;
}

/**
 * A throwaway component I created to help me wrap my head around what sort of data I was working
 * with. It is not used in the app.
 **/
class Main extends React.Component<Props, State> {
  state: State = {
    users: [],
    errorMessage: "",
  };

  getUsers = () => {
    get20Users()
      .then(users => {
        this.setState({
          users: users,
          errorMessage: "",
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: `Error: ${error}`,
        });
      });
  };

  componentDidMount(): void {
    this.getUsers();
  }

  render() {
    const { users, errorMessage } = this.state;

    const error = <Text>{errorMessage}</Text>;
    let usersComponent = null;

    // If we have users populate the the users component
    if (users.length > 0) {
      usersComponent = users.map((user, index) => <UserView user={user} key={index} />);
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollview} contentContainerStyle={styles.scrollViewContent}>
          {usersComponent}
        </ScrollView>

        <Button title="Get New users" color="black" onPress={this.getUsers} />

        {/* Display the error if it occurred */}
        {errorMessage ? error : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: isDebug ? "red" : "white",
  },

  scrollview: {
    width: "100%",

    backgroundColor: isDebug ? "pink" : null,
  },

  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default Main;
