import { SafeAreaView } from "react-native";

import SortingScrollButton from "../../components/SortingScrollButton";
import ColorList from "../../components/ProblemContainer";

export default function Problems() {
  return (
    <SafeAreaView>
      <SortingScrollButton />
      <ColorList color="#0891b2" currentPage="Problems" />
    </SafeAreaView>
  );
}
