module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: { node: true },
  // Exclude the Next.js dashboard app entirely — it uses its own tsconfig/eslint
  // and its files are not included in the root tsconfig project references.
  ignorePatterns: [
    '.eslintrc.js',
    'dist/**',
    'apps/dashboard/src/app/**',
    'apps/dashboard/src/components/layout/**',
    'apps/dashboard/src/components/dashboard/**',
    'apps/dashboard/next.config.ts',
    'apps/dashboard/tailwind.config.ts',
    'apps/dashboard/postcss.config.js',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      // Files outside all tsconfigs — lint without type-aware rules
      files: ['observability/**/*.ts', 'prisma/**/*.ts', 'src/**/*.ts', 'env.d.ts'],
      parserOptions: {
        project: null,
      },
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
    {
      // Legacy dashboard components (pre-Next.js) — lint without type-aware rules
      // since they are excluded from the root tsconfig include paths.
      files: [
        'apps/dashboard/src/components/*.tsx',
        'apps/dashboard/src/components/*.ts',
        'apps/dashboard/src/global.d.ts',
      ],
      parserOptions: {
        project: null,
      },
    },
  ],
};
