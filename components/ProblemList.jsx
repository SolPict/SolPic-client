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
                ? "/Answers/" + encodeURIComponent(problem["Key"])
                : "/Problems/" + encodeURIComponent(problem["Key"]);
            router.push(nextURL);
          };

          return (
            <TouchableOpacity
              key={problem["ETag"]}
              style={styles.problemContainer}
              onPress={handleGoNextPage}
            >
              <Image
                style={styles.problemImage}
                source={{
                  uri: process.env.EXPO_PUBLIC_S3_URL + problem["Key"],
                }}
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
