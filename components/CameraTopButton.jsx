import { StyleSheet, View } from "react-native";
import CameraButton from "./CameraButton";

export default function CameraTopButton({ cameraProps, setCameraProps }) {
  const toggleProperty = (prop, option1, option2) => {
    setCameraProps((current) => ({
      ...current,
      [prop]: current[prop] === option1 ? option2 : option1,
    }));
  };

  return (
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
        icon={cameraProps.enableTorch ? "flashlight-on" : "flashlight-off"}
        onPress={() => toggleProperty("enableTorch", true, false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topControlsContainer: {
    height: 100,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
