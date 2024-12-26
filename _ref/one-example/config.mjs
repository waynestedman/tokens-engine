// config.mjs

export default {
  source: ['./src/tokens/tokens-example.json'],
  log: {
    verbosity: 'verbose',
    errors: {
      brokenReferences: 'console'
    }
  },
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      files: [
        {
          destination: './build/css/global-tokens.css',
          format: 'css/variables',
          // filter only the tokens that are inside the global object
          filter: (token) => token.path[0] === 'global',
        },
        // dynamically generate file outputs for each component
        // ...generateCSSComponentFiles(['button', 'select', 'switch']),
      ],
    },
    js: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      files: [
        {
          destination: './build/js/global-tokens.js',
          format: 'javascript/es6',
          filter: (token) => token.path[0] === 'global',
        },
        // ...generateJSComponentFiles(['button', 'select', 'switch']),
      ],
    },

  },
};