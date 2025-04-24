// ReviewNote.tsx
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import useClientStore from "@/store/store";
import { useCallback, useState } from "react";
import axios from "axios";
import ProblemList from "@/components/ProblemList";
import { PROBLEM_LIMIT } from "@/constants/page_limit";
import { useFocusEffect } from "expo-router";

export default function ReviewNote() {
  const [reviewNote, setReviewNote] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { getClientStatus } = useClientStore();
  const { email, isLogin } = getClientStatus();

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  useFocusEffect(
    useCallback(() => {
      if (isLogin && email) getReviewNote();
    }, [isLogin, email])
  );

  const getReviewNote = async () => {
    setIsLoading(true);
    try {
      const { data: reviewImage } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}problems/reviewNote`,
        { email },
        { params: { offset, problemLimit: PROBLEM_LIMIT } }
      );

      if (!reviewImage || !reviewImage.image_list) {
        throw new Error("REVIEWNOTE_FAIL");
      }

      setOffset(reviewImage.offset);
      setReviewNote((prev) => prev.concat(...reviewImage.image_list));
    } catch (error) {
      console.error(error);
      setErrorMessage("REVIEWNOTE_FAIL");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLogin) {
    return (
      <View style={styles.notLogInPage}>
        <Text>로그인이 필요한 페이지입니다.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.reviewContainer}>
      <ProblemList
        problems={reviewNote}
        prevPage="reviewNote"
        isLoading={isLoading}
        offset={offset}
        getProblemsList={getReviewNote}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    paddingVertical: 40,
    marginTop: 20,
  },
  notLogInPage: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
});
