import { createJsWithBabelPreset, JestConfigWithTsJest } from "ts-jest";

const jsWithBabelPreset = createJsWithBabelPreset({
  tsconfig: "tsconfig.spec.json",
  babelConfig: true,
});

const jestConfig: JestConfigWithTsJest = {
  preset: "react-native",
  transform: jsWithBabelPreset.transform,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default jestConfig;
