import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

interface SortingScrollButtonProps {
  sortType: string;
  setSortType: (sortType: string) => void;
}

export default function SortingScrollButton({
  sortType,
  setSortType,
}: SortingScrollButtonProps) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      {["전체보기", "수와 연산", "대수학", "기하학"].map((content) => {
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
    padding: 10,
    height: 36,
    justifyContent: "center",
    borderRadius: 15,
    marginHorizontal: 11.5,
    marginVertical: 10,
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
