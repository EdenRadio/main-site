// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image-edge",
    // Simple usage
    "@nuxtjs/robots",
    // With options
    [
      "@nuxtjs/robots",
      {
        /* module options */
      },
    ],
    [
      "@funken-studio/sitemap-nuxt-3",
      { generateOnBuild: true, hostname: "https://alpha.edenofthewest.com" },
    ],
  ],
  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
    presets: {
      albumArt: { modifiers: { format: "webp", width: 400, height: 400 } },
      general: { modifiers: { format: "webp" } },
    },
    domains: ["edenofthewest.com", "localhost", "alpha.edenofthewest.com", "ondigitalocean.app", "stingray-app-cllmu.ondigitalocean.app"],
  },
});
