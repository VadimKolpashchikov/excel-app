module.exports = {
  overrides: [
    {
      files: ["**/*.scss", "**/*.css"],
      customSyntax: "postcss-scss",
    },
  ],
  extends: ["stylelint-config-standard", "stylelint-config-rational-order"],
  plugins: ["stylelint-order", "stylelint-scss", "stylelint-prettier"],
  rules: {
    "prettier/prettier": [
      true,
      {
        endOfLine: "auto",
      },
    ],
    "color-function-notation": ["modern", { ignore: ["with-var-inside"] }],
    "import-notation": ["string"],
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": [true,],
  },
};
