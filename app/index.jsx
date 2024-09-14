import { Link } from "expo-router";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Sol.Pic</Text>
      <Link href="/Camera" asChild>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>사진 업로드</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/Problems" asChild>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>문제 풀기</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    height: "100%",
    gap: 30,
  },
  title: {
    marginTop: 100,
    marginBottom: 80,
    fontSize: 110,
    fontWeight: "200",
  },
  buttonContainer: {
    backgroundColor: "#a5d8ff",
    width: 300,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  buttonText: {
    fontSize: 30,
  },
});
