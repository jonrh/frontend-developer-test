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
        <Text style={s.text}>Hello Swiper</Text>
      </View>
      <View style={s.slide2}>
        <Text style={s.text}>Beautiful</Text>
      </View>
      <View style={s.slide3}>
        <Text style={s.text}>And simple</Text>
      </View>
    </Swiper>
  );
}

interface Props {}

const SwipeTester: React.FC<Props> = props => {
  return (
    <Swiper showsPagination={false}>
      <Kek />
      <Kek />
      <Kek />
    </Swiper>
  );
};

export default SwipeTester;
