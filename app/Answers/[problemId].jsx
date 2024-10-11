import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useClientStore from "../../store/store";
import LaTeXView from "../../components/LaTeXView";
import { COLORS } from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import ReviewModal from "../../components/ReviewModal";

export default function AnswerPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isWideBorder, setIsWideBorder] = useState(false);
  const { problemId, answer } = useLocalSearchParams();
  const { uri, explanation } = JSON.parse(decodeURIComponent(answer));
  const { getClientStatus } = useClientStore();
  const { email, isLogin } = getClientStatus();

  const goToHome = () => {
    router.push("/");
  };

  const addReviewNote = async () => {
    try {
      await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URL + "problem/reviewNote/" + problemId,
        {
          email,
        }
      );

      router.push("/ProblemReviews/ReviewNote");
    } catch (error) {
      if (!email) {
        Alert.alert("로그인하지 않은 유저입니다.");
      } else {
        Alert.alert("리뷰 노트를 추가하지 못했습니다.");
      }
      console.error("리뷰 노트를 추가하지 못했습니다.", error);
    }
  };

  return (
    <SafeAreaView style={styles.answerContainer}>
      <View
        style={[styles.imageContainer, { height: isWideBorder ? 0 : "35%" }]}
      >
        <Image source={{ uri }} style={styles.problemImage} />
      </View>
      <ScrollView
        style={[isWideBorder ? styles.offWideScroll : styles.answerScroll]}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.answerScrollContainer}
          onPress={() => setIsWideBorder(!isWideBorder)}
        >
          <LaTeXView problemId={problemId}>
            {typeof explanation === "string"
              ? explanation
              : explanation.join("")}
          </LaTeXView>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.Button} onPress={goToHome}>
          <Text style={styles.buttonText}>메인으로</Text>
        </TouchableOpacity>
        {isLogin && (
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={() => setModalVisible(true)}
          >
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <ReviewModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addReviewNote={addReviewNote}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  answerScrollContainer: {
    height: "200%",
  },
  imageContainer: {
    width: "90%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  problemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  answerScroll: {
    width: "90%",
    marginHorizontal: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
  },
  offWideScroll: {
    top: 30,
    marginBottom: 25,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    zIndex: 1,
  },
  answerText: {
    fontSize: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    bottom: 150,
  },
  Button: {
    backgroundColor: COLORS.PRIMARY,
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    top: 135,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  reviewButton: {
    backgroundColor: COLORS.PRIMARY,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 300,
    top: 60,
  },
  buttonText: {
    color: "white",
  },
});
