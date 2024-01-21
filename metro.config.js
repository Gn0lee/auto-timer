const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();
  const { assetExts, sourceExts } = defaultConfig.resolver;

  return {
    resolver: {
      // Add bin to assetExts
      assetExts: [...assetExts, 'bin'],
      sourceExts: [...sourceExts, 'cjs'],
    },
    transformer: {
      babelTransformerPath: require.resolve('react-native-typescript-transformer'),
    },
  };
})();
