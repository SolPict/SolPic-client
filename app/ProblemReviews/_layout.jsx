import { Stack } from "expo-router";

export default function ProblemReviewLayout() {
  return (
    <Stack>
      <Stack.Screen name="ReviewNote" options={{ headerTitle: "리뷰노트" }} />
      <Stack.Screen name="[problemId]" options={{ headerTitle: "다시풀기" }} />
    </Stack>
  );
}
