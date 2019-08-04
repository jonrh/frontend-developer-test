import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { isDebug } from "../utilities/Constants";

interface ButtonProps {
  buttonText: string; // The text label on the button
  onPress: () => void; // The function that will be invoked once the button is pressed
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <TouchableOpacity style={s.button} onPress={props.onPress}>
      <Text style={s.buttonText}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",

    backgroundColor: isDebug ? "brown" : null,
  },

  buttonText: {
    fontSize: 40,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Button;
