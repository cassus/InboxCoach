module.exports = {
  env: {
    browser: true,
    es6: true,
    webextensions: true
  },
  extends: ["prettier", "plugin:react/recommended"],
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
