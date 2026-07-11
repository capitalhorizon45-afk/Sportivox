import nextConfig from "eslint-config-next/core-web-vitals";
import tsConfig from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".local/**",
      ".agents/**",
      "node_modules/**",
      ".next/**",
      "out/**",
    ],
  },
  ...nextConfig,
  ...tsConfig,
];

export default eslintConfig;
