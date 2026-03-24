// ============================================================
// 🚕 TAXIRADAR24 — CONFIGURACIÓN WEBPACK COMPLETA
// Optimizado para PWA, React 18, Firebase y arquitectura modular.
// SEO PRO + rendimiento real en móvil.
// ============================================================

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isProduction = process.env.NODE_ENV === "production";
const shouldAnalyze = process.env.ANALYZE === "true";

module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "eval-cheap-module-source-map",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath: "/",
    clean: true,
    crossOriginLoading: "anonymous",
  },

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

  module: {
    rules: [
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
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][hash][ext][query]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
      scriptLoading: "defer",
    }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css",
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        { from: "public/service-worker.js", to: "service-worker.js" },
        { from: "public/.htaccess", to: ".htaccess" },
        { from: "public/assets", to: "assets" },
        { from: "public/robots.txt", to: "robots.txt" },
        { from: "public/sitemap.xml", to: "sitemap.xml" },
        {
          from: "public/google5fa53c0d2a0a37a9.html",
          to: "google5fa53c0d2a0a37a9.html",
        },
      ],
    }),

    new Dotenv(),

    ...(shouldAnalyze
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: "server",
            openAnalyzer: true,
          }),
        ]
      : []),

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

    ...(isProduction
      ? [
          new SubresourceIntegrityPlugin({
            hashFuncNames: ["sha384"],
            enabled: true,
          }),
        ]
      : []),
  ],

  optimization: {
    minimize: isProduction,
    runtimeChunk: "single",
    realContentHash: true,
    usedExports: true,

    splitChunks: {
      chunks: "all",
      maxInitialRequests: 14,
      maxAsyncRequests: 18,
      minSize: 20000,

      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
          name: "react-vendor",
          priority: 50,
          enforce: true,
        },

        routerVendor: {
          test: /[\\/]node_modules[\\/](react-router|react-router-dom|@remix-run)[\\/]/,
          name: "router-vendor",
          priority: 40,
          enforce: true,
        },

        styledVendor: {
          test: /[\\/]node_modules[\\/](styled-components|hoist-non-react-statics)[\\/]/,
          name: "styled-vendor",
          priority: 35,
          enforce: true,
        },

        leafletVendor: {
          test: /[\\/]node_modules[\\/](leaflet|react-leaflet)[\\/]/,
          name: "leaflet-vendor",
          priority: 30,
          enforce: true,
        },

        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const match =
              module.context &&
              module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            const packageName = match ? match[1] : "misc";
            return `npm.${packageName.replace("@", "")}`;
          },
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },
  },

  performance: isProduction
    ? {
        hints: "warning",
        maxEntrypointSize: 5120000,
        maxAssetSize: 5120000,
      }
    : { hints: false },

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    historyApiFallback: true,
    open: true,
    headers: {
      "Cache-Control": "no-store",
      "Cross-Origin-Opener-Policy": "unsafe-none",
      "Cross-Origin-Embedder-Policy": "unsafe-none",
    },
  },
};