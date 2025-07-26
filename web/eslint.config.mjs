import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals'; // Import globals

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@next/next/recommended',
  ),
  // --- Custom Rules ---
  {
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      // '@typescript-eslint/no-unused-vars': 'warn', // Consider using "warn" instead of "off"
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_|req|res|event|next|err|ctx|args|context|info',
        },
      ],
      '@typescript-eslint/no-object-literal-type-assertion': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      'prettier/prettier': 'error', // Enforce Prettier formatting 'error'
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'warn',
    },
    // overrides: [
    //   {
    //     files: ['**/*.ts?(x)'],
    //     parser: '@typescript-eslint/parser',
    //     parserOptions: {
    //       ecmaVersion: 2018,
    //       sourceType: 'module',
    //       ecmaFeatures: {
    //         jsx: true,
    //       },
    //       // typescript-eslint specific options
    //       warnOnUnsupportedTypeScriptVersion: true,
    //     },
    //     settings: {
    //       'import/parsers': {
    //         '@typescript-eslint/parser': ['.ts', '.tsx'],
    //       },
    //       'import/resolver': {
    //         typescript: {
    //           alwaysTryTypes: true,
    //         },
    //       },
    //     },
    //   },
    // ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        // Add other globals if needed
      },
    },
  },
  {
    ignores: [
      '**/.next/**', // Ignore the .next directory
    ],
  },
];

export default eslintConfig;
