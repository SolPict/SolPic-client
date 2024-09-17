import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AnalyzingProblem() {
  const { imageURI, prevPage } = useLocalSearchParams();
  const analyzeProblemImage = async () => {
    const result = await axios.post(
      process.env.EXPO_PUBLIC_SERVER_URL + "problem/analyze",
      {
        imageURI,
      }
    );
  };

  return (
    <View style={styles.previewContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push(prevPage || "/")}
      >
        <MaterialIcons name="arrow-back" size={35} color="white" />
      </TouchableOpacity>
      <Image
        source={{ uri: imageURI }}
        style={styles.uploadImage}
        resizeMode="contain"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={analyzeProblemImage}
        >
          <Text style={styles.buttonText}>질문하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadImage: {
    width: "90%",
    height: "100%",
  },
  previewContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    bottom: 150,
  },
  backButton: {
    position: "absolute",
    padding: 20,
    top: 50,
    left: 0,
    zIndex: 1,
  },
  analyzeButton: {
    backgroundColor: "white",
    width: 180,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.1,
    top: 10,
  },
  buttonText: {
    fontSize: 22,
  },
});
