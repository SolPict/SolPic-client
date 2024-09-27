import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useClientStore from "../../store/store";

export default function AnswerPage() {
  const { problemId, answer } = useLocalSearchParams();
  const { uri, explanation } = JSON.parse(decodeURIComponent(answer));
  const { getClientStatus } = useClientStore();
  const { email } = getClientStatus();

  const goToHome = () => {
    router.push("/");
  };

  const addReviewNote = async () => {
    try {
      await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URL + "problems/reviewNote/" + problemId,
        {
          email,
        }
      );

      router.push("/ProblemReviews/ReviewNote");
    } catch (error) {
      Alert.alert("리뷰 노트를 추가하지 못했습니다.");
      console.error("리뷰 노트를 추가하지 못했습니다.", error);
    }
  };

  return (
    <SafeAreaView style={styles.answerContainer}>
      <Image source={{ uri }} style={styles.problemImage} />
      <ScrollView style={styles.answerTextContainer}>
        <Text style={styles.answerText}>{explanation}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  problemImage: {
    width: "90%",
    height: "30%",
    resizeMode: "contain",
  },
  answerTextContainer: {
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 80,
    marginHorizontal: 20,
  },
  answerText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    bottom: 150,
    gap: 30,
  },
  Button: {
    backgroundColor: "rgb(97 231 228)",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.1,
    top: 80,
  },
  buttonText: {
    fontSize: 20,
  },
});
