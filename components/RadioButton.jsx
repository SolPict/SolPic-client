import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RadioButton({ selectedRadio, setSelectedRadio }) {
  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => setSelectedRadio(1)}>
        <View style={styles.wrapper}>
          <View style={styles.radio}>
            <View style={selectedRadio === 1 && styles.radioBackground}></View>
          </View>
          <Text style={styles.radioText}>1번</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedRadio(2)}>
        <View style={styles.wrapper}>
          <View style={styles.radio}>
            <View style={selectedRadio === 2 && styles.radioBackground}></View>
          </View>
          <Text style={styles.radioText}>2번</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedRadio(3)}>
        <View style={styles.wrapper}>
          <View style={styles.radio}>
            <View style={selectedRadio === 3 && styles.radioBackground}></View>
          </View>
          <Text style={styles.radioText}>3번</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedRadio(4)}>
        <View style={styles.wrapper}>
          <View style={styles.radio}>
            <View style={selectedRadio === 4 && styles.radioBackground}></View>
          </View>
          <Text style={styles.radioText}>4번</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedRadio(5)}>
        <View style={styles.wrapper}>
          <View style={styles.radio}>
            <View style={selectedRadio === 5 && styles.radioBackground}></View>
          </View>
          <Text style={styles.radioText}>5번</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  problemImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  main: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  radioText: {
    fontSize: 20,
    color: "black",
  },
  radio: {
    width: 40,
    height: 40,
    borderColor: "black",
    borderRadius: 20,
    borderWidth: 3,
    margin: 10,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioBackground: {
    backgroundColor: "black",
    height: 28,
    width: 28,
    margin: 3,
    borderRadius: 20,
  },
});
