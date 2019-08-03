import React from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";

import { User, UserPhoto } from "../utilities/Types";
import { isDebug } from "../utilities/Constants";
import UserPhotos from "./UserPhotos";

/** "Title: content" text label with the title in bold text. Returns null if content is empty. */
const Description: React.FC<{ labelTitle: string; labelContent?: string }> = props => {
  // Don't display an empty label if the content is null/undefined or the empty string
  if (!props.labelContent || props.labelContent.length === 0) return null;

  return (
    <Text>
      <Text style={s.bold}>{props.labelTitle}</Text>: {props.labelContent}
    </Text>
  );
};

interface UserViewProps {
  user?: User;
}

/** Displays a user profile. Photo/s, name, age, gender, sexuality, about, desires, interests. */
const UsersView2: React.FC<UserViewProps> = props => {
  // A temporary fix for when the `user` prop is empty. This has the drawback of returning an empty
  // view. This results in the layout jumping around once a user has been loaded. To be fixed later.
  if (!props.user) return null;

  const { name, age, gender, sexuality, about, desires, interests } = props.user.info;
  const { associated } = props.user;

  let userName = name;
  let userAgeGenderSexuality = `${age}y ${sexuality} ${gender}`;

  // If there is an associated user (couple), append to the name and info labels
  if (associated) {
    userName += ` & ${associated.name}`;
    userAgeGenderSexuality += `, ${associated.age}y ${associated.sexuality} ${associated.gender}`;
  }

  return (
    <View style={s.container}>
      <UserPhotos photos={props.user.photos} />

      <View style={s.aboutContainer}>
        <Text style={s.name}>{userName}</Text>
        <Text>{userAgeGenderSexuality}</Text>

        <View style={s.moreInfo}>
          <Description labelTitle="About" labelContent={about} />
          <Description labelTitle="Desires" labelContent={desires && desires.join(", ")} />
          <Description labelTitle="Interests" labelContent={interests && interests.join(", ")} />
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },

  aboutContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  moreInfo: {
    marginTop: 20,
  },

  bold: {
    fontWeight: "bold",
  },

  name: {
    fontSize: 23,
    fontWeight: "300",
  },

  image: {
    height: Dimensions.get("window").height * 0.61,
    width: null,

    backgroundColor: isDebug ? "blue" : null,
  },

  imageSwiper: {
    backgroundColor: isDebug ? "orange" : null,
  },
});

export default UsersView2;
