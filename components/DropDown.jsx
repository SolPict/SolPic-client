import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

export default function DropDown() {
  const [expanded, setExpanded] = useState(false);
  const [sortedText, setSortedText] = useState();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.SortingButton}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.9}
      >
        <Text style={styles.SortingText}>{sortedText || "기록정렬 선택"}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.options}>
          <FlatList
            keyExtractor={(item) => item.value}
            data={[
              { value: "최신순", label: "최신순" },
              { value: "오래된순", label: "오래된순" },
              { value: "정답순", label: "정답순" },
              { value: "오답순", label: "오답순" },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.optionItem}
                onPress={() => {
                  setExpanded(false);
                  setSortedText(item.value);
                }}
              >
                <Text style={styles.SortingText}>{item.value}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: "relative",
    opacity: 0.8,
  },
  optionItem: {
    height: 40,
    justifyContent: "center",
  },
  options: {
    position: "absolute",
    backgroundColor: "silver",
    width: 150,
    top: 53,
    marginHorizontal: 10,
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  SortingText: {
    fontSize: 20,
    opacity: 0.8,
  },
  SortingButton: {
    height: 50,
    width: 150,
    backgroundColor: "silver",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
