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
  FlipType,
  manipulateAsync,
  SaveFormat,
  useImageManipulator,
} from "expo-image-manipulator";

import { COLORS } from "@/constants/colors";
import LoadingLottie from "@/components/LoadingLottie";
import { ERROR_MESSAGES } from "@/constants/error_messages";

export default function AnalyzingProblem() {
  const { image } = useLocalSearchParams();
  const imageInfo = JSON.parse(decodeURIComponent(image as string));
  const [imageURI, setImageURI] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const { getClientStatus, setClientStatus } = useClientStore();
  const { loadingState, AnalyzedProblem, language } = getClientStatus();
  const context = useImageManipulator(imageURI);

  useEffect(() => {
    const resizeImage = async () => {
      try {
        const result = await manipulateAsync(
          imageInfo.uri,
          [{ resize: { width: 600 } }],
          {
            compress: 0.7,
            format: SaveFormat.JPEG,
          }
        );
        setImageURI(result.uri);
      } catch (error) {
        console.error("이미지 리사이징에 실패하셨습니다.", error);
      }
    };

    if (imageInfo?.uri) {
      resizeImage();
    }
  }, [imageInfo?.uri]);

  const rotate90andFlip = async () => {
    try {
      context.rotate(-90);
      const image = await context.renderAsync();
      const result = await image.saveAsync({
        format: SaveFormat.JPEG,
      });

      setImageURI(result.uri);
    } catch (error) {
      console.error("이미지 회전 실패", error);
    }
  };

  const analyzeProblemImage = async () => {
    try {
      setClientStatus({ loadingState: "loading" });

      const formData = new FormData();
      formData.append("file", {
        uri: imageURI,
        name: "mathProblem.jpg",
        type: "image/jpeg",
      });

      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}problem/analyze`,
        formData
      );

      Alert.alert(
        language === "한국어"
          ? ERROR_MESSAGES.ANALYSIS_SUCCESS.KO
          : ERROR_MESSAGES.ANALYSIS_SUCCESS.EN
      );

      setClientStatus({
        AnalyzedProblem: { ...data },
        loadingState: "complete",
      });
    } catch (error: any) {
      const status = error?.response?.status;
      const detail = error?.response?.data?.detail;

      if (status === 400 && detail?.error === "수학 이미지가 아닙니다.") {
        Alert.alert(
          language === "한국어"
            ? ERROR_MESSAGES.NOT_MATH_PROBLEM.KO
            : ERROR_MESSAGES.NOT_MATH_PROBLEM.EN
        );
      } else if (status === 503) {
        Alert.alert(
          language === "한국어"
            ? ERROR_MESSAGES.AI_SERVER_UNAVAILABLE.KO
            : ERROR_MESSAGES.AI_SERVER_UNAVAILABLE.EN
        );
      } else if (status === 504) {
        Alert.alert(
          language === "한국어"
            ? ERROR_MESSAGES.AI_TIMEOUT.KO
            : ERROR_MESSAGES.AI_TIMEOUT.EN
        );
      } else {
        Alert.alert(
          language === "한국어"
            ? ERROR_MESSAGES.OCR_FAIL.KO
            : ERROR_MESSAGES.OCR_FAIL.EN
        );
      }

      setClientStatus({ loadingState: "pending" });
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
