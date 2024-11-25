import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { Text } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Suspense fallback={<Text>Loading....</Text>}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </Suspense>
  );
}
