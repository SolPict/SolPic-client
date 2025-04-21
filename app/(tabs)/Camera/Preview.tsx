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

import { COLORS } from "@/constants/colors";
import LoadingLottie from "@/components/LoadingLottie";
import { ERROR_MESSAGES } from "@/constants/error_messages";

export default function AnalyzingProblem() {
  const { image } = useLocalSearchParams();
  const imageInfo = JSON.parse(decodeURIComponent(image as string));
  const [imageURI, setImageURI] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { getClientStatus, setClientStatus } = useClientStore();
  const { loadingState, AnalyzedProblem, language } = getClientStatus();
  const context = useImageManipulator(imageURI);
  const languageKey = language ? "KO" : "EN";

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  useEffect(() => {
    const resizeImage = async () => {
      const result = await manipulateAsync(
        imageInfo.uri,
        [{ resize: { width: 600 } }],
        {
          compress: 0.7,
          format: SaveFormat.JPEG,
        }
      );
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

      Alert.alert(ERROR_MESSAGES.ANALYSIS_SUCCESS[languageKey]);

      setClientStatus({
        AnalyzedProblem: { ...data },
        loadingState: "complete",
      });
    } catch (error) {
      const status = error.response.status;

      let errorKey = "OCR_FAIL";

      switch (status) {
        case 400:
          errorKey = "NOT_MATH_PROBLEM";
          break;
        case 503:
          errorKey = "AI_SERVER_UNAVAILABLE";
          break;
        case 504:
          errorKey = "AI_TIMEOUT";
          break;
        default:
          errorKey = "OCR_FAIL";
      }

      setErrorMessage(errorKey);
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
