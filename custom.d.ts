declare module "*.svg" {
  import { ImageSourcePropType, ImageURISource } from "react-native";

  const value: ImageSourcePropType & ImageURISource;
  export default value;
}

declare module "*.png" {
  import { ImageSourcePropType, ImageURISource } from "react-native";

  const value: ImageSourcePropType & ImageURISource;
  export default value;
}

declare module "react-native-math-view";

declare global {
  interface FormDataValue {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void;
  }
}
