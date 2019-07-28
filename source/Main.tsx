import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

import { User } from "./Types";
import { get20Users, getLocalUsers } from "./FeeldAPI";
import UserView from "./UserView";

interface Props {}
interface State {
  users: User[];
  errorMessage: string;
}

class Main extends React.Component<State, Props> {
  state: State = {
    users: [],
    errorMessage: "",
  };

  getUsers = () => {
    // get20Users()
    //   .then(users => {
    //     this.setState({
    //       users: users,
    //       errorMessage: "",
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({
    //       errorMessage: `Error: ${error}`,
    //     });
    //   });

    getLocalUsers()
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
        <Text style={styles.title}>Akur</Text>

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

const isDebug = false;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: isDebug ? "red" : "white",
  },

  title: {
    fontSize: 35,

    backgroundColor: isDebug ? "brown" : null,
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
