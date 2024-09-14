import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ColorList from "../components/ColorList";

export default function ReviewNote() {
  return (
    <SafeAreaView>
      <View style={styles.reviewHeader}>
        <Text style={styles.totalProblem}>총: 2문제</Text>
        <TouchableOpacity activeOpacity={0.6} style={styles.recommendButton}>
          <Text style={styles.recommendText}>문제 추천</Text>
        </TouchableOpacity>
      </View>
      <ColorList color="#4f3fe5" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalProblem: {
    fontSize: 20,
    fontWeight: "500",
    margin: 10,
    justifyContent: "space-evenly",
  },
  recommendButton: {
    backgroundColor: "blue",
    margin: 10,
    padding: 5,
    borderRadius: 10,
  },
  recommendText: {
    fontSize: 20,
    color: "white",
  },
});
