import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ProblemPage() {
  const { problemId } = useLocalSearchParams();

  return (
    <View>
      <Text>{problemId}번 문제 페이지 입니다.</Text>
    </View>
  );
}
