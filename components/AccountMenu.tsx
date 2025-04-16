import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import useClientStore from "@/store/store";
import { signOut } from "firebase/auth";
import { auth } from "@/auth/firebaseConfig";
import { router } from "expo-router";
import axios from "axios";
import { ERROR_MESSAGES } from "@/constants/error_messages";

export default function AccountMenu() {
  const [expanded, setExpanded] = useState(false);
  const { getClientStatus, setClientStatus } = useClientStore();
  const { isLogin, language } = getClientStatus();

  const handleLoginAndLogout = () => {
    signOut(auth);
    setClientStatus({ isLogin: true });

    Alert.alert(ERROR_MESSAGES.LOGOUT_SUCCESS[language]);
    setExpanded(false);
  };

  const handleDeleteAccount = () => {
    const currentUser = auth.currentUser;

    currentUser
      .delete()
      .then(async () => {
        Alert.alert(ERROR_MESSAGES.DELETE_SUCCESS[language]);

        await axios.delete(process.env.EXPO_PUBLIC_SERVER_URL + "users", {
          data: { email: currentUser.email },
        });
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(ERROR_MESSAGES.DELETE_ACCOUNT_FAIL[language]);
      })
      .finally(() => {
        setExpanded(false);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (!isLogin) {
            router.push("Login");
            return;
          }

          setExpanded(!expanded);
        }}
      >
        <MaterialIcons
          name={isLogin ? "logout" : "login"}
          size={28}
          color="black"
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.options}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.optionItem}
            onPress={handleLoginAndLogout}
          >
            <Text style={styles.SortingText}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.optionItem}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.SortingText}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    right: 20,
    position: "relative",
  },
  optionItem: {
    height: 40,
    justifyContent: "center",
  },
  options: {
    position: "absolute",
    backgroundColor: "white",
    width: 130,
    top: 40,
    right: -10,
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  SortingText: {
    fontSize: 20,
    opacity: 0.8,
  },
});
