import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import useClientStore from "@/store/store";

const languages: { value: "한국어" | "English"; label: string }[] = [
  { value: "한국어", label: "🇰🇷 한국어" },
  { value: "English", label: "🇺🇸 English" },
];

export default function LanguageSelector() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { clientStatus, setClientStatus } = useClientStore();
  const selectedLanguage = clientStatus.language;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.SortingButton}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.9}
      >
        <Text style={styles.SortingText}>
          {selectedLanguage === "한국어" ? "🇰🇷 한국어" : "🇺🇸 English"}
        </Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.options}>
          <FlatList
            keyExtractor={(item) => item.value}
            data={languages}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.optionItem}
                onPress={() => {
                  setExpanded(false);
                  setClientStatus({ language: item.value });
                }}
              >
                <Text style={styles.SortingText}>{item.label}</Text>
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
    marginRight: 50,
  },
  optionItem: {
    height: 40,
    justifyContent: "center",
  },
  options: {
    position: "absolute",
    backgroundColor: "white",
    width: 120,
    top: 50,
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  SortingText: {
    fontSize: 20,
  },
  SortingButton: {
    height: 50,
    width: 120,
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
