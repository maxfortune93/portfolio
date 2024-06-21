module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      // 'eslint:recommended',
      // 'plugin:react-hooks/recommended',
      "standard",
      "next/core-web-vitals",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "plugin:tailwindcss/recommended",
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "prettier/prettier": [
        "error",
        {
          printWidth: 80,
          tabWidth: 2,
          singleQuote: true,
          trailingComma: "all",
          arrowParens: "always",
          semi: true,
          endOfLine: "auto",
        },
      ],
      "jsx-a11y/alt-text": [
        "warn",
        {
          elements: ["img"],
          img: ["Image"],
        },
      ],
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
    },
    overrides: [
      {
        "files": ["tailwind.config.ts", "*.config.js"],
        "env": {
          "node": true
        }
      }
    ],
    settings: {
        // react: {
        //   version: "detect",
        // },
        "import/parsers": {
          [require.resolve("@typescript-eslint/parser")]: [
            ".ts",
            ".tsx",
            ".d.ts",
          ],
        },
      },
  }
  