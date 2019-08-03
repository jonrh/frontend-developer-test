import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";

import { isDebug } from "../utilities/Constants";
import { UserPhoto } from "../utilities/Types";
const logo = require("../../assets/logo1024x1024.png");

const GOLDEN_RATIO = 0.61803;

interface PaginationProps {
  photoIndex: number; // the index of the current number, 0-based counting
  photoCount: number; // how many photos are there in total
}

const Pagination: React.FC<PaginationProps> = props => {
  // If there is only one photo then there is no need to display pagination
  if (props.photoCount === 1) return null;

  return (
    <View style={s.pagination}>
      <Text style={s.text}>{`${props.photoIndex + 1}/${props.photoCount}`}</Text>
    </View>
  );
};

interface PhotoProps {
  photo: UserPhoto;
}

/** Displays a plain view of a single user photo */
const Photo: React.FC<PhotoProps> = props => {
  return <Image style={s.image} source={{ uri: props.photo.url }} />;
};

interface Props {
  photos?: UserPhoto[];
}

interface State {
  index: number; // The index of the currently displayed photo in the array of photos
}

/**
 * Displays photos of a user. If the user has more than one photo they can be flipped through by
 * tabbing on them.
 */
class UserPhotos extends React.Component<Props, State> {
  state: State = {
    index: 0,
  };

  onPhotoPress = () => {
    this.setState((previousState, props) => {
      let newPhotoIndex = previousState.index + 1;

      // If we have surpassed the end of the photos array loop around to the start
      if (newPhotoIndex > props.photos.length - 1) {
        newPhotoIndex = 0;
      }

      return {
        index: newPhotoIndex,
      };
    });
  };

  render() {
    // Display the app logo by default if the user doesn't have any photos
    if (!this.props.photos || this.props.photos.length === 0) {
      return <Image style={s.image} source={logo} />;
    }

    const currentPhoto = this.props.photos[this.state.index];
    const image = <Image style={s.image} source={{ uri: currentPhoto.url }} />;

    // If there is only one image just display it, no need for pagination or TouchableOpacity
    if (this.props.photos.length === 1) return image;

    return (
      <TouchableOpacity onPressIn={this.onPhotoPress} activeOpacity={0.8}>
        <Image style={s.image} source={{ uri: currentPhoto.url }} />
        <Pagination photoIndex={this.state.index} photoCount={this.props.photos.length} />
      </TouchableOpacity>
    );
  }
}

const s = StyleSheet.create({
  image: {
    height: Dimensions.get("window").height * GOLDEN_RATIO,
    width: null,

    backgroundColor: isDebug ? "blue" : null,
  },

  pagination: {
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    backgroundColor: "rgba(0, 0, 0, .5)",
  },

  text: {
    color: "white",
    margin: 7,
  },
});

export default UserPhotos;
