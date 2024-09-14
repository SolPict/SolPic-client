import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";

export default function RootLayout() {
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
        }}
      />
      <Tabs.Screen
        name="Camera"
        options={{
          title: "카메라",
        }}
      />
      <Tabs.Screen
        name="ReviewNote"
        options={{
          title: "리뷰노트",
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          title: "과거기록",
        }}
      />
    </Tabs>
  );
}
