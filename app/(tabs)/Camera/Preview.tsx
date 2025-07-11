import { AntDesign } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import rotateButton from "@/assets/rotate.png";
import useClientStore from "@/store/store";
import { useCallback, useState, useEffect } from "react";
import NextButton from "@/components/NavigationButton";
import {
  manipulateAsync,
  SaveFormat,
  useImageManipulator,
} from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

import { COLORS } from "@/constants/colors";
import LoadingLottie from "@/components/LoadingLottie";
import { ERROR_MESSAGES } from "@/constants/error_messages";
import getDeviceId from "@/utils/getDeviceId";

export default function AnalyzingProblem() {
  const { image } = useLocalSearchParams();
  const imageInfo = JSON.parse(decodeURIComponent(image as string));
  const [imageURI, setImageURI] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const { getClientStatus, setClientStatus } = useClientStore();
  const { loadingState, AnalyzedProblem, language } = getClientStatus();
  const context = useImageManipulator(imageURI);
  const languageKey = language ? "KO" : "EN";

  useEffect(() => {
    const resizeImage = async () => {
      const result = await manipulateAsync(
        imageInfo.uri,
        [{ resize: { width: 600 } }],
        { compress: 0.7, format: SaveFormat.JPEG }
      );

      if (!result.uri) {
        throw new Error("이미지 저장 실패");
      }

      const info = await FileSystem.getInfoAsync(result.uri);
      if (!info.exists) {
        throw new Error("파일이 존재하지 않습니다.");
      }

      setImageURI(result.uri);
    };

    if (imageInfo.uri) {
      resizeImage();
    }
  }, [imageInfo.uri]);

  const rotate90andFlip = async () => {
    context.rotate(-90);
    const image = await context.renderAsync();
    const result = await image.saveAsync({
      format: SaveFormat.JPEG,
    });

    setImageURI(result.uri);
  };

  const analyzeProblemImage = async () => {
    try {
      setClientStatus({ loadingState: "loading" });

      const baseURL = process.env.EXPO_PUBLIC_SERVER_URL;
      const deviceId = await getDeviceId();
      const formData = new FormData();
      formData.append("file", {
        uri: imageURI,
        name: "mathProblem.jpg",
        type: "image/jpeg",
      });

      const ocrRes = await axios.post(
        `${baseURL}problems/analyze/ocr`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const ocrText = ocrRes.data.ocr_text;
      const translateRes = await axios.post(
        `${baseURL}problems/analyze/translate`,
        {
          ocr_text: ocrText,
        }
      );

      const { translated_text } = translateRes.data;
      const solveRes = await axios.post(
        `${baseURL}problems/analyze/solve`,
        { problem: translated_text },
        {
          headers: {
            "Device-Id": deviceId || "unknown-device",
          },
        }
      );

      const aiExplanation = solveRes.data.ai_explanation;
      const reconstructRes = await axios.post(
        `${baseURL}problems/analyze/reconstruct`,
        {
          ai_explanation: aiExplanation,
        }
      );

      const koExplanation = reconstructRes.data.ko_explanation;
      const fileData = await FileSystem.readAsStringAsync(imageURI, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const submitRes = await axios.post(`${baseURL}problems/analyze/submit`, {
        file_base64: `data:image/jpeg;base64,${fileData}`,
        filename: "mathProblem.jpg",
        en_explanation: aiExplanation,
        ko_explanation: koExplanation,
        en_problem: translated_text,
      });

      Alert.alert(ERROR_MESSAGES.ANALYSIS_SUCCESS[languageKey]);

      setClientStatus({
        AnalyzedProblem: {
          key: submitRes.data.key,
          problemType: "기본",
          solvingCount: 1,
          correctCount: 0,
          ko_explanation: koExplanation,
          en_explanation: aiExplanation,
        },
        loadingState: "complete",
      });
    } catch (error) {
      console.log(error);
      setClientStatus({ loadingState: "pending" });
      throw error;
    }
  };

  const goToAnswerPage = (): void => {
    router.push(
      "/(tabs)/Home/Answer/" + encodeURIComponent(AnalyzedProblem.key)
    );

    setClientStatus({ loadingState: "pending", AnalyzedProblem: null });
  };

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => setIsFocused(false);
    }, [])
  );

  if (loadingState !== "pending") {
    return <LoadingLottie goToAnswerPage={goToAnswerPage} />;
  }

  return (
    <View style={styles.previewContainer}>
      <StatusBar style={isFocused ? "light" : "dark"} translucent={false} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/Camera")}
      >
        <AntDesign name="left" size={36} color="white" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {imageURI && (
          <Image
            source={{ uri: imageURI }}
            style={styles.uploadImage}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.rotateButton} onPress={rotate90andFlip}>
          <Image source={rotateButton} style={styles.rotateImage} />
        </TouchableOpacity>
        <NextButton
          onPressEvent={analyzeProblemImage}
          content={language === "한국어" ? "검색하기" : "Search"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
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
  backButton: {
    width: 60,
    height: 60,
    top: 60,
    left: 10,
    zIndex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  uploadImage: {
    resizeMode: "cover",
    width: "100%",
    height: "70%",
    bottom: 100,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: 150,
    marginHorizontal: 20,
  },
  rotateButton: {
    width: 50,
    height: 50,
    bottom: 230,
  },
  rotateImage: {
    resizeMode: "contain",
    width: 50,
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
