import { ImageURISource, StyleSheet, View } from "react-native";
import logoImage from "@/assets/logo.png";
import { Image } from "expo-image";

export default function () {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={logoImage as ImageURISource}
        style={styles.logoImage}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: 100,
    height: 50,
  },
  logoImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    marginLeft: 24,
    top: 2,
  },
});
