import { StyleSheet, View, TouchableOpacity } from "react-native";
import cameraImage from "../assets/photo_shot.png";
import CameraBottomGallery from "./CameraBottomGallery";
import { CameraView } from "expo-camera";
import { MutableRefObject, useState } from "react";
import { Image } from "expo-image";

interface CameraBottomProps {
  setImage: (image: string) => void;
  cameraRef: MutableRefObject<CameraView> | null;
}

export default function CameraBottom({
  setImage,
  cameraRef,
}: CameraBottomProps) {
  const [errorMessage, setErrorMessage] = useState("");

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  const takePhoto = async () => {
    if (!cameraRef.current) {
      return;
    }

    try {
      const takedPhoto = await cameraRef.current.takePictureAsync();
      setImage(JSON.stringify(takedPhoto));
    } catch (error) {
      console.error(error);
      setErrorMessage("PHOTO_CAPTURE_FAIL");
    }
  };

  return (
    <View style={styles.bottomContainer}>
      <CameraBottomGallery />
      <TouchableOpacity style={styles.buttonOuter} onPress={takePhoto}>
        <View style={styles.buttonInner}>
          <Image
            style={styles.photoShotImage}
            source={cameraImage}
            contentFit="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOuter: {
    position: "absolute",
    bottom: 77,
    backgroundColor: "black",
    width: 67,
    height: 67,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
  buttonInner: {
    backgroundColor: "white",
    width: 55,
    height: 55,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  photoShotImage: {
    position: "absolute",
    resizeMode: "cover",
    width: 20,
    height: 20,
  },
});
