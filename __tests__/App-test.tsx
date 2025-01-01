import { render } from "@testing-library/react-native";
import StartPage from "@/app/index";
import { Redirect } from "expo-router";

describe("<StartPage />", () => {
  test("올바른 루트로 리다이렉트 되어야합니다", () => {
    render(<StartPage />);

    expect(Redirect).toHaveBeenCalledWith({ href: "/(tabs)/Home" }, {});
  });
});
