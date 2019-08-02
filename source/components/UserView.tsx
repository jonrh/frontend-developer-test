import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

import { User, UserPhoto } from "../Types";

interface PhotoProps {
  photo: UserPhoto;
}

/** Displays a plain view of a user's photo */
const Photo: React.FC<PhotoProps> = props => {
  return <Image style={styles.image} source={{ uri: props.photo.url }} />;
};

interface UserViewProps {
  user?: User;
}

/** Displays a user profile. Name, age, gender, sexuality and an image for example. */
const UsersView: React.FC<UserViewProps> = props => {
  // A temporary fix for when the `user` prop is empty. This has the drawback of returning an empty
  // view. This results in the layout jumping around once a user has been loaded. To be fixed later.
  if (!props.user) return null;

  const { name, age, gender, sexuality, about, desires, interests } = props.user.info;
  const { photos } = props.user;

  // If desires or interests arrays are defined display it. Otherwise don't show anything.
  const desiresView = desires ? <Text>{`Desires: ${desires.join(", ")}`}</Text> : null;
  const interestView = interests ? <Text>{`Interets: ${interests.join(", ")}`}</Text> : null;

  // Display all of the user's images one after another if they exist.
  const images = photos ? photos.map((photo, i) => <Photo photo={photo} key={i} />) : null;

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: 600 }}>{images}</ScrollView>
      <Text style={styles.name}>{name}</Text>
      <Text>{`${age}y ${gender}, ${sexuality}`}</Text>
      <Text>{`About: ${about}`}</Text>
      {desiresView}
      {interestView}
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

  image: {
    height: 500,
    width: null,
  },
});

export default UsersView;
