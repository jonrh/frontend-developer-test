import React from "react";
import { View, StyleSheet, Animated, Dimensions, PanResponder } from "react-native";

import { User, UserID } from "../utilities/Types";
import { isDebug } from "../utilities/Constants";
import { get20Users, postUserDecision } from "../utilities/FeeldAPI";
import UsersView from "../components/UserView";

/** How many users we want to have ready locally before we request more users from the API */
const MIN_USER_POOL_SIZE = 3;

const SWIPE_DISTANCE = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SWIPE_DISTANCE / 3;

interface Props {}
interface State {
  // Keeps a record of what users we have decided on, so we don't present the same user again
  decidedUserIDs: UserID[];

  // An array of users we have not yet made a decision on. The current user to be decided on is the
  // first element in the array (userPool[0]). The next user is userPool[1] and so on. Once this
  // pool reaches the size defined by MIN_USER_POOL_SIZE we fetch more users
  userPool: User[];
}

class DecideUsers extends React.Component<Props, State> {
  state: State = {
    decidedUserIDs: [],
    userPool: [],
  };

  position = new Animated.Value(0);
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: this.position }]),
    onPanResponderRelease: (e, { dx, vx }) => {
      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        const direction = dx > 0 ? 1 : -1;
        const velocity = Math.max(2.5, Math.abs(vx)) * direction;
        Animated.decay(this.position, {
          velocity,
          deceleration: 0.985,
          useNativeDriver: true,
        }).start(this.moveToNext);
      } else {
        Animated.spring(this.position, {
          toValue: 0,
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
    },
  });

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

  nopePressed = () => {
    Animated.spring(this.position, {
      friction: 11,
      tension: 60,
      toValue: -SWIPE_DISTANCE,
      useNativeDriver: true,
    }).start(this.moveToNext);
  };

  yepPressed = () => {
    Animated.spring(this.position, {
      friction: 11,
      tension: 60,
      toValue: SWIPE_DISTANCE,
      useNativeDriver: true,
    }).start(this.moveToNext);
  };

  moveToNext = ({ finished }) => {
    // Don't do anything if the animation hasn't finished
    if (!finished) return;

    this.removeCurrentUserFromPool();
  };

  resetPosition = () => {
    this.position.setValue(0);
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
    this.setState(previousState => {
      // The user we just took a decision on
      const decidedUserID: UserID = previousState.userPool[0].id;

      return {
        // Add the ID of the decided user to the list of IDs that have been decided
        decidedUserIDs: [...previousState.decidedUserIDs, decidedUserID],

        // Remove the user from the pool. Note that this has the beneficial side effect to remove
        // duplicate objects of the same user. The Feeld API some times returns the same user
        // multiple times in the response of 20 users. This means we avoid displaying the same user
        // again for a decision.
        userPool: previousState.userPool.filter(user => user.id !== decidedUserID),
      };
    }, this.resetPosition);

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
    const nextUser = this.getNextUser();

    // IDs of the current and next user, fall back to default values if not loaded yet
    // Used to distinguish/separate animated views
    const currentUserID = (currentUser && currentUser.id) || 0;
    const nextUserID = (nextUser && nextUser.id) || 1;

    const translateX = this.position;

    const rotate = Animated.divide(this.position, SWIPE_DISTANCE).interpolate({
      inputRange: [-1, +1],
      outputRange: ["-30deg", "30deg"],
      extrapolate: "clamp",
    });

    const animatedStyle = {
      transform: [{ translateX }, { rotate }],
    };

    const nextScale = Animated.divide(this.position, SWIPE_DISTANCE).interpolate({
      inputRange: [-1, -0.2, 0.2, 1],
      outputRange: [1, 0.75, 0.75, 1],
      extrapolate: "clamp",
    });

    const nextCardStyle = {
      transform: [{ scale: nextScale }],
    };

    return (
      <View style={s.container}>
        {/* The next user ready waiting underneath */}
        <Animated.View key={nextUserID} style={[s.card, nextCardStyle]}>
          <UsersView user={nextUser} />
        </Animated.View>

        {/* The current user in view */}
        <Animated.View
          key={currentUserID}
          style={[s.card, animatedStyle]}
          {...this.panResponder.panHandlers}
        >
          <UsersView user={currentUser} />
        </Animated.View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    backgroundColor: isDebug ? "red" : null,
  },

  card: {
    position: "absolute",
  },
});

export default DecideUsers;
