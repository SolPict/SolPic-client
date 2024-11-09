import { SafeAreaView, StyleSheet } from "react-native";

import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { Alert } from "react-native";
import axios from "axios";

import SortingScrollButton from "../components/SortingScrollButton";
import ProblemList from "../components/ProblemList";
import { PROBLEM_LIMIT } from "../constants/pageLimit";

export default function Problems() {
  const [problemList, setProblemList] = useState([]);
  const [sortType, setSortType] = useState("전체보기");
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const sortedList = [...problemList].filter((problem) => {
    if (sortType === "전체보기") {
      return problem;
    }

    return problem.problemType === sortType;
  });

  const getProblemsList = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        process.env.EXPO_PUBLIC_SERVER_URL + "problems",
        {
          params: {
            offset,
            problemLimit: PROBLEM_LIMIT,
          },
        }
      );

      const problemImage = JSON.parse(data);

      setOffset(problemImage["offset"]);
      setProblemList(problemList.concat(...problemImage["image_list"]));
    } catch (error) {
      Alert.alert("문제 데이터를 불러오는데 실패하였습니다.");
      console.error("문제 데이터를 불러오는데 실패하였습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProblemsList();
  }, []);

  return (
    <SafeAreaView style={styles.problemContainer}>
      <SortingScrollButton sortType={sortType} setSortType={setSortType} />
      <ProblemList
        problems={sortedList}
        prevPage="home"
        loading={isLoading}
        offset={offset}
        getProblemsList={getProblemsList}
      ></ProblemList>
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
