module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@stylistic/ts',
    '@stylistic/js',
    'import-newlines',
    'react-refresh', // Included with Vite
    'simple-import-sort',
  ],
  rules: {

    // Style
    '@stylistic/js/brace-style': "error",
    '@stylistic/js/comma-dangle': ["error", "always-multiline"],
    '@stylistic/js/eol-last': ["error", "always"],
    '@stylistic/js/jsx-quotes': ["error", "prefer-double"],
    '@stylistic/js/no-multi-spaces': "error",
    '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    '@stylistic/ts/indent': ['error', 2],
    '@stylistic/ts/object-curly-spacing': ['error', 'always'],
    '@stylistic/ts/quotes': ['error', 'single'],
    '@stylistic/ts/semi': 'error',

    // Replace JS rules with TS rules:
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],

    // Misc.
    "arrow-body-style": ["error", "as-needed"],
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],

    // Plugin configurations
    'import-newlines/enforce': ['error', 2],
    'react-refresh/only-export-components': [ 'warn', { allowConstantExport: true } ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': ['error', {
      'groups': [
        ['^react', '^@?\\w'], // External Packages (React related first)
        ['^src', '^~(/.*|$)', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Internal packages
        ['^.+\\.?(css|scss)$'] // Style
      ]
    }],
  },
}
