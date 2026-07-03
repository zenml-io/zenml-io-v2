import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    environment: "node",
    globals: false,
    include: ["tests/**/*.test.ts"],
  },
});
