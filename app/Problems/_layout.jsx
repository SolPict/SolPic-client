import { router, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import useClientStore from "../../store/store";

export default function ProblemLayout() {
  const { setClientStatus, getClientStatus } = useClientStore();
  const { isLogin } = getClientStatus();

  const handleLoginAndLogout = () => {
    if (isLogin) {
      signOut(auth);
      setClientStatus({ isLogin: true });
    } else {
      router.push("/Login");
    }
  };

  return (
    <Stack>
      <Stack.Screen
        name="[problemId]"
        options={{
          headerTitle: "풀어보기",
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push("/")}
            >
              <AntDesign name="left" size={26} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLoginAndLogout}
              style={styles.logoutContainer}
            >
              <MaterialIcons
                style={styles.logoutButton}
                name={isLogin ? "logout" : "login"}
                size={28}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: 100,
    height: 50,
  },
  logoutContainer: {
    alignItems: "center",
    right: 8,
  },
  logoImage: {
    resizeMode: "center",
    width: "100%",
    height: "100%",
    marginLeft: 8,
    bottom: 1,
  },
});
