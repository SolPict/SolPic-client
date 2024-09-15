import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ProblemContainer({ color, currentPage }) {
  let destinationPage = currentPage === "PastHistory" ? "Answers" : "Problems";
  destinationPage = currentPage === "Problems" ? "Problems" : "ProblemReviews";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[0.9, 0.8, 0.6, 0.4, 0.3].map((opacity) => {
        return (
          <TouchableOpacity
            key={opacity}
            style={[styles.color, { backgroundColor: color, opacity }]}
            onPress={() => router.push(destinationPage + "/1")}
          >
            <Text style={styles.content}>문제</Text>
          </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    fontSize: 100,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 0,
  },
});
