import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Stack } from "expo-router";
import { Try } from "expo-router/build/views/Try";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Try catch={ErrorBoundary}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="Answer/[problemId]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </Try>
  );
}
