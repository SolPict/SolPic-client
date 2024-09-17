import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import CameraTopButton from "../components/CameraTopButton";
import CameraBottomButton from "../components/CameraBottomButton";

export default function Camera() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [cameraProps, setCameraProps] = useState({
    zoom: 0,
    active: true,
    facing: "back",
    flash: "off",
    animateShutter: false,
    enableTorch: false,
  });
  const [imageURI, setImageURI] = useState(null);
  const cameraRef = useRef();

  useFocusEffect(
    React.useCallback(() => {
      if (imageURI) {
        router.push(
          "/AnalyzingProblem?prevPage=Camera&imageURI=" +
            encodeURIComponent(imageURI)
        );
        setImageURI(null);
      }
      return () => {
        setCameraProps((current) => ({ ...current, active: false }));
      };
    }, [imageURI])
  );

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text>카메라에 대한 접근이 필요합니다.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestCameraPermission();
          }}
        >
          <Text style={styles.buttonText}>접근 요청</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraTopButton
        cameraProps={cameraProps}
        setCameraProps={setCameraProps}
      />
      <CameraView
        style={styles.camera}
        active={cameraProps.active}
        zoom={cameraProps.zoom}
        facing={cameraProps.facing}
        flash={cameraProps.flash}
        animateShutter={cameraProps.animateShutter}
        enableTorch={cameraProps.enableTorch}
        ref={cameraRef}
      />
      <CameraBottomButton
        cameraProps={cameraProps}
        setCameraProps={setCameraProps}
        setImageURI={setImageURI}
        cameraRef={cameraRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 0,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});
