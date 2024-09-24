import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PROBLEM_ANSWER } from "./Mockup";

export default function AnswerPage() {
  const { problemId, answer } = useLocalSearchParams();
  const { imageURI, problem_answer } = JSON.parse(decodeURIComponent(answer));

  const goToHome = () => {
    router.push("/");
  };

  const addReviewNote = async () => {
    await axios.post(
      process.env.EXPO_PUBLIC_SERVER_URL + "problem/review/" + problemId
    );

    router.push("/ProblemReviews/ReviewNote");
  };

  return (
    <SafeAreaView style={styles.answerContainer}>
      <Image
        source={{ uri: imageURI }}
        style={styles.problemImage}
        // resizeMode="contain"
      />
      <ScrollView style={styles.answerTextContainer}>
        <Text style={styles.answerText}>{PROBLEM_ANSWER}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.Button} onPress={goToHome}>
          <Text style={styles.buttonText}>메인으로</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={addReviewNote}>
          <Text style={styles.buttonText}>복습노트 추가</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  problemImage: {
    width: 350,
    height: 200,
  },
  answerTextContainer: {
    borderColor: "white",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 80,
    marginHorizontal: 20,
  },
  answerText: {
    color: "white",
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    bottom: 150,
    gap: 30,
  },
  Button: {
    backgroundColor: "white",
    width: 180,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.1,
    top: 80,
  },
  buttonText: {
    fontSize: 22,
  },
});
