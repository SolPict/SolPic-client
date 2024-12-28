import { StyleSheet, View } from "react-native";

export default function RedDot() {
  return <View style={styles.redDotContainer}></View>;
}

const styles = StyleSheet.create({
  redDotContainer: {
    width: "55%",
    height: "30%",
    backgroundColor: "red",
    position: "absolute",
    borderRadius: 30,
    right: 10,
    top: 7,
  },
});
