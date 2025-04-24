import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import PasswordModal from "./PasswordModal";

export default function AccountMenu() {
  const [expanded, setExpanded] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { getClientStatus, setClientStatus } = useClientStore();
  const { isLogin, language } = getClientStatus();

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  const handleLoginAndLogout = () => {
    signOut(auth);
    setClientStatus({ isLogin: true });
    setExpanded(false);
  };

  const handleDeleteAccount = () => {
    setShowPasswordModal(true);
  };

  const confirmDeleteAccount = async () => {
    const currentUser = auth.currentUser;

    if (!passwordInput || !currentUser) {
      setErrorMessage("PASSWORD_REQUIRED");
      return;
    }

    const credential = EmailAuthProvider.credential(
      currentUser.email!,
      passwordInput
    );

    try {
      await reauthenticateWithCredential(currentUser, credential);
      await currentUser.delete();

      await axios.delete(`${process.env.EXPO_PUBLIC_SERVER_URL}users`, {
        params: { email: currentUser.email },
      });

      setClientStatus({ isLogin: false });
      router.replace("/");
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/wrong-password":
          setErrorMessage("WRONG_PASSWORD");
          break;
        case "auth/requires-recent-login":
          setErrorMessage("REAUTHENTICATION_REQUIRED");
          setShowPasswordModal(true);
          break;
        default:
          setErrorMessage("DELETE_ACCOUNT_FAIL");
      }
    } finally {
      setExpanded(false);
      setShowPasswordModal(false);
      setPasswordInput("");
    }
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
            <Text style={styles.SortingText}>
              {language === "한국어" ? "로그아웃" : "logOut"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.optionItem}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.SortingText}>
              {language === "한국어" ? "회원탈퇴" : "Delete Account"}
            </Text>
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
