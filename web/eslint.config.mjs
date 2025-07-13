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
    'plugin:prettier/recommended'
  ),
  // --- Custom Rules ---
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // Consider using "warn" instead of "off"
      'prettier/prettier': 'error', // Enforce Prettier formatting
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
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
