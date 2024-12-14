import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import RadioButton from "@/components/RadioButton";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import useClientStore from "@/store/store";
import { COLORS } from "@/constants/colors";
import DeleteModal from "@/components/DeleteModal";

export default function ProblemPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [problemInfo, setProblemInfo] = useState({});
  const { problemId } = useLocalSearchParams();
  const [selectedRadio, setSelectedRadio] = useState<number>(1);
  const { getClientStatus } = useClientStore();
  const { email } = getClientStatus();
  const problemJSONId = JSON.stringify((problemId as string).split("/"));

  useEffect(() => {
    getProblemInfo();
  }, []);

  const getProblemInfo = async () => {
    try {
      const { data } = await axios.get(
        process.env.EXPO_PUBLIC_SERVER_URL + "problem/" + problemJSONId
      );

      setProblemInfo(data);
    } catch (error) {
      Alert.alert("문제 정보를 불러오는데 문제가 발생하였습니다.");
      console.error(error);
    }
  };

  const deleteReviewNote = async () => {
    try {
      setModalVisible(true);

      await axios.delete(
        process.env.EXPO_PUBLIC_SERVER_URL +
          "problem/reviewNote/" +
          problemJSONId,
        {
          data: {
            email,
          },
        }
      );

      router.replace("(tabs)/ReviewNote");
      setModalVisible(false);
    } catch (error) {
      Alert.alert("리뷰를 삭제하지 못하였습니다.");
      console.error(error);
    }
  };

  const handleSubmit = () => {
    try {
      axios.post(
        process.env.EXPO_PUBLIC_SERVER_URL +
          "problem/solving/" +
          JSON.stringify((problemId as string).split("/")),
        {
          email: email || "",
        }
      );

      router.replace(
        "/(tabs)/Home/Answer/" + encodeURIComponent(problemId as string)
      );
    } catch (error) {
      Alert.alert("제출에 실패하였습니다.");
      console.error(error);
    }
  };

  return (
    <View style={styles.problemContainer}>
      <Image
        source={{ uri: process.env.EXPO_PUBLIC_S3_URL + problemId }}
        style={styles.problemImage}
      />
      <Text style={styles.radioTitle}>번호</Text>
      <RadioButton
        selectedRadio={selectedRadio}
        setSelectedRadio={setSelectedRadio}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.deleteContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.deleteText}>삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitContainer} onPress={handleSubmit}>
          <Text style={styles.submitText}>제출하기</Text>
        </TouchableOpacity>
      </View>
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deleteReviewNote={deleteReviewNote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  problemContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  backButton: {
    width: "10%",
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
    left: 20,
  },
  problemImage: {
    width: "90%",
    height: "30%",
    resizeMode: "contain",
    margin: 20,
  },
  radioTitle: {
    fontWeight: "800",
    fontSize: 20,
    margin: 20,
  },
  bottomContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    bottom: 50,
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
    width: "73%",
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
