module.exports = {
  env: {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  settings: {
    react: {
      createClass: "createReactClass", 
      pragma: "React",
      fragment: "Fragment",
      version: "detect",
      flowVersion: "0.53"
    }
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest"
  },
  plugins: [
    "react",
    "json",
    "@typescript-eslint"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "indent": [ "error", 2 ],
    "array-bracket-spacing": [ "error", "always", { "singleValue": false } ],
    "linebreak-style":  [ "error", "unix" ],
    "quotes": [ "error", "double" ],
    "semi": [ "error", "always" ],
    "prefer-arrow-callback": "error",
    "curly": "error",
    "object-curly-spacing": [ "error", "always" ],
    "no-multiple-empty-lines": [ "error", { "max": 1, "maxEOF": 1 } ],
    "camelcase": "error",
    "eol-last": [ "error", "always" ],
  }
};
