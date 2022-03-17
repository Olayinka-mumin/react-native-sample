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
            '@common': './src/partials/common',
            '@form': './src/partials/form/',
            '@config': './src/config/',
            '@svg': './src/partials/svg',
            '@modules': './src/modules/',
          },
        },
      ],
    ],
  };
};
