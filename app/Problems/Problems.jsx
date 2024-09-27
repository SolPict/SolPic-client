import {
  SafeAreaView,
  Image,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import SortingScrollButton from "../../components/SortingScrollButton";
import { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import { Alert } from "react-native";

export default function Problems() {
  const [problemList, setProblemList] = useState([]);

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
    <SafeAreaView>
      <SortingScrollButton />
      <ScrollView style={styles.container}>
        {!problemList.length ||
          problemList.map(
            (
              {
                uri,
                problemType,
                correctCount,
                solvingCount,
                _id: { $oid: problemId },
              },
              index
            ) => {
              return (
                <TouchableOpacity
                  key={problemId}
                  style={styles.problemContainer}
                  onPress={() =>
                    router.push(
                      `/Problems/${problemId}?problem=` +
                        encodeURIComponent(JSON.stringify(problemList[index]))
                    )
                  }
                >
                  <View style={styles.problemHeader}>
                    <Text style={styles.headerText}>
                      정답률: {Math.floor((correctCount * 100) / solvingCount)}%
                    </Text>
                    <Text style={styles.headerText}>분류: {problemType}</Text>
                  </View>
                  <Image style={styles.problemImage} source={{ uri: uri }} />
                </TouchableOpacity>
              );
            }
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    gap: 10,
  },
  problemContainer: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
  },
  problemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 17,
  },
  problemImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 0,
  },
});
