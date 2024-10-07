import { AntDesign } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import rotateButton from "../../assets/rotate.png";
import useClientStore from "../../store/store";
import { useCallback, useState } from "react";
import NextButton from "../../components/NextButton";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

import { COLORS } from "../../constants/colors";
import LoadingLottie from "../../components/LoadingLottie";

export default function AnalyzingProblem() {
  const { image } = useLocalSearchParams();
  const imageInfo = JSON.parse(decodeURIComponent(image));
  const [imageURI, setImageURI] = useState("");
  const [isFocused, setIsFocused] = useState(true);
  const [problemInfo, setProblemInfo] = useState({});
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
        name: "analyze_image.jpg",
        type: imageInfo.mimeType,
      });

      const { data } = await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URL + "problem/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            email: email || "",
            uri: imageURI,
          },
        }
      );
      Alert.alert("문제 분석이 완료되었습니다.");
      setProblemInfo(data);
    } catch (error) {
      const mockData = {
        _id: "66cdb7d25aacdb0bbae3e" + Math.floor(Math.random() * 100),
        uri: imageURI,
        explanation:
          "문제를 해결하려면 상수의 값을 결정해야 합니다.$a$ 주어진$x = k$ 는 이차 방정식의 근입니다.$4x^2 - (3a + 2)x - 4 = 0$ 그리고$k - \\frac{1}{k} = a$.1. **대체$x = k$ 를 이차 방정식으로 바꾸면 다음과 같습니다.   이차 방정식이 주어집니다:   $   4x^2 - (3a + 2)x - 4 = 0   $   그리고$x = k$ 가 루트라면$x = k$ 를 방정식에 추가합니다:   $   4k^2 - (3a + 2)k - 4 = 0   $2. **Express$k^2 + \\frac{1}{k^2}$ 측면에서$a$:**   우리에게 주어진 일입니다:   $   k - \\frac{1}{k} = a   $   방정식의 양쪽을 제곱하면 다음과 같은 결과가 나옵니다:   $   \\left(k - \\frac{1}{k}\\right)^2 = a^2   $   왼쪽을 확장합니다:   $   k^2 - 2 + \\frac{1}{k^} = a^2   $   용어를 다시 정리해 보면 다음과 같습니다:   $   k^ + \\frac{1}{k^} = a^2 + 2   $3. **대체$k^ + \\frac{1}{k^}$ 를 다시 이차 방정식으로 바꾸면 다음과 같습니다.   이차 방정식에서 우리는 다음과 같은 결과를 얻었습니다:   $   6k^ - (3a + 2)k - 4 = 0   $   에 대한 표현식 사용$k^ + \\frac{1}{k^}$로 대체합니다.$k^ + \\frac{1}{k^} = a^2 + 2$:   $   6k^ - (3a^2 + 2)k - 4 = 0   $4. **해결 대상$a$:**   이후$k$ 가 근이라면 방정식은 참이어야 합니다. 다음과 같이 풀 수 있습니다.$a$ 의 이차 방정식 계수를 0과 동일시합니다:   $   6k^ - (3a^2 - 2)k - 4 = 0   $   이는 다음을 의미합니다:$   6k^ - (33a^2 + 12)k - 4 = 00   $   계수를$k$ 그리고 상수라는 용어를 얻게 됩니다:   $   6 = 3a + 2   $   해결 대상$a$:   $   6 = 33a + 2   $   $   6 = 33a + 2   $   $   6 = 3a + 2   $   $ 6 = 3a + 2 $ $ 6 = 3a + 2 $ 5. **결론:** 상수의 값$a$ 입니다: $ \\boxed{3} $",
      };

      router.push(
        `/Answers/${mockData._id}?answer=` +
          encodeURIComponent(JSON.stringify(mockData))
      );
    } finally {
      setClientStatus({ loadingState: "complete" });
    }
  };

  const goToAnswerPage = () => {
    router.push(
      `/Answers/${JSON.parse(problemInfo)._id.$oid}?answer=` +
        encodeURIComponent(problemInfo)
    );

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
