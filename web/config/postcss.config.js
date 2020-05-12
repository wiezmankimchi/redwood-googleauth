const path = require('path');

module.exports = ({ webpack: { mode } }) => {
  const isEnvProduction = mode === 'production';
  return {
    plugins: [
      require('postcss-import')(),
      require('tailwindcss')(path.resolve(__dirname, 'tailwind.config.js')),
      // postcss-preset-env includes autoprefixer
      require('postcss-preset-env')({
        stage: 1,
        // NOTE: once the fix for this bug is released i can remove this
        // https://github.com/tailwindcss/tailwindcss/issues/1190
        features: {
          'focus-within-pseudo-class': false,
        },
      }),
      // Conditionanlly run cssnano. Array spread from here:
      // http://2ality.com/2017/04/conditional-literal-entries.html
      ...(isEnvProduction
        ? [
            require('cssnano')({
              preset: 'default',
            }),
          ]
        : []),
    ],
  };
};
