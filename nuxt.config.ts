// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@nuxtjs/tailwindcss'],
    modules: [
    // Simple usage
    '@nuxtjs/robots',
    // With options
    ['@nuxtjs/robots', { /* module options */ }],
      ['@funken-studio/sitemap-nuxt-3', { generateOnBuild: true, hostname: 'https://alpha.edenofthewest.com' }],
  ],
        sitemap: {
    hostname: 'https://alpha.edenofthewest.com', 
    cacheTime: 1,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date().toISOString(),
    },
},
})
