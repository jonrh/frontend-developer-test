import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import { User, UserPhoto } from "./Types";

interface PhotoProps {
  photo: UserPhoto;
}

/** Displays a plain view of a user's photo */
const Photo: React.FC<PhotoProps> = props => {
  return <Image style={styles.image} source={{ uri: props.photo.url }} />;
};

interface UserViewProps {
  user: User;
}

/** Displays a user profile. Name, age, gender, sexuality and an image for example. */
const UsersView: React.FC<UserViewProps> = props => {
  const { name, age, gender, sexuality, about, desires, interests } = props.user.info;
  const { photos } = props.user;

  // If desires or interests arrays are defined display it. Otherwise don't show anything.
  const desiresView = desires ? <Text>{`Desires: ${desires.join(", ")}`}</Text> : null;
  const interestView = interests ? <Text>{`Interets: ${interests.join(", ")}`}</Text> : null;

  // Display all of the user's images one after another if they exist.
  const images = photos ? photos.map((photo, i) => <Photo photo={photo} key={i} />) : null;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text>{`${age}y ${gender}, ${sexuality}`}</Text>
      <Text>{`About: ${about}`}</Text>
      {desiresView}
      {interestView}
      {images}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },

  name: {
    fontSize: 25,
  },

  image: {
    height: 500,
    width: null,

    marginTop: 10,
  },
});

export default UsersView;
