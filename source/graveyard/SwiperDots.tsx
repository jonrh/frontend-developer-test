import { View } from "react-native";
import React from "react";

interface Props {
  backgroundColor: string; // "black", "#000000", "rgba(255,255,255,.3)", etc
}

/**
 * Custom pagination dots that appear if a user has more than one photo. No longer used, created
 * for when the <Swiper> component was in use.
 */
export function SwiperDots(props: Props) {
  return (
    <View
      style={{
        backgroundColor: props.backgroundColor,
        width: 10,
        height: 10,
        borderRadius: 7,
        marginLeft: 7,
        marginRight: 7,
        marginTop: 7,
      }}
    />
  );
}
