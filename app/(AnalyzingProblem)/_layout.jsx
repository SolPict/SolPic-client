import { Stack } from "expo-router";

export default function ProblemReviewLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="AnalyzingProblem"
        options={{
          headerTitle: "이미지 분석",
          headerShown: false,
        }}
      />
      <Stack.Screen name="[problemId]" options={{ headerTitle: "다시풀기" }} />
    </Stack>
  );
}
