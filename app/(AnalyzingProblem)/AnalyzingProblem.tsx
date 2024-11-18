import { AntDesign } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import rotateButton from "../../assets/rotate.png";
import useClientStore from "../../store/store";
import { useCallback, useState } from "react";
import NextButton from "../../components/NavigationButton";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

import { COLORS } from "../../constants/colors";
import LoadingLottie from "../../components/LoadingLottie";

export default function AnalyzingProblem() {
  const { image } = useLocalSearchParams();
  const imageInfo = JSON.parse(decodeURIComponent(image as string));
  const [imageURI, setImageURI] = useState("");
  const [isFocused, setIsFocused] = useState(true);
  const [problemInfo, setProblemInfo] = useState("");
  const { getClientStatus, setClientStatus } = useClientStore();
  const { email, loadingState } = getClientStatus();

  const rotate90andFlip = async () => {
    const rotatedImage = await manipulateAsync(imageURI, [{ rotate: -90 }], {
      compress: 1,
      format: SaveFormat.PNG,
    });
    setImageURI(rotatedImage.uri);
    imageInfo.uri = rotatedImage.uri;
  };

  const analyzeProblemImage = async () => {
    try {
      setClientStatus({ loadingState: "loading" });

      const formData = new FormData();

      formData.append("file", {
        uri: imageURI,
        name: imageInfo.fileName,
        type: imageInfo.mimeType,
      });

      const { data } = await axios.post(
        process.env.EXPO_PUBLIC_SUB_SERVER_URL + "problem/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Alert.alert("문제 분석이 완료되었습니다.");
      setProblemInfo(data);
    } catch (error) {
      Alert.alert("문제 분석하는데 문제가 발생하였습니다.");
    } finally {
      setClientStatus({ loadingState: "complete" });
    }
  };

  const goToAnswerPage = (): void => {
    router.push(`/Answers/${encodeURIComponent(JSON.parse(problemInfo).key)}`);

    setClientStatus({ loadingState: "pending" });
  };

  useFocusEffect(
    useCallback(() => {
      setImageURI(imageInfo.uri);
      setIsFocused(true);

      return () => {
        setIsFocused(false);
      };
    }, [imageInfo.uri])
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
        <NextButton onPressEvent={analyzeProblemImage} content="검색하기" />
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
