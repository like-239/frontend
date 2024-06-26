const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    blockList: exclusionList([
      // Add patterns to exclude here
      /node_modules\/some-package-to-exclude\/.*/,
    ])
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
