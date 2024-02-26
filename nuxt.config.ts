// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules: {
    // Pages pre-rendered at build time
    "/": { prerender: true },
    "/login": { prerender: true },
    "/register": { prerender: true },
    "/forget-password": { prerender: true },
    "/refresh-email-confirm": { prerender: true },
    // Pages render only on client-side
    "/dashboard": { ssr: false },
    "/categories/**": { ssr: false },
    "/products/**": { ssr: false },
    "/orders/**": { ssr: false },
    "/accounts": { ssr: false },
    "/users": { ssr: false },
    "/settings": { ssr: false },
    "/email-confirm/**": { ssr: false },
    "/reset-password/**": { ssr: false },
  },
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  devServer: {
    port: 8000,
  },
  runtimeConfig: {
    public: {
      NUXT_API_BASE_URL: process.env.NUXT_API_BASE_URL,
    },
  },
  typescript: {
    typeCheck: true,
  },
  build: {
    transpile: ["@headlessui/vue"],
  },
});
