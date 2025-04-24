import axios from "axios";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import useClientStore from "../store/store";
import { useState } from "react";
import { ErrorMessageKey } from "@/constants/error_messages";

interface ReviewButtonProps {
  problemId: string;
  chosenAnswer: 1 | 2 | 3 | 4 | 5 | 0;
}

export default function ReviewButton({
  problemId,
  chosenAnswer = 0,
}: ReviewButtonProps) {
  const { getClientStatus } = useClientStore();
  const { email, language } = getClientStatus();
  const [errorMessage, setErrorMessage] = useState("");

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  const addReviewNote = async () => {
    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}problem/reviewNote/${problemId}`,
        {
          email,
          chosenAnswer,
        }
      );
      router.push("/Home");
    } catch (error) {
      console.error("리뷰노트 추가 실패", error);
      setErrorMessage(ErrorMessageKey.REVIEWNOTE_FAIL);
    }
  };

  return (
    <TouchableOpacity style={styles.Button} onPress={addReviewNote}>
      <Text style={styles.buttonText}>
        {language === "한국어" ? "복습노트 추가" : "Add to Review Note"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
