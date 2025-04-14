import axios from "axios";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useClientStore from "@/store/store";
import { COLORS } from "@/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { Image } from "expo-image";
import ConfirmModal from "@/components/ConfirmModal";
import { QUESTIONS } from "@/constants/modal_questions";
import { ERROR_MESSAGES } from "@/constants/error_messages";
import LaTeXView from "@/components/LaTeXView";

export default function AnswerPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isWideBorder, setIsWideBorder] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>("");
  const { problemId } = useLocalSearchParams<{ problemId: string }>();
  const { getClientStatus } = useClientStore();
  const { email, isLogin, language } = getClientStatus();

  const goToHome = () => {
    router.replace("/");
  };

  useFocusEffect(
    useCallback(() => {
      getProblem();

      return () => {
        setExplanation("");
      };
    }, [problemId])
  );

  const getProblem = async () => {
    try {
      const langCode = language === "한국어" ? "KO" : "EN";

      const encodedProblemId = encodeURIComponent(
        JSON.stringify((problemId as string).split("/"))
      );
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_SERVER_URL}problem/${encodedProblemId}?language=${langCode}`
      );

      setExplanation(data);
    } catch (error) {
      console.error(error);
      Alert.alert(
        language === "한국어"
          ? ERROR_MESSAGES.OCR_FAIL.KO
          : ERROR_MESSAGES.OCR_FAIL.EN
      );
    }
  };

  const addReviewNote = async () => {
    try {
      const encodedProblemId = encodeURIComponent(
        JSON.stringify((problemId as string).split("/"))
      );
      await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}problem/reviewNote/${encodedProblemId}`,
        {
          email,
        }
      );

      router.replace("/(tabs)/ReviewNote");
    } catch (error) {
      if (!email) {
        Alert.alert(
          language === "한국어"
            ? ERROR_MESSAGES.LOGIN.KO
            : ERROR_MESSAGES.LOGIN.EN
        );
      } else {
        Alert.alert(
          language === "한국어"
            ? ERROR_MESSAGES.SIGNUP.KO
            : ERROR_MESSAGES.SIGNUP.EN
        );
      }
      console.error("리뷰 노트를 추가하지 못했습니다.", error);
    }
  };

  return (
    <SafeAreaView style={styles.answerContainer}>
      <View
        style={[styles.imageContainer, { height: isWideBorder ? 0 : "35%" }]}
      >
        <Image
          source={{ uri: process.env.EXPO_PUBLIC_S3_URL + problemId }}
          style={styles.problemImage}
          contentFit="contain"
        />
      </View>
      <ScrollView
        style={[isWideBorder ? styles.offWideScroll : styles.answerScroll]}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.answerScrollContainer}
          onPress={() => setIsWideBorder(!isWideBorder)}
        >
          <LaTeXView
            isWideBorder={isWideBorder}
            latex={explanation}
          ></LaTeXView>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.Button} onPress={goToHome}>
          <Text style={styles.buttonText}>
            {language === "한국어" ? "메인으로" : "Home"}
          </Text>
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
      <ConfirmModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirm={addReviewNote}
        title={language === "한국어" ? "확인" : "Confirm"}
        message={
          language === "한국어"
            ? QUESTIONS.REVIEW
            : "Do you want to add this problem to your review note?"
        }
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
    paddingBottom: 70,
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
});
