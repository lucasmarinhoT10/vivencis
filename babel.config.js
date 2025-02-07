module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@utils': './src/utils',
            '@theme': './src/theme',
            '@routes': './src/routes',
            '@services': './src/services',
            '@modules': './src/modules',
            '@assets': './src/assets',
            '@store': './src/store'
          },
        },
      ],
    ],
  };
};