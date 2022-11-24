module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "ignorePatterns": ["lib/**", ".eslintrc.js", "tsconfig.json", "jest.config.js"],
    "overrides": [
        {
            files: ["src/**/*.ts", "test/**/*.ts"],
            extends: [
              'plugin:@typescript-eslint/recommended',
              'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            parserOptions: {
              project: ['./tsconfig.json'],
            },
            rules: {
                "@typescript-eslint/require-await": "warn",
                "@typescript-eslint/no-floating-promises": "off",
                "@typescript-eslint/no-unsafe-argument": "warn",
                "@typescript-eslint/no-unsafe-member-access": "warn"
            }
          },
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./eslintrc.js"]
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "no-extra-boolean-cast": "off",
    }
}
