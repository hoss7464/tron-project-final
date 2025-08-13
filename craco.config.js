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

      // Exclude problematic packages from source-map-loader
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
              oneOfRule.exclude = [
                /node_modules\/@walletconnect/,
                /node_modules\/@tronweb3\/walletconnect-tron/,
              ];
            }
          });
        }
      });

      // ✅ Fix TronWeb .cjs import issue
      webpackConfig.module.rules.push({
        test: /\.cjs$/,
        type: 'javascript/auto',
      });

      return webpackConfig;
    },
  },
};