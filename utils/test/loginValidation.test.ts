import { describe, expect } from "@jest/globals";
import { validateUserId, validatePassword } from "../loginValidation";

describe("아이디 유효성 검사", () => {
  it("도메인을 입력하지 않은 경우 에러를 반환해야 합니다.", () => {
    expect(() => validateUserId("test123@")).toThrow("도메인을 입력해주세요.");
  });

  it("올바르지 않은 도메인을 입력한 경우 에러를 반환해야 합니다.", () => {
    expect(() => validateUserId("test123@test")).toThrow(
      "올바른 도메인을 입력해주세요."
    );
  });

  it("유저이름을 입력하지 않은 경우 에러를 반환해야 합니다.", () => {
    expect(() => validateUserId("@test.com")).toThrow(
      "유저이름을 입력해주세요."
    );
  });

  it("@를 입력하지 않은 경우 에러를 반환해야 합니다.", () => {
    expect(() => validateUserId("testtest.com")).toThrow("@을 입력해주세요.");
  });

  it("허용되지 않은 특수문자를 사용한 경우 에러를 반환해야 합니다.", () => {
    expect(() => validateUserId("test 123@test.com")).toThrow(
      "입력할 수 없는 특수문자입니다."
    );
    expect(() => validateUserId("test,123@test.com")).toThrow(
      "입력할 수 없는 특수문자입니다."
    );
    expect(() => validateUserId("test???@test.com")).toThrow(
      "입력할 수 없는 특수문자입니다."
    );
    expect(() => validateUserId("test:::@test.com")).toThrow(
      "입력할 수 없는 특수문자입니다."
    );
  });

  it("아이디를 입력하지 않은 경우 에러를 반환해야 합니다.", () => {
    expect(() => validateUserId("")).toThrow("아이디를 입력해주세요.");
  });

  it("올바른 아이디를 입력시 true를 반환해주어야 합니다.", () => {
    expect(validateUserId("test123@test.com")).toBeTruthy();
  });
});

describe("비밀번호 유효성 검사", () => {
  it("입력받은 비밀번호가 5자리 이하일 경우 에러를 반환해야 합니다.", () => {
    expect(() => validatePassword("12345")).toThrow(
      "비밀번호는 최소 6글자 이상이여야 합니다."
    );
  });

  it("비밀번호를 입력하지 않을 경우 에러를 반환해야 합니다.", () => {
    expect(() => validatePassword("")).toThrow("비밀번호를 입력해주세요.");
  });

  it("올바른 비밀번호를 입력시 true를 반환해주어야 합니다.", () => {
    expect(validatePassword("123456")).toBeTruthy();
  });
});
