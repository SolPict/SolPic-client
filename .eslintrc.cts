module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    trailingComma: "none",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
