import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import RedDot from "./RedDot";
import useClientStore from "@/store/store";
import alarmImage from "@/assets/bell.png";
import { signOut } from "firebase/auth";
import { auth } from "@/auth/firebaseConfig";
import { Image } from "expo-image";
import LanguageSelector from "./LanguageSelector";

export default function () {
  const { setClientStatus, getClientStatus } = useClientStore();
  const { isLogin, AnalyzedProblem, language } = getClientStatus();

  const handleAlarmPress = () => {
    if (!AnalyzedProblem) {
      return;
    }

    router.push(
      "/(tabs)/Home/Answer/" + encodeURIComponent(AnalyzedProblem.key)
    );

    setClientStatus({ loadingState: "pending" });
    setClientStatus({ AnalyzedProblem: null });
  };

  const handleLoginAndLogout = () => {
    if (isLogin) {
      signOut(auth);
      setClientStatus({ isLogin: true });
      Alert.alert(
        language === "한국어"
          ? "정상적으로 로그아웃 되었습니다."
          : "Successfully logged out."
      );
    } else {
      router.push("Login");
    }
  };

  return (
    <>
      <LanguageSelector />
      <TouchableOpacity
        onPress={handleAlarmPress}
        style={styles.alarmContainer}
      >
        <Image
          source={alarmImage}
          style={styles.alarmImage}
          contentFit="contain"
        ></Image>
        {AnalyzedProblem && <RedDot></RedDot>}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLoginAndLogout}
        style={styles.logoutContainer}
      >
        <MaterialIcons
          name={isLogin ? "logout" : "login"}
          size={28}
          color="black"
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    alignItems: "center",
    right: 24,
  },
  alarmContainer: {
    alignItems: "center",
    right: 24,
  },
  alarmImage: {
    resizeMode: "contain",
    width: "110%",
    height: "110%",
    marginRight: 24,
  },
});
