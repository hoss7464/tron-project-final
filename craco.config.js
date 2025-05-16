module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ignore specific source map warnings
      webpackConfig.ignoreWarnings = [
        {
          module: /node_modules\/@walletconnect/,
          message: /Failed to parse source map/,
        },
        {
          module: /node_modules\/@tronweb3\/walletconnect-tron/,
          message: /Failed to parse source map/,
        },
      ];

      // Optionally, exclude source-map-loader for those modules entirely
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((oneOfRule) => {
            if (
              oneOfRule.enforce === 'pre' &&
              oneOfRule.use &&
              oneOfRule.use.some((useEntry) =>
                typeof useEntry === 'string'
                  ? useEntry.includes('source-map-loader')
                  : useEntry.loader?.includes('source-map-loader')
              )
            ) {
              // Exclude problematic packages
              oneOfRule.exclude = [
                /node_modules\/@walletconnect/,
                /node_modules\/@tronweb3\/walletconnect-tron/,
              ];
            }
          });
        }
      });

      return webpackConfig;
    },
  },
};
