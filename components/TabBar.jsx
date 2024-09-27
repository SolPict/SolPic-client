import {
  AntDesign,
  Fontisto,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TabBar({ state, descriptors, navigation }) {
  const ANALYZING_PAGE_NUM = 0;
  const ANSWER_PAGE_NUM = 1;

  if (state.index === ANALYZING_PAGE_NUM || state.index === ANSWER_PAGE_NUM) {
    return;
  }

  const isFocusedColor = "#0891b2";
  const isNotFocusedColor = "#737373";
  const icons = {
    index: (props) => (
      <AntDesign name="home" size={26} color={isNotFocusedColor} {...props} />
    ),
    Problems: (props) => (
      <SimpleLineIcons
        name="pencil"
        size={26}
        color={isNotFocusedColor}
        {...props}
      />
    ),
    Camera: (props) => (
      <Fontisto name="camera" size={34} color={isNotFocusedColor} {...props} />
    ),
    ProblemReviews: (props) => (
      <Octicons name="book" size={26} color={isNotFocusedColor} {...props} />
    ),
    PastHistory: (props) => (
      <Octicons name="history" size={26} color={isNotFocusedColor} {...props} />
    ),
  };
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        if (
          ["_sitemap", "+not-found", "Answers", "Login"].includes(route.name) ||
          route.name.includes("/") ||
          route.name.includes("(") ||
          route.name.includes("[")
        ) {
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
            {icons[route.name]({
              color: isFocused ? isFocusedColor : isNotFocusedColor,
            })}
            <Text
              style={{ color: isFocused ? isFocusedColor : isNotFocusedColor }}
            >
              {label !== "카메라" && label}
            </Text>
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
    borderRadius: 25,
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
});
