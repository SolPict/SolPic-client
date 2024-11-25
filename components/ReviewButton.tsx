import axios from "axios";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import useClientStore from "../store/store";

export default function ReviewButton({ problemId, chosenAnswer = 0 }) {
  const { getClientStatus } = useClientStore();
  const { email } = getClientStatus();

  const addReviewNote = async () => {
    try {
      const result = await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URL + "problem/reviewNote/" + problemId,
        {
          email,
          chosenAnswer,
        }
      );

      router.push("/Home");
    } catch (error) {
      Alert.alert("리뷰노트 추가하는데 문제가 발생하였습니다.");
      console.error("리뷰노트 추가하는데 문제가 발생하였습니다.", error);
    }
  };

  return (
    <TouchableOpacity style={styles.Button} onPress={addReviewNote}>
      <Text style={styles.buttonText}>복습노트 추가</Text>
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
