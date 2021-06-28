module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "vue/no-unused-components": 1,
    "prefer-const": 0,
    "no-empty-function": 1,
    semi: 1,
    quotes: [1, "single"],
    "object-shorthand": 1,
    camelcase: [2, {properties: "never"}],
    // 关闭eslint可能与prettier发生冲突的代码格式化规则
    "prettier/prettier": [
      "off",
      {
        singleQuote: false,
        trailingComma: "none",
        bracketSpacing: true,
        jsxBracketSameLine: true,
        sortAttributes: true,
        "key-spacing": false
      }
    ]
  }
};
