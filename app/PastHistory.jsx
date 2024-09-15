import { SafeAreaView } from "react-native";
import ColorList from "../components/ProblemContainer";
import DropDown from "../components/DropDown";

export default function PastHistory() {
  return (
    <SafeAreaView>
      <DropDown />
      <ColorList color="#78716c" />
    </SafeAreaView>
  );
}
