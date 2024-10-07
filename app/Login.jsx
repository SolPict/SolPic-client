import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "@firebase/auth";

import axios from "axios";
import { router } from "expo-router";

import { auth } from "../auth/firebaseConfig";
import useClientStore from "../store/store";
import { COLORS } from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [IsLoginPage, setIsLoginPage] = useState(true);
  const { setClientStatus } = useClientStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setClientStatus({ isLogin: true, email: currentUser.email });
      } else {
        setClientStatus({ isLogin: false, email: null });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (IsLoginPage) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);

        setClientStatus({ isLogin: true, email: email });
        await axios.post(process.env.EXPO_PUBLIC_SERVER_URL + "users", {
          email,
          history: [],
          reviewNote: [],
        });
      }

      router.push("/");
    } catch (error) {
      if (IsLoginPage) {
        Alert.alert("이미 존재하거나 올바르지 않은 형식입니다.");
      } else {
        Alert.alert("이미 존재하거나 올바르지 않은 형식입니다.");
      }
    }
  };

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.authContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push("/")}
            >
              <AntDesign name="close" size={28} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              {IsLoginPage ? "로그인" : "회원가입"}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.inputTitle}>이메일</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                autoCapitalize="none"
              />
            </View>
            <View>
              <Text style={styles.inputTitle}>비밀번호</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
              />
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Text
              style={styles.toggleText}
              onPress={() => setIsLoginPage(!IsLoginPage)}
            >
              {IsLoginPage ? "아이디가 없으신가요?" : "이미 회원이신가요?"}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAuthentication} style={styles.button}>
          <Text style={styles.buttonText}>
            {IsLoginPage ? "로그인" : "회원가입"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  authContainer: {
    width: "100%",
    height: "80%",
    maxWidth: 400,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  header: {
    width: "100%",
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: "-5%",
  },
  headerText: {
    left: 130,
    fontWeight: "700",
    fontSize: 16,
  },
  inputContainer: {
    top: 20,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderColor: "#dddddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    backgroundColor: COLORS.PRIMARY,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 10,
    bottom: 50,
    zIndex: 1,
  },
  button: {
    width: "100%",
    width: "100%",
    marginHorizontal: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  toggleText: {
    color: "#A7A7A7",
    textAlign: "right",
  },
  bottomContainer: {
    marginTop: 40,
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});
