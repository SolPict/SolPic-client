const INVALID_CHARACTERS = [" ", ",", "?", ":"];

export function validateUserId(userEmail: string): boolean {
  const [userId, domain] = userEmail.split("@");

  if (!userEmail) throw new Error("아이디를 입력해주세요.");

  if (!userEmail.includes("@")) throw new Error("@을 입력해주세요.");

  if (INVALID_CHARACTERS.some((char) => userEmail.includes(char))) {
    throw new Error("입력할 수 없는 특수문자입니다.");
  }

  if (!domain) throw new Error("도메인을 입력해주세요.");

  if (!domain.split(".")[1]) throw new Error("올바른 도메인을 입력해주세요.");

  if (!userId) throw new Error("유저이름을 입력해주세요.");

  return true;
}

export function validatePassword(password: string): boolean {
  if (!password) throw new Error("비밀번호를 입력해주세요.");

  if (password.length <= 5)
    throw new Error("비밀번호는 최소 6글자 이상이여야 합니다.");

  return true;
}
