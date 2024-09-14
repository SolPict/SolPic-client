import { SafeAreaView } from "react-native";
import ColorList from "../components/ColorList";
import DropDown from "../components/DropDown";

export default function History() {
  return (
    <SafeAreaView>
      <DropDown />
      <ColorList color="#78716c" />
    </SafeAreaView>
  );
}
