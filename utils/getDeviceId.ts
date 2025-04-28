import * as Application from "expo-application";
import { Platform } from "react-native";

async function getDeviceId() {
  if (Platform.OS === "android") {
    return Application.getAndroidId();
  } else if (Platform.OS === "ios") {
    return await Application.getIosIdForVendorAsync();
  } else {
    return null;
  }
}

export default getDeviceId;
