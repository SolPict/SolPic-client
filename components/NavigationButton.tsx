import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";

interface NavigationButtonProps {
  content: string;
  onPressEvent: () => void;
}

export default function NavigationButton({
  content,
  onPressEvent,
}: NavigationButtonProps) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPressEvent}>
      <Text style={styles.buttonText}>{content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
});
