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

/** Displays a "1/3" pagination at the bottom of an image. */
const Pagination: React.FC<PaginationProps> = props => {
  // If there is only one photo then there is no need to display pagination
  if (props.photoCount === 1) return null;

  return (
    <View style={s.pagination}>
      <Text style={s.text}>{`${props.photoIndex + 1}/${props.photoCount}`}</Text>
    </View>
  );
};

interface Props {
  photos?: UserPhoto[];
}

interface State {
  index: number; // The index of the currently displayed photo in the array of photos
}

/**
 * Displays photos of a user. If the user has more than one photo they can be flipped through by
 * tabbing on them. A 1/3 pagination is displayed if there are more than one photo. The app logo is
 * displayed if the user has no photos.
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

    // We have more than one photo, turn the photo into a button to flip through, display pagination
    return (
      <TouchableOpacity onPressIn={this.onPhotoPress} activeOpacity={0.8}>
        <Image style={s.image} source={{ uri: currentPhoto.url }} />
        <Pagination photoIndex={this.state.index} photoCount={this.props.photos.length} />
      </TouchableOpacity>
    );
  }
}

const { height } = Dimensions.get("window");
let imageHeight = height * GOLDEN_RATIO;
if (height <= 650) imageHeight = height * 0.55;
if (height <= 600) imageHeight = height * 0.5;

const s = StyleSheet.create({
  image: {
    height: imageHeight,
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
