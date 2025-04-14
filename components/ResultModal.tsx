import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { COLORS } from "../constants/colors";
import LottieView from "lottie-react-native";
import correctLottie from "@/assets/lottie/correct.json";
import wrongLottie from "@/assets/lottie/wrong.json";
import useClientStore from "@/store/store";

interface ResultModalProps {
  visible: boolean;
  setResultModalVisible: (visible: boolean) => void;
  isCorrect: boolean;
}

export default function ResultModal({
  visible,
  setResultModalVisible,
  isCorrect,
}: ResultModalProps) {
  const { language } = useClientStore().getClientStatus();
  const { problemId } = useLocalSearchParams();

  const handleRetry = () => {
    setResultModalVisible(false);
  };

  const handleViewSolution = () => {
    setResultModalVisible(false);

    setTimeout(() => {
      router.replace(
        "/(tabs)/Home/Answer/" + encodeURIComponent(problemId as string)
      );
    }, 100);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={() => setResultModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <LottieView
            source={isCorrect ? correctLottie : wrongLottie}
            autoPlay={true}
            loop={false}
            style={styles.lottie}
          />
          <Text style={styles.resultText}>
            {isCorrect
              ? language === "한국어"
                ? "정답입니다!"
                : "Correct!"
              : language === "한국어"
                ? "틀렸습니다..."
                : "Incorrect..."}
          </Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={handleRetry}>
              <Text style={styles.buttonText}>
                {language === "한국어" ? "다시 풀기" : "Retry"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleViewSolution}
            >
              <Text style={styles.buttonText}>
                {language === "한국어" ? "풀이 보기" : "View Solution"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 320,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  lottie: {
    width: 150,
    height: 150,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
    color: COLORS.PRIMARY,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
