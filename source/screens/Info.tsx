import React from "react";
import { Text, SafeAreaView, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const logo = require("../../assets/logo1024x1024.png");

interface Props {}

const Info: React.FC<Props> = props => {
  return (
    <SafeAreaView style={s.container}>
      <Text style={s.headerLabel}>Akur</Text>
      <Image source={logo} style={s.logo} />

      <View style={{ flex: 1 }}>
        <Text>This app is a coding challenge for Feeld.</Text>
        <Text>
          <Text style={s.bold}>Author</Text>: Jón Rúnar Helgason, jonrh.is
        </Text>
      </View>

      <TouchableOpacity style={s.button}>
        <Text style={s.buttonText}>
          Reset ratings <SimpleLineIcons name="heart" size={30} color="#232323" />
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLabel: {
    fontSize: 50,
    fontWeight: "200",
  },

  logo: {
    width: 250,
    height: 250,
  },

  bold: {
    fontWeight: "bold",
  },

  button: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    marginBottom: 40,

    backgroundColor: "#f072ff",
  },

  buttonText: {
    fontSize: 40,
    fontWeight: "200",
    color: "#232323",
  },
});

export default Info;
