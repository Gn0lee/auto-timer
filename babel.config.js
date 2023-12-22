module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@const': './src/const',
            '@components': './src/components',
            '@types': './src/types',
            '@apps': './src/apps',
            '@assets': './src/assets',
            '@hooks': './src/hooks',
            '@store': './src/store',
          },
        },
      ],
    ],
  };
};
