import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Image } from "expo-image";
import axios from "axios";

import RadioButton from "@/components/RadioButton";
import ConfirmModal from "@/components/ConfirmModal";
import ResultModal from "@/components/ResultModal";

import useClientStore from "@/store/store";
import { COLORS } from "@/constants/colors";
import { QUESTIONS } from "@/constants/modal_questions";
import { ERROR_MESSAGES } from "@/constants/error_messages";

export default function ProblemPage() {
  const { problemId } = useLocalSearchParams();
  const { getClientStatus } = useClientStore();
  const { email, language } = getClientStatus();

  const [selectedRadio, setSelectedRadio] = useState<number>(1);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [resultModalVisible, setResultModalVisible] = useState<boolean>(false);
  const [isAnswer, setIsAnswer] = useState<boolean>(false);

  const deleteReviewNote = async () => {
    try {
      await axios.delete(
        process.env.EXPO_PUBLIC_SERVER_URL +
          "problem/reviewNote/" +
          encodeURIComponent(JSON.stringify((problemId as string).split("/"))),
        {
          data: { email },
        }
      );
      setDeleteModalVisible(false);
      router.replace("(tabs)/ReviewNote");
    } catch (error) {
      Alert.alert(
        language === "한국어"
          ? ERROR_MESSAGES.DELETE_FAIL.KO
          : ERROR_MESSAGES.DELETE_FAIL.EN
      );
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URL +
          "problem/solving/" +
          encodeURIComponent(problemId as string),
        {
          email: email || "",
          user_answer: selectedRadio.toString(),
        }
      );

      setIsAnswer(response.data.isAnswer);
      setResultModalVisible(true);
    } catch (error) {
      Alert.alert(
        language === "한국어"
          ? ERROR_MESSAGES.SUBMIT_FAIL.KO
          : ERROR_MESSAGES.SUBMIT_FAIL.EN
      );
      console.error(error);
    }
  };

  return (
    <View style={styles.problemContainer}>
      <View style={styles.imgageContainer}>
        <Image
          source={{ uri: process.env.EXPO_PUBLIC_S3_URL + problemId }}
          style={styles.problemImage}
          contentFit="contain"
        />
      </View>
      <Text style={styles.radioTitle}>
        {language === "한국어" ? "번호" : "Number"}
      </Text>
      <RadioButton
        selectedRadio={selectedRadio}
        setSelectedRadio={setSelectedRadio}
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.deleteContainer}
          onPress={() => setDeleteModalVisible(true)}
        >
          <Text style={styles.deleteText}>
            {language === "한국어" ? "삭제" : "Delete"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitContainer} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {language === "한국어" ? "제출하기" : "Submit"}
          </Text>
        </TouchableOpacity>
      </View>

      {deleteModalVisible && (
        <ConfirmModal
          modalVisible={deleteModalVisible}
          setModalVisible={setDeleteModalVisible}
          onConfirm={deleteReviewNote}
          title={language === "한국어" ? "확인" : "Confirm"}
          message={
            language === "한국어"
              ? QUESTIONS.DELETE
              : "Do you want to delete this review?"
          }
        />
      )}

      {resultModalVisible && (
        <ResultModal
          visible={resultModalVisible}
          isCorrect={isAnswer}
          setResultModalVisible={setResultModalVisible}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  problemContainer: {
    backgroundColor: "white",
    height: "100%",
    gap: 10,
  },
  imgageContainer: {
    marginHorizontal: 24,
    height: "30%",
  },
  problemImage: {
    width: "100%",
    height: "100%",
  },
  radioTitle: {
    fontWeight: "700",
    fontSize: 20,
    margin: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 20,
  },
  deleteContainer: {
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    height: 50,
    borderRadius: 10,
  },
  submitContainer: {
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: "72%",
    height: 50,
    borderRadius: 10,
  },
  deleteText: {
    color: "white",
    fontWeight: "700",
  },
  submitText: {
    color: "white",
    fontWeight: "700",
  },
});
