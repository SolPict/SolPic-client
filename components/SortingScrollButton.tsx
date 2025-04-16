import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import useClientStore from "@/store/store";

interface SortingScrollButtonProps {
  sortType: string;
  setSortType: (sortType: string) => void;
}

const categoryLabels = {
  한국어: ["전체보기", "수와 연산", "대수학", "기하학"],
  English: ["All", "Number & Operation", "Algebra", "Geometry"],
};

export default function SortingScrollButton({
  sortType,
  setSortType,
}: SortingScrollButtonProps) {
  const { clientStatus } = useClientStore();
  const selectedLanguage = clientStatus.language;
  const labels = categoryLabels[selectedLanguage];

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      {labels.map((content) => {
        return (
          <Pressable
            key={content}
            onPress={() => setSortType(content)}
            style={[
              styles.sortingButton,
              sortType === content
                ? styles.activatedButton
                : styles.deactivatedButton,
            ]}
          >
            <Text
              style={
                sortType === content
                  ? styles.activeSortingText
                  : styles.deactiveSortingText
              }
            >
              {content}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginHorizontal: 10,
  },
  sortingButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    height: 35,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  activatedButton: {
    backgroundColor: "black",
  },
  deactivatedButton: {
    backgroundColor: "white",
  },
  activeSortingText: {
    fontSize: 16,
    color: "white",
  },
  deactiveSortingText: {
    fontSize: 16,
  },
});
