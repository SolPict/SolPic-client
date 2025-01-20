import { Tabs } from "expo-router";
import { useEffect } from "react";
import useClientStore from "@/store/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/auth/firebaseConfig";
import TabBar from "@/components/TabBar";
import HeaderLeftLogo from "@/components/HeaderLeftLogo";
import HeaderRightLogo from "@/components/HeaderRightLogo";

export default function TabLayout() {
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
            headerLeft: HeaderLeftLogo,
            headerRight: HeaderRightLogo,
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
            headerLeft: HeaderLeftLogo,
            headerRight: HeaderRightLogo,
          }}
        />
      </Tabs>
    </>
  );
}
