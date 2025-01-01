import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|native-notify| (?!(@firebase)/))",
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/expo-env.d.ts",
    "!**/.expo/**",
  ],
  moduleNameMapper: {
    "@firebase/auth": "<rootDir>/__mocks__/firebaseAuth.ts",
    "@/auth/firebaseConfig": "<rootDir>/__mocks__/firebaseConfig.ts",
    "@expo/vector-icons": "<rootDir>/__mocks__/Icons.ts",
    "expo-router": "<rootDir>/__mocks__/Icons.ts",
  },
};

export default config;
