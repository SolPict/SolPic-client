import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import useClientStore from "../../store/store";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import ProblemList from "../../components/ProblemList";

export default function ReviewNote() {
  const [ReviewNote, setReviewNote] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const { getClientStatus } = useClientStore();
  const { email, isLogin } = getClientStatus();

  useFocusEffect(
    useCallback(() => {
      if (isLogin) {
        getReviewNote();
      }
    }, [email, isLogin])
  );

  useEffect(() => {
    if (isLogin) {
      getReviewNote();
    }
  }, [email, isLogin]);

  const getReviewNote = async () => {
    try {
      const { data } = await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URL + "problems/reviewNote",
        {
          email,
        }
      );

      setReviewNote(JSON.parse(data));
    } catch (error) {
      Alert.alert("리뷰노트 데이터를 가져오는데 실패하였습니다.", error);
      console.error("리뷰노트 데이터를 가져오는데 실패하였습니다.", error);
    }
  };

  if (!isLogin) {
    return (
      <View style={styles.notLogInPage}>
        <Text>해당 페이지는 로그인이 필요한 페이지입니다.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.reviewContainer}>
      <ProblemList
        problems={ReviewNote}
        prevPage="reviewNote"
        isLoading={isLoading}
        offset={offset}
        getProblemsList={getReviewNote}
      ></ProblemList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    top: 50,
    height: "90%",
    paddingVertical: 40,
  },
  notLogInPage: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
});
