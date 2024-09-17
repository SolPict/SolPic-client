import { StyleSheet, View } from "react-native";
import CameraButton from "./CameraButton";
import Slider from "@react-native-community/slider";

export default function CameraBottomButton({
  cameraProps,
  setCameraProps,
  setImageURI,
  cameraRef,
}) {
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

      setImageURI(takedPhoto.uri);
    } catch (error) {
      console.error("사진찍는중 에러가 발생하였습니다.", error);
    }
  };

  return (
    <>
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
  );
}

const styles = StyleSheet.create({
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
  bottomControlsContainer: {
    height: 160,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
