import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import Swiper from "react-native-swiper";

import { User, UserPhoto } from "../utilities/Types";
import { isDebug, THEME_COLOUR_PURPLE } from "../utilities/Constants";
import { SwiperDots } from "./SwiperDots";

interface PhotoProps {
  photo: UserPhoto;
}

/** Displays a plain view of a single user photo */
const Photo: React.FC<PhotoProps> = props => {
  return <Image style={s.image} source={{ uri: props.photo.url }} />;
};

interface UserPhotosProps {
  photos?: UserPhoto[];
}

/**
 * Displays photos of a user. If the user has more than one photo they can be flipped through with
 * a up/down swipe motion. The <Swiper> component also provides a pagination component to indicate
 * how many photos there are.
 */
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

const Desires: React.FC<{ desires?: string[] }> = props => {
  // If the user doesn't have any desires, don't display an empty text label
  if (!props.desires) return null;

  return (
    <Text>
      <Text style={s.bold}>Desires</Text>: {props.desires.join(", ")}
    </Text>
  );
};

const Interests: React.FC<{ interests?: string[] }> = props => {
  // If the user doesn't have any interests, don't display an empty text label
  if (!props.interests) return null;

  return (
    <Text>
      <Text style={s.bold}>Interests</Text>: {props.interests.join(", ")}
    </Text>
  );
};

interface UserViewProps {
  user?: User;
}

/** Displays a user profile. Photo/s, name, age, gender, sexuality, about, desires, interests. */
const UsersView: React.FC<UserViewProps> = props => {
  // A temporary fix for when the `user` prop is empty. This has the drawback of returning an empty
  // view. This results in the layout jumping around once a user has been loaded. To be fixed later.
  if (!props.user) return null;

  const { name, age, gender, sexuality, about, desires, interests } = props.user.info;
  const { associated } = props.user;

  let userName = name;
  let userAgeGenderSexuality = `${age}y ${gender} ${sexuality}`;

  // If there is an associated user (couple), append it to the name and info labels
  if (associated) {
    userName += ` & ${associated.name}`;
    userAgeGenderSexuality += `, ${associated.age}y ${associated.gender} ${associated.sexuality}`;
  }

  return (
    <View style={s.container}>
      <UserPhotos photos={props.user.photos} />

      <View style={s.aboutContainer}>
        <Text style={s.name}>{userName}</Text>
        <Text>{userAgeGenderSexuality}</Text>

        <Text style={s.aboutDescription}>
          <Text style={s.bold}>About</Text>: {about}
        </Text>

        <Desires desires={desires} />
        <Interests interests={interests} />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 4,
    marginBottom: 20,

    backgroundColor: isDebug ? "brown" : null,
  },

  aboutContainer: {
    // flex: 0.5,
    marginLeft: 20,
    marginRight: 20,
  },

  aboutDescription: {
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
    height: 400,
    width: null,

    backgroundColor: isDebug ? "blue" : null,
  },

  imageSwiper: {
    backgroundColor: isDebug ? "orange" : null,
  },
});

export default UsersView;
