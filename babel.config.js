module.exports = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties'],
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
};
