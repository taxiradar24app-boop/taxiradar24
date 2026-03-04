// ============================================================
// 🚕 TAXIRADAR24 — CONFIGURACIÓN WEBPACK COMPLETA
// Optimizado para PWA, React 18, Firebase y arquitectura modular.
// ============================================================

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  // ✅ 1) MODO EXPLÍCITO (prudente, mejora defaults)
  mode: isProduction ? "production" : "development",

  // ✅ 2) SOURCEMAPS: OFF en producción (reduce peso)
  devtool: isProduction ? false : "eval-cheap-module-source-map",

  // ===========================================
  // 🔹 Punto de entrada principal
  // ===========================================
  entry: "./src/index.js",

  // ===========================================
  // 📦 Salida de compilación
  // ===========================================
  output: {
    path: path.resolve(__dirname, "dist/public_html"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
    clean: true,
    crossOriginLoading: "anonymous", // Necesario para SRI
  },

  // ===========================================
  // 🧭 Resolución de módulos y alias globales
  // ===========================================
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@screens": path.resolve(__dirname, "src/Screens"),
      "@academy": path.resolve(__dirname, "src/Academy"),
      "@navigator": path.resolve(__dirname, "src/navigator"),
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/Styles"),
      "@context": path.resolve(__dirname, "src/context"),
    },
    extensions: [".js", ".jsx", ".json"],
  },

  // ===========================================
  // ⚙️ Reglas de carga
  // ===========================================
  module: {
    rules: [
      // 🧠 Transpila React y JS moderno
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },

      // 🎨 Carga y extrae CSS
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      // 🖼️ Carga imágenes y assets
      {
        test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][hash][ext][query]",
        },
      },
    ],
  },

  // ===========================================
  // 🧩 Plugins
  // ===========================================
  plugins: [
    // 🔹 Genera el index.html optimizado
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
      scriptLoading: "defer",
    }),

    // 🔹 Extrae los CSS en archivos separados
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),

    // 🔹 Copia archivos públicos (PWA)
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        { from: "public/service-worker.js", to: "service-worker.js" },
        { from: "public/.htaccess", to: ".htaccess" },
        { from: "public/assets", to: "assets" },
        // { from: "public/audios", to: "audios" },   // 👈 🔥 AQUI SE COPIAN LOS AUDIOS
        { from: "public/robots.txt", to: "robots.txt" },
        { from: "public/sitemap.xml", to: "sitemap.xml" },
        {
          from: "public/google5fa53c0d2a0a37a9.html",
          to: "google5fa53c0d2a0a37a9.html",
        },
      ],
    }),

    // 🔹 Variables de entorno (.env)
    new Dotenv(),

    // 🔹 Minimiza HTML solo en producción
    ...(isProduction
      ? [
          new HtmlMinimizerPlugin({
            minimizerOptions: {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
            },
          }),
        ]
      : []),

    // 🔹 Subresource Integrity (seguridad de hashes)
    ...(isProduction
      ? [
          new SubresourceIntegrityPlugin({
            hashFuncNames: ["sha384"],
            enabled: true,
          }),
        ]
      : []),
  ],

  // ===========================================
  // 🚀 Optimización avanzada
  // ===========================================
  optimization: {
    minimize: isProduction,

    runtimeChunk: "single",
    realContentHash: true,
    usedExports: true,

    splitChunks: {
      chunks: "all",
      maxInitialRequests: 10,
      maxAsyncRequests: 10,
      minSize: 20000,

      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react-vendor",
          priority: 40,
          enforce: true,
        },

        firebaseVendor: {
          test: /[\\/]node_modules[\\/]firebase[\\/]/,
          name: "firebase-vendor",
          priority: 35,
          enforce: true,
        },

        routerVendor: {
          test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
          name: "router-vendor",
          priority: 30,
          enforce: true,
        },

        styledVendor: {
          test: /[\\/]node_modules[\\/]styled-components[\\/]/,
          name: "styled-vendor",
          priority: 25,
          enforce: true,
        },

        leafletVendor: {
          test: /[\\/]node_modules[\\/]leaflet[\\/]/,
          name: "leaflet-vendor",
          priority: 20,
          enforce: true,
        },

        // 👇 Divide automáticamente librerías del resto de node_modules
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const match = module.context && module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            );
            const packageName = match ? match[1] : "misc";
            return `npm.${packageName.replace("@", "")}`;
          },
          priority: -10,
        },
      },
    },
  },

  // ===========================================
  // 📊 Rendimiento y advertencias
  // ===========================================
performance: isProduction
  ? { hints: "warning", maxEntrypointSize: 5120000, maxAssetSize: 5120000 }
  : { hints: false },
  // ===========================================
  // 🧠 Servidor de desarrollo
  // ===========================================
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    historyApiFallback: true, // ✅ para React Router
    open: true,

    // ✅ Evita cache del navegador en DEV
    headers: {
      "Cache-Control": "no-store",
      "Cross-Origin-Opener-Policy": "unsafe-none",
      "Cross-Origin-Embedder-Policy": "unsafe-none",
    },
  },
};