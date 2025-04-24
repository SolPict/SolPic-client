export enum ErrorMessageKey {
  CAMERA_ACCESS_REQUIRED = "CAMERA_ACCESS_REQUIRED",
  REQUEST_ACCESS = "REQUEST_ACCESS",
  OCR_FAIL = "OCR_FAIL",
  AI_REQUEST_FAIL = "AI_REQUEST_FAIL",
  ANALYSIS_SUCCESS = "ANALYSIS_SUCCESS",
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
  DELETE_FAIL = "DELETE_FAIL",
  SUBMIT_FAIL = "SUBMIT_FAIL",
  REVIEWNOTE_FAIL = "REVIEWNOTE_FAIL",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  DELETE_SUCCESS = "DELETE_SUCCESS",
  DELETE_ACCOUNT_FAIL = "DELETE_ACCOUNT_FAIL",
  NOT_MATH_PROBLEM = "NOT_MATH_PROBLEM",
  AI_SERVER_UNAVAILABLE = "AI_SERVER_UNAVAILABLE",
  AI_TIMEOUT = "AI_TIMEOUT",
  PHOTO_CAPTURE_FAIL = "PHOTO_CAPTURE_FAIL",
  GALLERY_PERMISSION_REQUIRED = "GALLERY_PERMISSION_REQUIRED",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  NO_IMAGES = "NO_IMAGES",
  IMAGE_PICKER_FAIL = "IMAGE_PICKER_FAIL",
}

export const ERROR_MESSAGES = {
  [ErrorMessageKey.CAMERA_ACCESS_REQUIRED]: {
    KO: "카메라에 대한 접근이 필요합니다.",
    EN: "Camera access is required.",
  },
  [ErrorMessageKey.REQUEST_ACCESS]: {
    KO: "접근 요청",
    EN: "Request Access",
  },
  [ErrorMessageKey.OCR_FAIL]: {
    KO: "문제 분석 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요!",
    EN: "An error occurred while analyzing the problem.\nPlease try again later!",
  },
  [ErrorMessageKey.AI_REQUEST_FAIL]: {
    KO: "AI 수식 분석 서버가 일시적으로 응답하지 않습니다. 잠시 후 다시 시도해주세요.",
    EN: "AI problem solving server is temporarily unavailable. Please try again later.",
  },
  [ErrorMessageKey.ANALYSIS_SUCCESS]: {
    KO: "문제 분석이 완료되었습니다.",
    EN: "Problem analysis completed.",
  },
  [ErrorMessageKey.LOGIN]: {
    KO: "이미 존재하거나 올바르지 않은 형식입니다.",
    EN: "This account already exists or the format is incorrect.",
  },
  [ErrorMessageKey.SIGNUP]: {
    KO: "이미 존재하거나 올바르지 않은 형식입니다.",
    EN: "This account already exists or the format is incorrect.",
  },
  [ErrorMessageKey.DELETE_FAIL]: {
    KO: "리뷰를 삭제하지 못하였습니다.",
    EN: "Failed to delete the review.",
  },
  [ErrorMessageKey.SUBMIT_FAIL]: {
    KO: "제출에 실패하였습니다.",
    EN: "Failed to submit your answer.",
  },
  [ErrorMessageKey.REVIEWNOTE_FAIL]: {
    KO: "리뷰노트 데이터를 가져오는데 실패하였습니다.",
    EN: "Failed to load review note data.",
  },
  [ErrorMessageKey.LOGOUT_SUCCESS]: {
    KO: "정상적으로 로그아웃 되었습니다.",
    EN: "Successfully logged out.",
  },
  [ErrorMessageKey.DELETE_SUCCESS]: {
    KO: "정상적으로 회원탈퇴 되었습니다.",
    EN: "Successfully deleted account.",
  },
  [ErrorMessageKey.DELETE_ACCOUNT_FAIL]: {
    KO: "회원탈퇴 중 오류가 발생했습니다.",
    EN: "Failed to delete account.",
  },
  [ErrorMessageKey.NOT_MATH_PROBLEM]: {
    KO: "수학 문제가 인식되지 않았습니다.\n다시 촬영해 주세요!",
    EN: "Not recognized as a math problem.\nPlease try again!",
  },
  [ErrorMessageKey.AI_SERVER_UNAVAILABLE]: {
    KO: "AI 서버가 일시적으로 사용 불가능합니다.\n잠시 후 다시 시도해주세요!",
    EN: "The AI server is temporarily unavailable.\nPlease try again later.",
  },
  [ErrorMessageKey.AI_TIMEOUT]: {
    KO: "AI 서버 요청이 시간 초과되었습니다.\n잠시 후 다시 시도해주세요!",
    EN: "AI server request timed out.\nPlease try again later.",
  },
  [ErrorMessageKey.PHOTO_CAPTURE_FAIL]: {
    KO: "사진을 찍는 중 문제가 발생했습니다.",
    EN: "An error occurred while taking a photo.",
  },
  [ErrorMessageKey.GALLERY_PERMISSION_REQUIRED]: {
    KO: "갤러리 접근 권한이 필요합니다.",
    EN: "Gallery access permission is required.",
  },
  [ErrorMessageKey.PERMISSION_DENIED]: {
    KO: "갤러리 접근 권한이 거부되었습니다.",
    EN: "Permission denied.",
  },
  [ErrorMessageKey.NO_IMAGES]: {
    KO: "갤러리에 이미지가 없습니다.",
    EN: "No images available in the gallery.",
  },
  [ErrorMessageKey.IMAGE_PICKER_FAIL]: {
    KO: "이미지를 불러오는 데 실패했습니다.",
    EN: "Failed to pick image from gallery.",
  },
};
