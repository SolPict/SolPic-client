import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MathView from "react-native-math-view";

export default function LaTeXView({ problemId, children }) {
  children = children.replace(/ +/g, " ").replaceAll("\\boxed", "$\\boxed");

  return (
    <View style={styles.container}>
      {children.split("$").map((sentence, index) => {
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        return korean.test(sentence) ? (
          <Text style={styles.korText} key={problemId + index}>
            {sentence.trim()}
          </Text>
        ) : (
          <MathView key={problemId + index} math={sentence} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    margin: 10,
  },
  korText: {
    width: "100%",
  },
  mathText: {},
});
