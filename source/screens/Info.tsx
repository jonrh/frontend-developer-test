import React from "react";
import { Text, SafeAreaView, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { isDebug } from "../utilities/Constants";

const logo = require("../../assets/logo1024x1024.png");

interface Props {}

const Info: React.FC<Props> = props => {
  return (
    <SafeAreaView style={s.container}>
      <Text style={s.headerLabel}>Akur</Text>

      <Image source={logo} style={s.logo} />

      <View>
        <Text style={s.centerText}>This app is a coding challenge for Feeld.</Text>
        <Text style={s.centerText}>
          <Text style={s.bold}>Author</Text>: Jón Rúnar Helgason, jonrh.is
        </Text>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: isDebug ? "brown" : null,
  },

  headerLabel: {
    fontSize: 50,
    fontWeight: "200",

    backgroundColor: isDebug ? "blue" : null,
  },

  logo: {
    width: 250,
    height: 250,

    backgroundColor: isDebug ? "red" : null,
  },

  bold: {
    fontWeight: "bold",
  },

  centerText: {
    textAlign: "center",
  },
});

export default Info;
