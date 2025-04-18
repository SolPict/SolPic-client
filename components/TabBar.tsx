import { Fontisto } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import focusInHome from "../assets/home_focus.png";
import focusOutHome from "../assets/home_not_focus.png";
import focusInReview from "../assets/review_focus.png";
import focusOutReview from "../assets/review_not_focus.png";
import { COLORS } from "../constants/colors";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/src/types";
import { useMemo } from "react";
import { EXCEPT_PAGES } from "@/constants/except_pages";
import { Image } from "expo-image";

interface IconsTypes {
  [pageName: string]: (isFocused?: boolean | undefined) => React.JSX.Element;
}

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const currentIndex = state.index;
  const answerAndProblemPage = state.routes[currentIndex].state?.index;

  if (EXCEPT_PAGES.includes(currentIndex) || answerAndProblemPage) {
    return;
  }

  const icons: IconsTypes = useMemo(
    () => ({
      Home: (focused) => (
        <Image
          source={focused ? focusInHome : focusOutHome}
          style={[styles.tabImages, { width: "50%" }]}
          contentFit="contain"
        />
      ),
      Camera: () => (
        <View style={styles.cameraContainer}>
          <Fontisto name="camera" size={24} color={"white"} />
        </View>
      ),
      ReviewNote: (focused) => (
        <Image
          source={focused ? focusInReview : focusOutReview}
          style={styles.tabImages}
        />
      ),
    }),
    []
  );
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        if (!["Home", "Camera", "ReviewNote"].includes(route.name)) {
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
            onPress={onPress}
          >
            <View style={styles.tabContainer}>
              {icons[route.name](isFocused)}
              {label !== "카메라" && <Text>{label as string}</Text>}
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
    width: "60%",
    height: "100%",
  },
  cameraContainer: {
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});
