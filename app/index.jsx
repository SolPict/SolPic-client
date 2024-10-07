import { SafeAreaView, StyleSheet } from "react-native";

import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { Alert } from "react-native";
import axios from "axios";

import SortingScrollButton from "../components/SortingScrollButton";
import ProblemList from "../components/ProblemList";

export default function Problems() {
  const [problemList, setProblemList] = useState([]);
  const [sortType, setSortType] = useState("전체보기");

  const sortedList = [...problemList].filter((problem) => {
    if (sortType === "전체보기") {
      return problem;
    }

    return problem.problemType === sortType;
  });

  useFocusEffect(
    useCallback(() => {
      getProblemsList();
    }, [])
  );

  const getProblemsList = async () => {
    try {
      const { data } = await axios.get(
        process.env.EXPO_PUBLIC_SERVER_URL + "problems"
      );

      setProblemList(JSON.parse(data));
    } catch (error) {
      Alert.alert("문제 데이터를 불러오는데 실패하였습니다.");
      console.error(
        "문제 데이터를 불러오는데 실패하였습니다.",
        Object.values(error)
      );
    }
  };

  return (
    <SafeAreaView style={styles.problemContainer}>
      <SortingScrollButton sortType={sortType} setSortType={setSortType} />
      <ProblemList problems={sortedList} prevPage="home"></ProblemList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    height: "80%",
  },
  problems: {
    backgroundColor: "white",
    width: "100%",
    marginBottom: 20,
    borderRadius: 20,
  },
  problemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    padding: 10,
  },
});
