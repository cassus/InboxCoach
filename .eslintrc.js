module.exports = {
  env: {
    browser: true,
    es6: true,
    webextensions: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react"
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "no-case-declarations": "off",
    "react/prop-types": "off",
    "no-console": "off"
  }
}
