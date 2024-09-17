import { Link, router } from "expo-router";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Home() {
  const uploadImage = async () => {
    const { assets } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    router.push(
      "/AnalyzingProblem?imageURI=" + encodeURIComponent(assets[0].uri)
    );
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Sol.Pic</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={uploadImage}>
        <Text style={styles.buttonText}>사진 업로드</Text>
      </TouchableOpacity>
      <Link href="/Problems" asChild>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>문제 풀기</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    height: "100%",
    gap: 30,
  },
  title: {
    marginTop: 100,
    marginBottom: 80,
    fontSize: 110,
    fontWeight: "200",
  },
  buttonContainer: {
    backgroundColor: "#a5d8ff",
    width: 300,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  buttonText: {
    fontSize: 30,
  },
});
