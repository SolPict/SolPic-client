import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import Slider from "@react-native-community/slider";
import CameraButton from "../components/CameraButton";
import { router } from "expo-router";

export default function Camera() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const [cameraProps, setCameraProps] = useState({
    zoom: 0,
    facing: "back",
    flash: "on",
    animateShutter: false,
    enableTorch: false,
  });
  const [image, setImage] = useState(null);
  const cameraRef = useRef();

  if (!cameraPermission || !mediaLibraryPermission) {
    return <View />;
  }

  if (
    !cameraPermission.granted ||
    mediaLibraryPermission.status !== "granted"
  ) {
    return (
      <View style={styles.container}>
        <Text>카메라에 대한 접근이 필요합니다.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestCameraPermission();
            requestMediaLibraryPermission();
          }}
        >
          <Text style={styles.buttonText}>접근 요청</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleProperty = (prop, option1, option2) => {
    setCameraProps((current) => ({
      ...current,
      [prop]: current[prop] === option1 ? option2 : option1,
    }));
  };

  const zoomIn = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.min(current.zoom + 0.01, 0.1),
    }));
  };

  const zoomOut = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.max(current.zoom - 0.01, 0),
    }));
  };

  const takePhoto = async () => {
    if (!cameraRef.current) {
      return;
    }
    try {
      const takedPhoto = await cameraRef.current.takePictureAsync();
      setImage(takedPhoto.uri);
    } catch (error) {
      console.error("사진찍는중 에러가 발생하였습니다.", error);
    }
  };

  const savePhoto = async () => {
    if (!image) {
      return;
    }

    try {
      const asset = await MediaLibrary.createAssetAsync(image);
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);

      setImage(null);

      Alert.alert("사진이 저장되었습니다!");

      router.push("AnalyzingProblem?image=" + assetInfo);
    } catch (error) {
      console.error("사진을 저장하는데 에러가 발생하였습니다", error);
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <View style={styles.topControlsContainer}>
            <CameraButton
              icon="flip-camera-ios"
              onPress={() => toggleProperty("facing", "front", "back")}
            />
            <CameraButton
              icon={cameraProps.flash === "on" ? "flash-on" : "flash-off"}
              onPress={() => toggleProperty("flash", "on", "off")}
            />
            <CameraButton
              icon="animation"
              color={cameraProps.animateShutter ? "white" : "#404040"}
              onPress={() => toggleProperty("animateShutter", true, false)}
            />
            <CameraButton
              icon={
                cameraProps.enableTorch ? "flashlight-on" : "flashlight-off"
              }
              onPress={() => toggleProperty("enableTorch", true, false)}
            />
          </View>
          <CameraView
            style={styles.camera}
            zoom={cameraProps.zoom}
            facing={cameraProps.facing}
            flash={cameraProps.flash}
            animateShutter={cameraProps.animateShutter}
            enableTorch={cameraProps.enableTorch}
            ref={cameraRef}
          />
          <View style={styles.sliderContainer}>
            <CameraButton icon="zoom-out" onPress={zoomOut} />
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={0.1}
              value={cameraProps.zoom}
              onValueChange={(value) =>
                setCameraProps((current) => ({ ...current, zoom: value }))
              }
              step={0.01}
            />
            <CameraButton icon="zoom-in" onPress={zoomIn} />
          </View>
          <View style={styles.bottomControlsContainer}>
            <CameraButton
              icon="circle"
              size={60}
              style={{ height: 60 }}
              onPress={takePhoto}
            />
          </View>
        </>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image }} style={styles.camera} />
          <View style={styles.bottomControlsContainer}>
            <CameraButton icon="arrow-back" onPress={() => setImage(null)} />
            <CameraButton icon="file-upload" onPress={savePhoto} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 0,
  },
  topControlsContainer: {
    height: 100,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderContainer: {
    position: "absolute",
    bottom: 170,
    left: 20,
    right: 20,
    flexDirection: "row",
  },
  previewContainer: {
    paddingTop: 100,
    backgroundColor: "black",
    height: "100%",
  },
  bottomControlsContainer: {
    height: 160,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
