import { router, Tabs } from "expo-router";
import React, { useEffect } from "react";
import {
  Alert,
  Image,
  ImageURISource,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import logoImage from "@/assets/logo.png";
import alarmImage from "@/assets/bell.png";
import useClientStore from "@/store/store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/auth/firebaseConfig";
import TabBar from "@/components/TabBar";
import RedDot from "@/components/RedDot";

export default function TabLayout() {
  const { setClientStatus, getClientStatus } = useClientStore();
  const { isLogin, loadingState, AnalyzedProblem } = getClientStatus();

  const handleLoginAndLogout = () => {
    if (isLogin) {
      signOut(auth);
      setClientStatus({ isLogin: true });
    } else {
      router.push("Login");
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
      <Tabs
        tabBar={({ state, descriptors, navigation, insets }) => (
          <TabBar
            state={state}
            descriptors={descriptors}
            navigation={navigation}
            insets={insets}
          />
        )}
      >
        <Tabs.Screen
          name="Home"
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
              <>
                <TouchableOpacity
                  onPress={() => {
                    if (!AnalyzedProblem) {
                      return;
                    }

                    router.push(
                      "/(tabs)/Home/Answer/" +
                        encodeURIComponent(AnalyzedProblem.key)
                    );

                    setClientStatus({ loadingState: "pending" });
                    setClientStatus({ AnalyzedProblem: null });
                  }}
                  style={styles.alarmContainer}
                >
                  <Image source={alarmImage} style={styles.alarmImage}></Image>
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
            ),
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
          name="ReviewNote"
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
              <>
                <TouchableOpacity
                  onPress={() => {
                    if (!AnalyzedProblem) {
                      return;
                    }

                    router.push(
                      "/(tabs)/Home/Answer/" +
                        encodeURIComponent(AnalyzedProblem.key)
                    );

                    setClientStatus({ loadingState: "pending" });
                    setClientStatus({ AnalyzedProblem: null });
                  }}
                  style={styles.alarmContainer}
                >
                  <Image source={alarmImage} style={styles.alarmImage}></Image>
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
            ),
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
