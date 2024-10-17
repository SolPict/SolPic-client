import { Fontisto } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import focusInHome from "../assets/home_focus.png";
import focusOutHome from "../assets/home_not_focus.png";
import focusInReview from "../assets/review_focus.png";
import focusOutReview from "../assets/review_not_focus.png";
import { COLORS } from "../constants/colors";
import { EXCEPT_PAGES } from "../constants/exceptPages";

export default function TabBar({ state, descriptors, navigation }) {
  if (Object.values(EXCEPT_PAGES).includes(state.index)) {
    return;
  }

  const icons = {
    index: (focused) => (
      <Image
        source={focused ? focusInHome : focusOutHome}
        style={[styles.tabImages, { width: "50%" }]}
      />
    ),
    Camera: () => (
      <View style={styles.cameraContainer}>
        <Fontisto name="camera" size={24} color={"white"} />
      </View>
    ),
    ProblemReviews: (focused) => (
      <Image
        source={focused ? focusInReview : focusOutReview}
        style={styles.tabImages}
      />
    ),
  };
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        if (!["index", "Camera", "ProblemReviews"].includes(route.name)) {
          return;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabBarItem}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
          >
            <View style={styles.tabContainer}>
              {icons[route.name](isFocused)}
              <Text style={styles.tabText}>{label !== "카메라" && label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    width: 355,
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 23,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabBarItem: {
    height: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
  tabContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: "100%",
    gap: 5,
  },
  tabImages: {
    resizeMode: "contain",
    width: "60%",
    height: "100%",
  },
  tabText: {},
  cameraContainer: {
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 40,
    top: 5,
  },
});
