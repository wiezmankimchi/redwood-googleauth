const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const configDir = path.resolve(__dirname, '../config');
// HACK: The array indexing feels like a big hack...
// TODO: Stop doing this.
module.exports = (config, { mode }) => {
  const isEnvProduction = mode === 'production';

  // Replace the SCSS rule with my own
  config.module.rules[0].oneOf[4] = {
    test: /\.(sa|sc|c)ss$/i,
    use: [
      isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',

      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: configDir,
          },
        },
      },
      'sass-loader',
    ],
  };

  // Get rid of the current CSS rule.
  config.module.rules[0].oneOf.splice(5, 1);

  // Add a font rule
  config.module.rules[0].oneOf.push({
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: 'url-loader',
    },
  });

  return config;
};
