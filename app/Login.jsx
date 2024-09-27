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

import { router } from "expo-router";
import useClientStore from "../store/store";
import { auth } from "../auth/firebaseConfig";
import axios from "axios";

export default function Login() {
  const { setClientStatus } = useClientStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IsLoginPage, setIsLoginPage] = useState(true);

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

        await axios.post(process.env.EXPO_PUBLIC_SERVER_URL + "users", {
          email,
          history: [],
          reviewNote: [],
        });
      }

      setClientStatus({ isLogin: true, email: email });
      router.push("/");
    } catch (error) {
      Alert.alert(error.message);
      console.error("Authentication error:", Object.values(error));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.authContainer}>
        <Text style={styles.title}>{IsLoginPage ? "로그인" : "회원가입"}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleAuthentication}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {IsLoginPage ? "로그인" : "회원가입"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Text
            style={styles.toggleText}
            onPress={() => setIsLoginPage(!IsLoginPage)}
          >
            {IsLoginPage
              ? "아이디가 없으신가요? 회원가입"
              : "이미 회원이신가요? 로그인"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  button: {
    marginHorizontal: 100,
    alignItems: "center",
    width: 50,
  },
  buttonText: {
    color: "#3498db",
  },
  toggleText: {
    color: "#3498db",
    textAlign: "center",
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});
