import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import Swiper from "react-native-swiper";

import { User, UserPhoto } from "../utilities/Types";
import { isDebug, THEME_COLOUR_PURPLE } from "../utilities/Constants";
import { SwiperDots } from "./SwiperDots";

interface PhotoProps {
  photo: UserPhoto;
}

/** Displays a plain view of a user's photo */
const Photo: React.FC<PhotoProps> = props => {
  return <Image style={s.image} source={{ uri: props.photo.url }} />;
};

interface UserPhotosProps {
  photos?: UserPhoto[];
}

/**  */
const UserPhotos: React.FC<UserPhotosProps> = props => {
  const userPhotos = props.photos
    ? props.photos.map((photo, index) => <Photo photo={photo} key={index} />)
    : null;

  return (
    <Swiper
      showsButtons={false}
      horizontal={false}
      style={s.imageSwiper}
      dot={<SwiperDots backgroundColor="rgba(255, 255, 255, .8)" />}
      activeDot={<SwiperDots backgroundColor={THEME_COLOUR_PURPLE} />}
    >
      {userPhotos}
    </Swiper>
  );
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
    <View style={s.container}>
      {/*<ScrollView style={{ height: 500 }}>{images}</ScrollView>*/}
      <UserPhotos photos={props.user.photos} />

      <Text style={s.name}>{name}</Text>
      <Text>{`${age}y ${gender}, ${sexuality}`}</Text>
      <Text>{`About: ${about}`}</Text>
      {desiresView}
      {interestView}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 4,
    marginBottom: 20,
  },

  name: {
    fontSize: 25,
  },

  image: {
    height: 400,
    width: null,

    backgroundColor: isDebug ? "blue" : null,
  },

  imageSwiper: {
    backgroundColor: isDebug ? "orange" : null,
  },
});

export default UsersView;
