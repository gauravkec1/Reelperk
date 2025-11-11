/**
 * Babel config specifically for web builds
 * Excludes react-native-reanimated which doesn't work on web
 */

module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {browsers: ['last 2 versions']}}],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: ['./src'],
        extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js', '.json'],
        alias: {
          '@': './src',
          'react-native$': 'react-native-web',
        },
      },
    ],
  ],
};
