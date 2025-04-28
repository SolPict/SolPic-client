import { SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import SortingScrollButton from "@/components/SortingScrollButton";
import ProblemList from "@/components/ProblemList";
import { PROBLEM_LIMIT } from "@/constants/page_limit";
import { ErrorMessageKey } from "@/constants/error_messages";

export default function Problems() {
  const [problemList, setProblemList] = useState([]);
  const [sortType, setSortType] = useState<string>("전체보기");
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  const getProblemsList = async (newSortType?: string) => {
    try {
      setIsLoading(true);

      if (newSortType && newSortType !== sortType) {
        setProblemList([]);
        setOffset(0);
        setSortType(newSortType);
      }

      switch (newSortType) {
        case "수와 연산":
          newSortType = "Number & Operation";
          break;
        case "대수학":
          newSortType = "Algebra";
          break;
        case "기하학":
          newSortType = "Geometry";
          break;
      }

      const { data: problemImage } = await axios.get(
        process.env.EXPO_PUBLIC_SERVER_URL + "problems",
        {
          params: {
            offset: newSortType ? 0 : offset,
            problemLimit: PROBLEM_LIMIT,
            problemType: newSortType || sortType,
          },
        }
      );

      setOffset(problemImage["offset"]);
      setProblemList((prev) =>
        newSortType
          ? problemImage["image_list"]
          : prev.concat(...problemImage["image_list"])
      );
    } catch (error) {
      setErrorMessage(ErrorMessageKey.PROBLEM_LIST_FAIL);
      console.error("문제 데이터를 불러오는데 실패하였습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProblemsList();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainor}>
      <SortingScrollButton
        sortType={sortType}
        setSortType={(selected) => getProblemsList(selected)}
      />
      <ProblemList
        problems={problemList}
        prevPage="home"
        isLoading={isLoading}
        offset={offset}
        getProblemsList={getProblemsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainor: {
    marginBottom: 80,
  },
});
