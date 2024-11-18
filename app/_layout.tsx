import { router, Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, ImageURISource, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";

import { auth } from "../auth/firebaseConfig";
import TabBar from "../components/TabBar";
import useClientStore from "../store/store";

import logoImage from "../assets/logo.png";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
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

  return (
    <>
      <StatusBar style="dark" translucent={false} />
      <Tabs
        tabBar={({ state, descriptors, navigation }) => (
          <TabBar
            state={state}
            descriptors={descriptors}
            navigation={navigation}
          />
        )}
      >
        <Tabs.Screen
          name="(AnalyzingProblem)"
          options={{
            title: "이미지 분석",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Answers/[problemId]"
          options={{
            title: "문제 풀이",
            headerTitle: "",
            headerLeft: () => (
              <View style={styles.logoContainer}>
                <View style={styles.logoContainer}>
                  <Image source={logoImage} style={styles.logoImage} />
                </View>
              </View>
            ),
            headerRight: () => (
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
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "홈",
            headerTitle: "",
            headerLeft: () => (
              <View style={styles.logoContainer}>
                <Image
                  source={logoImage as ImageURISource}
                  style={styles.logoImage}
                />
              </View>
            ),
            headerRight: () => (
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
            ),
          }}
        />
        <Tabs.Screen
          name="Problems"
          options={{
            title: "문제 풀이",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Camera"
          options={{
            title: "카메라",
            headerTitle: "",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="ProblemReviews"
          options={{
            title: "리뷰노트",
            headerTitle: "",
            headerLeft: () => (
              <View style={styles.logoContainer}>
                <Image
                  source={logoImage as ImageURISource}
                  style={styles.logoImage}
                />
              </View>
            ),
            headerRight: () => (
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
            ),
          }}
        />
        <Tabs.Screen
          name="PastHistory"
          options={{
            title: "과거기록",
            headerTitle: "",
            headerLeft: () => (
              <View style={styles.logoContainer}>
                <Image
                  source={logoImage as ImageURISource}
                  style={styles.logoImage}
                />
              </View>
            ),
            headerRight: () => (
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
            ),
          }}
        />
        <Tabs.Screen
          name="Login"
          options={{
            headerTitle: "",
            title: "로그인",
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: 100,
    height: 50,
  },
  logoutContainer: {
    alignItems: "center",
    right: 24,
  },
  logoImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    marginLeft: 24,
    top: 2,
  },
});
