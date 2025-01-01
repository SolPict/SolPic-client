import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/COLORS";

interface RadioButtonProps {
  selectedRadio: number;
  setSelectedRadio: (selectNumber: number) => void;
}

export default function RadioButton({
  selectedRadio,
  setSelectedRadio,
}: RadioButtonProps) {
  return (
    <View style={styles.main}>
      {[1, 2, 3, 4, 5].map((number) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.radioContainer}
            onPress={() => setSelectedRadio(number)}
            key={number}
          >
            <Text style={styles.radioText}>{number}번</Text>
            <View style={styles.wrapper}>
              <View style={styles.radio}>
                <View
                  style={selectedRadio === number && styles.radioBackground}
                ></View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    height: 60,
  },
  radioText: {
    fontSize: 16,
    color: "black",
  },
  radio: {
    width: 25,
    height: 25,
    borderRadius: 20,
    margin: 10,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    alignItems: "center",
  },
  radioBackground: {
    backgroundColor: "white",
    height: 10,
    width: 10,
    margin: 3,
    borderRadius: 20,
  },
});
