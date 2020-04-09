// https://eslint.org/docs/user-guide/configuring

module.exports = {
  "root": true,
  "env": {
    "node": true,
    "browser": true,
    "jquery": true
  },
  "extends": [
    "@tencent/eslint-config-tencent",
    "plugin:vue/essential",
    "plugin:vue/recommended",
    "@vue/prettier"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "globals": {
    "_": true,
    "QUI": true,
    "axios": true,
    "Vue": true,
    "TencentCaptcha": true
  },
  "rules": {
    "semi": [
      2,
      "always"
    ],
    "indent": [
      2,
      2,
      {
        "SwitchCase": 1,
        "MemberExpression": 1
      }
    ],
    "no-new": [
      0
    ],
    "no-debugger": "off",
    "no-console": "off",
    "no-case-declarations": "off",
    "no-useless-escape": "off",
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/require-prop-types": "off",
    "vue/no-unused-components": "warn",
    "no-extra-parens": "off",
    "no-multiple-empty-lines": [
      1,
      {
        "max": 2
      }
    ],
    "vue/html-closing-bracket-newline": [
      "warn",
      {
        "singleline": "never",
        "multiline": "always"
      }
    ],
    "vue/html-self-closing": [
      "warn",
      {
        "html": {
          "void": "always",
          "normal": "never",
          "component": "always"
        },
        "svg": "always",
        "math": "always"
      }
    ],
    "vue/max-attributes-per-line": "off",
    "object-curly-newline": "off",
    "prettier/prettier": "warn"
  }
};
