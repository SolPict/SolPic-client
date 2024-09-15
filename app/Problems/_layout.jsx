import { Stack } from "expo-router";

export default function ProblemLayout() {
  return (
    <Stack>
      <Stack.Screen name="Problems" options={{ headerTitle: "문제풀기" }} />
      <Stack.Screen name="[problemId]" options={{ headerTitle: "풀어보기" }} />
    </Stack>
  );
}
