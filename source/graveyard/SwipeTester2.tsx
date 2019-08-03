import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { THEME_COLOUR_PURPLE } from "../utilities/Constants";
import { SwiperDots } from "./SwiperDots";

const s = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  yeah: {
    textAlign: "right",
  },
  nope: {
    textAlign: "left",
  },
});

function Kek() {
  return (
    <Swiper
      style={s.wrapper}
      showsButtons={false}
      horizontal={false}
      dot={<SwiperDots backgroundColor="rgba(255,255,255,.3)" />}
      activeDot={<SwiperDots backgroundColor={THEME_COLOUR_PURPLE} />}
    >
      <View style={s.slide1}>
        <Text style={s.text}>Pic 1</Text>
      </View>
      <View style={s.slide2}>
        <Text style={s.text}>Pic 2</Text>
      </View>
      <View style={s.slide3}>
        <Text style={s.text}>Pic 3</Text>
      </View>
    </Swiper>
  );
}

function Nope() {
  return (
    <View style={s.slide1}>
      <Text style={{ ...s.text, ...s.nope }}>nope</Text>
    </View>
  );
}

function Yeah() {
  return (
    <View style={s.slide1}>
      <Text style={s.text}>yeah</Text>
    </View>
  );
}

interface Props {}

const SwipeTester2: React.FC<Props> = props => {
  return (
    <Swiper showsPagination={true} index={1}>
      <Yeah />
      <Kek />
      <Nope />
    </Swiper>
  );
};

export default SwipeTester2;
