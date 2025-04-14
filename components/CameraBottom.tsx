import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import cameraImage from "../assets/photo_shot.png";
import CameraBottomGallery from "./CameraBottomGallery";
import { CameraView } from "expo-camera";
import { MutableRefObject } from "react";
import { Image } from "expo-image";
import useClientStore from "@/store/store";

interface CameraBottomProps {
  setImage: (image: string) => void;
  cameraRef: MutableRefObject<CameraView> | null;
}

export default function CameraBottom({
  setImage,
  cameraRef,
}: CameraBottomProps) {
  const { language } = useClientStore().getClientStatus();
  const takePhoto = async () => {
    if (!cameraRef?.current) {
      return;
    }

    try {
      const takedPhoto = await cameraRef.current.takePictureAsync();

      setImage(JSON.stringify(takedPhoto));
    } catch (error) {
      console.error(
        language === "한국어"
          ? "사진 찍는 중 에러가 발생하였습니다."
          : "An error occurred while taking a photo.",
        error
      );
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
