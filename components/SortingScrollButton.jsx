import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { useState } from "react";

export default function SortingScrollButton() {
  const [focusedValue, setFocusedValue] = useState("전체보기");

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <Pressable
        onPress={() => setFocusedValue("전체보기")}
        style={[
          styles.sortingButton,
          focusedValue === "전체보기"
            ? styles.activatedButton
            : styles.deactivatedButton,
        ]}
      >
        <Text style={styles.sortingText}>전체보기</Text>
      </Pressable>
      <Pressable
        onPress={() => setFocusedValue("수와 연산")}
        style={[
          styles.sortingButton,
          focusedValue === "수와 연산"
            ? styles.activatedButton
            : styles.deactivatedButton,
        ]}
      >
        <Text style={styles.sortingText}>수와 연산</Text>
      </Pressable>
      <Pressable
        onPress={() => setFocusedValue("문자와 식")}
        style={[
          styles.sortingButton,
          focusedValue === "문자와 식"
            ? styles.activatedButton
            : styles.deactivatedButton,
        ]}
      >
        <Text style={styles.sortingText}>문자와 식</Text>
      </Pressable>
      <Pressable
        onPress={() => setFocusedValue("기하학")}
        style={[
          styles.sortingButton,
          focusedValue === "기하학"
            ? styles.activatedButton
            : styles.deactivatedButton,
        ]}
      >
        <Text style={styles.sortingText}>기하학</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sortingButton: {
    width: 100,
    marginVertical: 10,
    marginHorizontal: 7,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  activatedButton: {
    backgroundColor: "darkturquoise",
  },
  deactivatedButton: {
    backgroundColor: "silver",
  },
  sortingText: {
    fontSize: 20,
  },
});
