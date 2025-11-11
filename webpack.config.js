const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: argv.mode || 'development',
    entry: {
      main: './src/index.web.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'web-build'),
      filename: isProduction ? '[name].[contenthash].js' : 'bundle.js',
      publicPath: '/',
      clean: true,
    },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native/Libraries/Components/StatusBar/StatusBar': 'react-native-web/dist/exports/StatusBar',
      'react-native/Libraries/Image/Image': 'react-native-web/dist/exports/Image',
      'react-native/Libraries/Text/Text': 'react-native-web/dist/exports/Text',
      'react-native/Libraries/View/View': 'react-native-web/dist/exports/View',
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {
      'crypto': false,
      'stream': false,
      'buffer': false,
    },
  },
  ignoreWarnings: [
    /Module not found: Error: Can't resolve '@standard-schema\/utils'/,
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!(react-native-.*|@react-native.*|@reduxjs\/toolkit)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {targets: {browsers: ['last 2 versions']}}],
              ['@babel/preset-react', {runtime: 'automatic'}],
              '@babel/preset-typescript',
            ],
            plugins: [
              ['babel-plugin-module-resolver', {
                root: ['./src'],
                extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js', '.json'],
                alias: {
                  '@': './src',
                  'react-native$': 'react-native-web',
                },
              }],
            ],
            // Exclude react-native-reanimated for web builds
            babelrc: false,
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.html',
      inject: true,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'web-build'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  };
};

