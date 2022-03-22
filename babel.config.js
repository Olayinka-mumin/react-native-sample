module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: 'react-native-dotenv',
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.jsx', '.json'],
          alias: {
            '@common': './src/shared/common',
            '@form': './src/shared/form/',
            '@config': './src/config/',
            '@svg': './src/shared/svg',
            '@modules': './src/modules/',
          },
        },
      ],
    ],
  };
};
