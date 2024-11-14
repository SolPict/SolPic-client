import { CameraView, useCameraPermissions } from "expo-camera";
import { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import CameraHeader from "../components/CameraHeader";
import { AntDesign } from "@expo/vector-icons";
import CameraBottom from "../components/CameraBottom";

export default function Camera() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const cameraRef = useRef();

  useFocusEffect(
    useCallback(() => {
      if (image) {
        router.push("/AnalyzingProblem?image=" + encodeURIComponent(image));
        setImage(null);
      }
    }, [image])
  );

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text>카메라에 대한 접근이 필요합니다.</Text>
        <TouchableOpacity
          onPress={() => {
            requestCameraPermission();
          }}
        >
          <Text>접근 요청</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraHeader />
      <CameraView style={styles.camera} ref={cameraRef} />
      <AntDesign style={styles.plusMark} name="plus" size={40} color="white" />
      <CameraBottom setImage={setImage} cameraRef={cameraRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    flex: 1,
    alignItems: "center",
  },
  plusMark: {
    position: "absolute",
    bottom: 400,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});
