import { View, ScrollView, StyleSheet } from "react-native";

export default function ColorList({ color }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[0.9, 0.8, 0.6, 0.4, 0.3].map((opacity) => {
        return (
          <View
            key={opacity}
            style={[styles.color, { backgroundColor: color, opacity }]}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  color: {
    width: "100%",
    height: 200,
    borderRadius: 25,
    borderCurve: "continuous",
    marginBottom: 15,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 0,
  },
});
