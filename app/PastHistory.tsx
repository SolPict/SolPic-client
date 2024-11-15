import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropDown from "../components/DropDown";
import { useCallback, useState } from "react";
import useClientStore from "../store/store";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";

export default function PastHistory() {
  const [historyList, setHistoryList] = useState([]);
  const { getClientStatus } = useClientStore();
  const { email } = getClientStatus();

  useFocusEffect(
    useCallback(() => {
      getHistory();
    }, [])
  );

  const getHistory = async () => {
    try {
      const { data } = await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URL + "problems/history",
        {
          email,
        }
      );

      setHistoryList(JSON.parse(data));
    } catch (error) {
      Alert.alert(error);
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <DropDown />
      <ScrollView style={styles.container}>
        {!historyList.length ||
          historyList.map(([createdDate, problem]) => {
            return (
              <TouchableOpacity
                key={problem._id.$oid}
                style={styles.problemContainer}
                onPress={() =>
                  router.push(
                    `/Answers/${problem._id.$oid}?answer=` +
                      encodeURIComponent(JSON.stringify(problem))
                  )
                }
              >
                <View style={styles.problemHeader}>
                  <Text style={styles.headerText}>{createdDate}</Text>
                </View>
                <Image
                  style={styles.problemImage}
                  source={{ uri: problem.uri }}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    gap: 10,
  },
  problemContainer: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
  },
  problemHeader: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 17,
  },
  problemImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
});
