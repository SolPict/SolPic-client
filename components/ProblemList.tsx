import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import defaultImage from "@/assets/defaultImage.png";

interface ProblemListType {
  problems: Array<string>;
  isLoading: Boolean;
  prevPage: String;
  offset: Number;
  getProblemsList: () => void;
}

interface ProblemInfoType {
  ETag: string;
  Key: string;
  LastModified: {
    date: Date;
  };
  Owner: {
    ID: string;
  };
  Size: number;
  StorageClass: string;
}

export default function ProblemList({
  problems,
  isLoading,
  prevPage,
  offset,
  getProblemsList,
}: ProblemListType) {
  const [offsetY, setOffsetY] = useState<number>();
  const scrollRef = useRef<FlatList>(null);

  const onEndReached = () => {
    if (!isLoading && offset) {
      getProblemsList();
    }
  };

  useFocusEffect(
    useCallback(() => {
      scrollRef.current.scrollToOffset({ offset: offsetY, animated: true });
    }, [])
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;

    setOffsetY(contentOffset.y);
  };

  const renderItem = ({ item }: { item: ProblemInfoType }) => {
    const handleGoNextPage = () => {
      const nextURL =
        prevPage === "home"
          ? "/(tabs)/Home/Answer/" + encodeURIComponent(item["Key"])
          : "/(tabs)/ReviewNote/Problem/" + encodeURIComponent(item["Key"]);
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
          contentFit="contain"
          placeholder={defaultImage}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ref={scrollRef}
      style={styles.container}
      data={problems}
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
  },
});
