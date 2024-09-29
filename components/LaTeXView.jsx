import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MathView from "react-native-math-view";

export default function LaTeXView({ children }) {
  return (
    <View style={styles.container}>
      {children.split("$").map((sentence) => {
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        return korean.test(sentence) ? (
          <Text>{sentence.trim().replace(/ +/g, " ")}</Text>
        ) : (
          <MathView math={sentence} style={styles.mathView} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
  },
  mathView: {
    width: "100%",
    height: 100,
  },
});
