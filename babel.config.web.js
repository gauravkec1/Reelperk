module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.web.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          'react-native$': 'react-native-web',
        },
      },
    ],
  ],
};

