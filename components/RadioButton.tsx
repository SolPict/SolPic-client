import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";
import useClientStore from "@/store/store";

interface RadioButtonProps {
  selectedRadio: number;
  setSelectedRadio: (selectNumber: number) => void;
}

export default function RadioButton({
  selectedRadio,
  setSelectedRadio,
}: RadioButtonProps) {
  const { language } = useClientStore().getClientStatus();

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
            <Text
              style={styles.radioText}
            >{`${language === "한국어" ? number + "번" : "Option " + number}`}</Text>
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
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    height: 60,
  },
  radioText: {
    fontWeight: "400",
    fontSize: 18,
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
