import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

export default function CameraHeader() {
  return (
    <TouchableOpacity
      style={styles.cameraHeader}
      onPress={() => router.push("/")}
    >
      <AntDesign name="close" size={36} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cameraHeader: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: 60,
    height: 60,
    top: 50,
    left: 0,
    zIndex: 1,
  },
});
