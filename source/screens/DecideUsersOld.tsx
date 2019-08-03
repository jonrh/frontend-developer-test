import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { User, UserID } from "../utilities/Types";
import { isDebug } from "../utilities/Constants";
import { get20Users, postUserDecision } from "../utilities/FeeldAPI";
import UsersViewOld from "../components/UserViewOld";

/** How many users we want to have ready locally before we request more users from the API */
const MIN_USER_POOL_SIZE = 3;

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
  // Keeps a record of what users we have decided on, so we don't present the same user again
  decidedUserIDs: UserID[];

  // An array of users we have not yet made a decision on. The current user to be decided on is the
  // first element in the array (userPool[0]). The next user is userPool[1] and so on. Once this
  // pool reaches the size defined by MIN_USER_POOL_SIZE we fetch more users
  userPool: User[];
}

/**
 * A view that displays a person the user can indicate if they have an interest in or not. By
 * swiping left the user indicates they do not have an interest, by swiping right they would like
 * to proceed to potentially opening a dialog with that user. It's also possible to skip,
 * essentially hiding the user.
 */
class DecideUsersOld extends React.Component<Props, State> {
  state: State = {
    decidedUserIDs: [],
    userPool: [],
  };

  componentDidMount(): void {
    this.getUsers();
  }

  getUsers = () => {
    get20Users()
      .then(users => {
        this.setState(state => {
          // Filter out users we have already made a decision on before
          const additionalUsers =
            users && users.filter(user => !state.decidedUserIDs.includes(user.id));

          return {
            // Add new users to the pool to be decided upon
            userPool: [...state.userPool, ...additionalUsers],
          };
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  /** The user that is currently being decided on (reject/skip/approve) */
  getCurrentUser = () => {
    return this.state.userPool[0];
  };

  /** The user that will be decided on after the current user. */
  getNextUser = () => {
    return this.state.userPool[1];
  };

  removeCurrentUserFromPool = () => {
    this.setState(state => {
      const decidedUserID: UserID = state.userPool[0].id; // The user we just took a decision on

      return {
        // Add the ID of the decided user to the list of IDs that have been decided
        decidedUserIDs: [...state.decidedUserIDs, decidedUserID],

        // Remove the user from the pool. Note that this has the beneficial side effect to remove
        // duplicate objects of the same user. The Feeld API some times returns the same user
        // multiple times in the response of 20 users. This means we avoid displaying the same user
        // again for a decision.
        userPool: state.userPool.filter(user => user.id !== decidedUserID),
      };
    });

    if (this.state.userPool.length <= MIN_USER_POOL_SIZE) {
      this.getUsers();
    }
  };

  /** Reject the current user, indicating there is not an interest in opening a dialog. */
  reject = () => {
    const currentUser = this.state.userPool[0];
    console.log(`reject: ${currentUser.id}`);

    postUserDecision({ decision: "reject", user: currentUser });
    this.removeCurrentUserFromPool();
  };

  /** Don't take a decision on the current user, defer the decision to a later date. */
  skip = () => {
    console.log(`skip: ${this.state.userPool[0].id}`);

    this.removeCurrentUserFromPool();
  };

  /** Approve the current user, indicating an interest to take things further with a chat. */
  approve = () => {
    console.log(`approve: ${this.state.userPool[0].id}`);

    this.removeCurrentUserFromPool();
  };

  render() {
    // The user that is currently being decided on (reject/skip/approve)
    const currentUser = this.getCurrentUser();

    const AllCaughtUp = (
      <View>
        <Text>All caught up 🎉</Text>
        <Text>Please check back later</Text>
      </View>
    );

    return (
      <View style={s.container}>
        <UsersViewOld user={currentUser} />

        {this.state.userPool.length === 0 ? AllCaughtUp : null}

        <View style={s.buttonGroup}>
          <Button buttonText={"👎"} onPress={this.reject} />
          <Button buttonText={"skip"} onPress={this.skip} />
          <Button buttonText={"👍"} onPress={this.approve} />
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,

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

export default DecideUsersOld;
