import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import RedDot from "./RedDot";
import useClientStore from "@/store/store";
import alarmImage from "@/assets/bell.png";
import { Image } from "expo-image";
import LanguageSelector from "./LanguageSelector";
import AccountMenu from "./AccountMenu";

export default function () {
  const { setClientStatus, getClientStatus } = useClientStore();
  const { AnalyzedProblem } = getClientStatus();

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
      <AccountMenu />
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
