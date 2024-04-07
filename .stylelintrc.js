module.exports = {
  overrides: [
    {
      files: ["**/*.scss", "**/*.css"],
      customSyntax: "postcss-scss"
    }
  ],
  extends: ["stylelint-config-standard",
            "stylelint-config-rational-order",],
  plugins: ["stylelint-order", "stylelint-scss", "stylelint-prettier"],
  rules: {
    "prettier/prettier":  [true,
      {
        endOfLine: 'auto',
      },
    ]
  }
};