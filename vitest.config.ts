import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, configDefaults } from "vitest/config";

const excluded: string[] = [
  ...configDefaults.exclude,
  "**/generated/**",
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
