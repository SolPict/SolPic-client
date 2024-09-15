import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CameraButton({ icon, size, color, style, onPress }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <MaterialIcons name={icon} size={size || 28} color={color || "#f1f1f1"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
