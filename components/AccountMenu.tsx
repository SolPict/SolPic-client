import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import useClientStore from "@/store/store";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "@/auth/firebaseConfig";
import { router } from "expo-router";
import axios from "axios";
import { ERROR_MESSAGES } from "@/constants/error_messages";
import PasswordModal from "./PasswordModal";

export default function AccountMenu() {
  const [expanded, setExpanded] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { getClientStatus, setClientStatus } = useClientStore();
  const { isLogin, language } = getClientStatus();

  const handleLoginAndLogout = () => {
    signOut(auth);
    setClientStatus({ isLogin: true });

    Alert.alert(
      ERROR_MESSAGES.LOGOUT_SUCCESS[language === "한국어" ? "KO" : "EN"]
    );
    setExpanded(false);
  };

  const handleDeleteAccount = () => {
    setShowPasswordModal(true);
  };

  const confirmDeleteAccount = () => {
    const currentUser = auth.currentUser;

    if (!passwordInput || !currentUser) {
      Alert.alert("비밀번호를 입력해주세요.");
      return;
    }

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      passwordInput
    );

    reauthenticateWithCredential(currentUser, credential)
      .then(() => currentUser.delete())
      .then(async () => {
        Alert.alert(ERROR_MESSAGES.DELETE_SUCCESS[language === "한국어" ? "KO" : "EN"]);

        await axios.delete(`${process.env.EXPO_PUBLIC_SERVER_URL}users`, {
          params: { email: currentUser.email },
        });

        setClientStatus({ isLogin: false });
        router.replace("/");
      })
      .catch((error) => {
        console.error(error);

        if (error.code === "auth/wrong-password") {
          Alert.alert("비밀번호가 올바르지 않습니다.");
        } else if (error.code === "auth/requires-recent-login") {
          Alert.alert(
            "보안을 위해 다시 로그인해야 합니다.\n비밀번호를 입력해주세요."
          );
          setShowPasswordModal(true);
        } else {
          Alert.alert(ERROR_MESSAGES.DELETE_ACCOUNT_FAIL[language === "한국어" ? "KO" : "EN"]);
        }
      })
      .finally(() => {
        setExpanded(false);
        setShowPasswordModal(false);
        setPasswordInput("");
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

      <PasswordModal
        visible={showPasswordModal}
        password={passwordInput}
        setPassword={setPasswordInput}
        onCancel={() => setShowPasswordModal(false)}
        onConfirm={confirmDeleteAccount}
      />
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
