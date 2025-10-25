import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, configDefaults } from "vitest/config";

const excluded: string[] = [
  ...configDefaults.exclude,
  "**/node_modules/**",
  "**/generated/**",
  "**/prisma/**",
  "**/dist/**",
  "**/docs/**",
];

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: excluded,
    coverage: {
      provider: "v8",
      exclude: excluded,
    },
  },
});
