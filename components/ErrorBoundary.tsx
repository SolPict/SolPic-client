import { View, Text, Button, StyleSheet } from "react-native";
import { type ErrorBoundaryProps } from "expo-router";
import { ERROR_MESSAGES, ErrorMessageKey } from "@/constants/error_messages";
import useClientStore from "@/store/store";
import { AxiosError } from "axios";

const statusToErrorKey: Record<number, ErrorMessageKey> = {
  400: ErrorMessageKey.NOT_MATH_PROBLEM,
  429: ErrorMessageKey.RATE_LIMIT_EXCEEDED,
  503: ErrorMessageKey.AI_SERVER_UNAVAILABLE,
  504: ErrorMessageKey.AI_TIMEOUT,
};

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const { getClientStatus } = useClientStore();
  const { language } = getClientStatus();
  const languageKey = language ? "KO" : "EN";

  const status = error instanceof AxiosError ? error.response.status : null;
  let userMessage = "알 수 없는 오류가 발생했습니다.";

  if (status && statusToErrorKey[status]) {
    const errorKey = statusToErrorKey[status];
    userMessage = ERROR_MESSAGES[errorKey][languageKey] ?? userMessage;
  } else if (status) {
    userMessage = "서버 오류가 발생했습니다.";
  } else {
    userMessage = "에러 상태 코드를 찾을 수 없습니다.";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>에러 발생</Text>
      <Text style={styles.message}>{userMessage}</Text>
      <Button title="다시 시도하기" onPress={retry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
    textAlign: "center",
  },
});
