import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function ProblemList({ problems, prevPage }) {
  return (
    <ScrollView style={styles.container}>
      {!problems.length ||
        problems.map((problem) => {
          const handleGoNextPage = () => {
            const nextURL =
              prevPage === "home"
                ? `/Answers/${problem._id.$oid}?answer=`
                : `/Problems/${problem._id.$oid}?problem=`;

            router.push(nextURL + encodeURIComponent(JSON.stringify(problem)));
          };

          return (
            <TouchableOpacity
              key={problem._id.$oid}
              style={styles.problemContainer}
              onPress={handleGoNextPage}
            >
              <Image
                style={styles.problemImage}
                source={{ uri: problem.uri }}
              />
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: "100%",
    height: "85%",
    bottom: 20,
  },
  problemContainer: {
    backgroundColor: "white",
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  problemImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    resizeMode: "contain",
  },
});
