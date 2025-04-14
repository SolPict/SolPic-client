import loadingLottie from "../assets/lottie/loadingLottie.json";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useClientStore from "@/store/store";
import { COLORS } from "../constants/colors";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

interface LoadingLottieProps {
  goToAnswerPage: () => void;
}

export default function LoadingLottie({ goToAnswerPage }: LoadingLottieProps) {
  const { getClientStatus } = useClientStore();
  const { loadingState, language } = getClientStatus();

  const isDisabled = loadingState === "loading";

  return (
    <View style={styles.lottieContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/Home")}
      >
        <AntDesign name="left" size={36} color="black" />
      </TouchableOpacity>
      <LottieView source={loadingLottie} autoPlay loop style={styles.lottie} />
      <TouchableOpacity
        disabled={isDisabled}
        style={[styles.Button, isDisabled && styles.disabledButton]}
        onPress={goToAnswerPage}
      >
        <Text style={styles.buttonText}>
          {language === "한국어" ? "결과보기" : "View Solution"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    bottom: 160,
    right: 165,
  },
  lottieContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: "30%",
    height: "30%",
    resizeMode: "contain",
  },
  Button: {
    backgroundColor: COLORS.PRIMARY,
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    top: 200,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
  },
});
