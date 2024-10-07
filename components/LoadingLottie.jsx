import loadingLottie from "../assets/lottie/loadingLottie.json";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useClientStore from "../store/store";
import { COLORS } from "../constants/colors";

export default function LoadingLottie({ goToAnswerPage }) {
  const { getClientStatus } = useClientStore();
  const { loadingState } = getClientStatus();

  const isDisabled = loadingState === "loading";

  return (
    <View style={styles.lottieContainer}>
      <LottieView source={loadingLottie} autoPlay loop style={styles.lottie} />
      <TouchableOpacity
        disabled={isDisabled}
        style={[styles.Button, isDisabled && styles.disabledButton]}
        onPress={goToAnswerPage}
      >
        <Text style={styles.buttonText}>결과보기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  lottieContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  Button: {
    backgroundColor: COLORS.PRIMARY,
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    bottom: 70,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
  },
});
