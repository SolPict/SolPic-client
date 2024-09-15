import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "메인으로",
        }}
      />
      <Tabs.Screen
        name="Problems"
        options={{
          title: "문제풀기",
          headerShown: false,
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
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="PastHistory"
        options={{
          title: "과거기록",
        }}
      />
    </Tabs>
  );
}
