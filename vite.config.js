import { sveltekit } from "@sveltejs/kit/vite";
import svelteKitSVG from "@poppanator/sveltekit-svg";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    svelteKitSVG({
      includePaths: ["./src/lib/assets/icons/"],
      svgoOptions: {
        plugins: [
          {
            name: "preset-default",
            params: { overrides: { removeViewBox: false } },
          },
          { name: "removeAttrs", params: { attrs: "(fill|stroke)" } },
          "removeDimensions",
        ],
      },
    }),
    svelteKitSVG({
      includePaths: ["./src/lib/assets/images/"],
      svgoOptions: {
        plugins: [
          {
            name: "preset-default",
            params: { overrides: { removeViewBox: false } },
          },
          "removeDimensions",
        ],
      },
    }),
  ],
};

export default config;
