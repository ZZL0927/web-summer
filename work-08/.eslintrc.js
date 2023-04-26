// {
//   "env": {
//     "node": true,
//     "browser": true
//   },
//   "parser": "@typescript-eslint/parser",
//   "plugins": [
//     "@typescript-eslint"
//   ],
//   "extends": ["standard"],
//   "ignorePatterns": ["scripts/*.js"],
//   "rules":{
//     "semi":"error"
//   }
// }
module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
};