import { router, useLocalSearchParams } from "expo-router";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import RadioButton from "../../components/RadioButton";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import useClientStore from "../../store/store";

export default function ProblemPage() {
  const { problemId, problem } = useLocalSearchParams();
  const problemInfo = JSON.parse(decodeURIComponent(problem));
  const [selectedRadio, setSelectedRadio] = useState(1);
  const { getClientStatus } = useClientStore();
  const { email } = getClientStatus();

  const handleSubmit = () => {
    try {
      const isUserAnswerCorrect = selectedRadio === problemInfo.answer;
      axios.post(
        process.env.EXPO_PUBLIC_SERVER_URL + "problem/solving/" + problemId,
        {
          email: email || "",
          isUserAnswerCorrect,
        }
      );

      router.push(
        `/Answers/${problemId}?answer=` +
          encodeURIComponent(JSON.stringify(problemInfo))
      );
    } catch (error) {
      Alert.alert(error);
      console.error(error);
    }
  };

  return (
    <View>
      <Image source={{ uri: problemInfo.uri }} style={styles.problemImage} />
      <RadioButton
        selectedRadio={selectedRadio}
        setSelectedRadio={setSelectedRadio}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>제출하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  problemImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  submitButton: {
    backgroundColor: "rgb(97 231 228)",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
  },
  submitText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
