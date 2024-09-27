import { router, Tabs } from "expo-router";
import TabBar from "../components/TabBar";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import useClientStore from "../store/store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../auth/firebaseConfig";
import { useEffect } from "react";

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
    <Tabs tabBar={(props) => <TabBar {...props} />}>
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
          headerShown: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLoginAndLogout}
              style={styles.logoutContainer}
            >
              <MaterialIcons
                style={styles.logoutButton}
                name={isLogin ? "logout" : "login"}
                size={24}
                color="black"
              />
              <Text>{isLogin ? "로그아웃" : "로그인"}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "메인으로",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLoginAndLogout}
              style={styles.logoutContainer}
            >
              <MaterialIcons
                style={styles.logoutButton}
                name={isLogin ? "logout" : "login"}
                size={24}
                color="black"
              />
              <Text>{isLogin ? "로그아웃" : "로그인"}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Problems"
        options={{
          title: "문제풀기",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLoginAndLogout}
              style={styles.logoutContainer}
            >
              <MaterialIcons
                style={styles.logoutButton}
                name={isLogin ? "logout" : "login"}
                size={24}
                color="black"
              />
              <Text>{isLogin ? "로그아웃" : "로그인"}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Camera"
        options={{
          title: "카메라",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="ProblemReviews"
        options={{
          title: "리뷰노트",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLoginAndLogout}
              style={styles.logoutContainer}
            >
              <MaterialIcons
                style={styles.logoutButton}
                name={isLogin ? "logout" : "login"}
                size={24}
                color="black"
              />
              <Text>{isLogin ? "로그아웃" : "로그인"}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="PastHistory"
        options={{
          title: "과거기록",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLoginAndLogout}
              style={styles.logoutContainer}
            >
              <MaterialIcons
                style={styles.logoutButton}
                name={isLogin ? "logout" : "login"}
                size={24}
                color="black"
              />
              <Text>{isLogin ? "로그아웃" : "로그인"}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    alignItems: "center",
    right: 10,
  },
});
