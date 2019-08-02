import React from "react";
import { SafeAreaView, Text } from "react-native";

interface Props {}

const Chat: React.FC<Props> = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>This screen will show matches and other open chats</Text>
    </SafeAreaView>
  );
};

export default Chat;
