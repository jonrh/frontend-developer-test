import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { get20Users } from "./FeeldAPI";

interface User {
  id: string; // Example: "55be3c8fc964860700ebf515"
  info: UserInfo;

  // If the user forms a part of a couple this will be populated with the other User's ID
  associated?: string;
  photos: UserPhoto;
}

interface UserInfo {
  age: number; // 20
  type: string; // "single"
  gender: string; // "male"
  sexuality: string; // "straight"
  name: string; // John
  about?: string; // A short text about the user. Example: "Tell us about you"
  desires?: string[];
  interests?: string[];
}

interface UserPhoto {
  url: string;
  width: number;
  height: number;
}

interface Props {}
interface State {
  users: any;
  errorMessage: string;
}

class Main extends React.Component<State, Props> {
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
      usersComponent = users.map((user, index) => {
        return <Text key={index}>{`${user.info.age} ${user.info.name}`}</Text>;
      });
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

const isDebug = true;

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
