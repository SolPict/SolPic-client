import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ProblemList({
  problems,
  isLoading,
  prevPage,
  offset,
  getProblemsList,
}) {
  const [offsetY, setOffsetY] = useState();
  const scrollRef = useRef();

  const onEndReached = () => {
    if (!isLoading && offset) {
      getProblemsList();
    }
  };

  useFocusEffect(
    useCallback(() => {
      scrollRef.current.scrollToOffset({ offset: offsetY, animated: true });
    }, [offsetY])
  );

  const onScroll = (event) => {
    const { contentOffset } = event.nativeEvent;

    setOffsetY(contentOffset.y);
  };

  const renderItem = ({ item }) => {
    const handleGoNextPage = () => {
      const nextURL =
        prevPage === "home"
          ? "/Answers/" + encodeURIComponent(item["Key"])
          : "/Problems/" + encodeURIComponent(item["Key"]);
      router.push(nextURL);
    };

    return (
      <TouchableOpacity
        style={styles.problemContainer}
        onPress={handleGoNextPage}
      >
        <Image
          style={styles.problemImage}
          source={{
            uri: process.env.EXPO_PUBLIC_S3_URL + item["Key"],
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ref={scrollRef}
      style={styles.container}
      data={problems}
      contentOffset={{ y: offsetY }}
      renderItem={renderItem}
      keyExtractor={(item) => item["Key"]}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
      onScroll={onScroll}
      ListFooterComponent={isLoading && <ActivityIndicator />}
    />
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
