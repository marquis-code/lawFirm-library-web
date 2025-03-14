import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false,

  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      title: "Rock-Smith Chambers | Discover a comprehensive collection of case law, statutes, and regulations.",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Rocksmith Chambers Law Library - Your gateway to legal knowledge and research' }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
        },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap' }
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",
          type: "text/javascript",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  googleFonts: {
    families: {
      'Noto+Sans': [400, 500, 700], // Specify font weights as needed
    },
    display: 'swap', // Controls how the font is displayed
    prefetch: true, // Prefetch the font for faster loading
    preconnect: true, // Preconnect to the font server
    preload: true, // Preload the font
  },

  plugins: ["~/plugins/aos.client.ts"],
  css: ["/assets/css/main.css"],
  modules: ['@kevinmarrec/nuxt-pwa', "@nuxtjs/tailwindcss", '@nuxtjs/google-fonts'],

  pwa: {
    workbox: {
      enabled: true
    },
    meta: {
      title: "Rock-Smith Chambers | Discover a comprehensive collection of case law, statutes, and regulations.",
      author: "Marquis",
      mobileAppIOS: false,
      mobileApp: true,
      description:
       "Discover a comprehensive collection of case law, statutes, and regulations.",
      theme_color: "#27396B",
      background_color: "#27396B",
      display: "standalone",
      start_url: "/",
      nativeUI: true,
    },
    icon: {
      sizes: [64, 120, 144, 152, 192, 384, 512],
    },
    manifest: {
      name: "Marquis",
      lang: "fa",
      useWebmanifestExtension: false,
    },
    runtimeCaching: [
      {
        urlPattern: "https://fonts.googleapis.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "https://fonts.gstatic.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "https://cdn.snipcart.com/.*",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern:
          "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
    ],
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Playfair Display', 'serif'],
          },
          colors: {
            green: {
              50: '#f0f9f0',
              100: '#dcf0dc',
              200: '#bae2ba',
              300: '#8fcf8f',
              400: '#5cb85c',
              500: '#48a148',
              600: '#3c8a3c',
              700: '#2f6e2f',
              800: '#295a29',
              900: '#244a24',
            },
          },
        },
      },
    },
  },
  vite: {
    optimizeDeps: {
      include: ['fast-deep-equal']
    },
    build: {
      // transpile: ['@vueup/vue-quill'],
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("pdfjs-dist")) {
              return "pdfjs";
            }
          },
        },
      },
    },
    // server: {
    //   fs: {
    //     allow: ["public/lib"],
    //   },
    // },
  },

  compatibilityDate: "2025-03-08",
});