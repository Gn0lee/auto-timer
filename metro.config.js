const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();
  const { assetExts, sourceExts } = defaultConfig.resolver;

  return {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      // Add bin to assetExts
      assetExts: [...assetExts, 'bin'],
      sourceExts: [...sourceExts, 'cjs'],
    },
    transformer: {
      ...defaultConfig.transformer,
      babelTransformerPath: require.resolve('react-native-typescript-transformer'),
    },
  };
})();
