import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useClientStore from "../../store/store";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";

export default function ReviewNote() {
  const [ReviewNote, setReviewNote] = useState([]);
  const { getClientStatus } = useClientStore();
  const { email } = getClientStatus();

  useFocusEffect(
    useCallback(() => {
      getReviewNote();
    }, [])
  );

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

  return (
    <SafeAreaView>
      <View style={styles.reviewHeader}>
        <Text style={styles.totalProblem}>총: 2문제</Text>
        <TouchableOpacity activeOpacity={0.6} style={styles.recommendButton}>
          <Text style={styles.recommendText}>문제 추천</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        {!ReviewNote.length ||
          ReviewNote.map((problem) => {
            return (
              <TouchableOpacity
                key={problem._id.$oid}
                style={styles.problemContainer}
                onPress={() =>
                  router.push(
                    `/ProblemReviews/${problem._id.$oid}?problem=` +
                      encodeURIComponent(JSON.stringify(problem))
                  )
                }
              >
                <Image
                  style={styles.problemImage}
                  source={{ uri: problem.uri }}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalProblem: {
    fontSize: 20,
    fontWeight: "500",
    margin: 10,
    justifyContent: "space-evenly",
  },
  recommendButton: {
    backgroundColor: "blue",
    margin: 10,
    padding: 5,
    borderRadius: 10,
  },
  recommendText: {
    fontSize: 20,
    color: "white",
  },
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
