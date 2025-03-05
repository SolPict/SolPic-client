import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Login from "@/app/Login";
import { Alert } from "react-native";
import { LOGIN_ERROR_MESSAGE } from "@/constants/error_messages";

describe("<Login />", () => {
  beforeEach(() => {
    render(<Login />);
  });

  test("이메일, 비밀번호 입력창이 잘 렌더링 되어야 합니다.", async () => {
    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
  });

  test("'로그인' 텍스트가 잘 보여야 합니다.", async () => {
    const loginTexts = await screen.findAllByText("로그인");

    expect(loginTexts.length).toBe(2);
    expect(loginTexts[0]).toBeTruthy();
  });

  test("아이디와 비밀번호를 입력할 수 있는 input칸이 있어야 합니다.", () => {
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "test123@test.com"
    );
    expect(screen.getByPlaceholderText("Email").props.value).toBe(
      "test123@test.com"
    );

    fireEvent.changeText(screen.getByPlaceholderText("Password"), "test123");
    expect(screen.getByPlaceholderText("Password").props.value).toBe("test123");
  });

  test("회원가입 버튼을 클릭하면 회원가입 화면으로 전환됩니다.", () => {
    fireEvent.press(screen.getByText("아이디가 없으신가요?"));
    const SignUpText = screen.getAllByText("회원가입");

    expect(SignUpText.length).toBe(2);
    expect(SignUpText[0]).toBeTruthy();
  });

  test("잘못된 이메일과 비밀번호로 로그인 시 Alert이 호출됩니다.", async () => {
    jest.spyOn(Alert, "alert").mockImplementation(() => {});

    fireEvent.changeText(screen.getByPlaceholderText("Email"), "wrongID");
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "wrong");

    fireEvent.press(screen.getByRole("button", { name: "로그인" }));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(LOGIN_ERROR_MESSAGE);
    });
  });
});
