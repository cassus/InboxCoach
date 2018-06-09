module.exports = {
  env: {
    browser: true,
    es6: true,
    webextensions: true,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
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
  plugins: ["react", "jest"],
  rules: {
    "no-case-declarations": "off",
    "react/prop-types": "off",
    "no-console": "off"
  }
}
