  import { CameraView, useCameraPermissions } from "expo-camera";
  import { useCallback, useRef, useState } from "react";
  import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
  import { router, useFocusEffect } from "expo-router";

  import { AntDesign } from "@expo/vector-icons";

  import CameraHeader from "@/components/CameraHeader";
  import CameraBottom from "@/components/CameraBottom";
  import useClientStore from "@/store/store";

  export default function Camera() {
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [image, setImage] = useState<string>("");
    const cameraRef = useRef<CameraView>(null);
    const { getClientStatus } = useClientStore();
    const { loadingState } = getClientStatus();

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

    useFocusEffect(
      useCallback(() => {
        if (image || loadingState === "loading") {
          router.replace(
            "/(tabs)/Camera/Preview?image=" + encodeURIComponent(image)
          );

          setImage("");
        }

        return () => setImage("");
      }, [image])
    );

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
      justifyContent: "center",
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
