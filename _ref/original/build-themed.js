import { readFileSync } from 'node:fs';
import StyleDictionary from 'style-dictionary';
import {
  registerTransforms,
  permutateThemes,
} from '@tokens-studio/sd-transforms';

// sd-transforms, 2nd parameter for options can be added
// See docs: https://github.com/tokens-studio/sd-transforms
registerTransforms(StyleDictionary);

const $themes = JSON.parse(readFileSync('tokens/$themes.json', 'utf-8'));
const themes = permutateThemes($themes, { seperator: '_' });
const configs = Object.entries(themes).map(([name, tokensets]) => ({
  source: tokensets.map((tokenset) => `tokens/${tokenset}.json`),
  platforms: {
    css: {
      transforms: [
        'ts/descriptionToComment',
        'ts/size/px',
        'ts/opacity',
        'ts/size/lineheight',
        'ts/typography/fontWeight',
        'ts/resolveMath',
        'ts/size/css/letterspacing',
        'ts/typography/css/fontFamily',
        'ts/typography/css/shorthand',
        'ts/border/css/shorthand',
        'ts/shadow/css/shorthand',
        'ts/color/css/hexrgba',
        'ts/color/modifiers',
        'name/kebab',
      ],
      prefix: '',
      buildPath: 'build/css/',
      files: [
        {
          destination: `_tokens-${name}.css`,
          format: 'css/variables',
        },
      ],
    },
    scss: {
      buildPath: 'build/scss/',
      prefix: '',
      transforms: [
        'name/kebab',
        'ts/descriptionToComment',
        'ts/size/px',
        'ts/typography/fontWeight',
        'ts/size/css/letterspacing',
        'ts/typography/css/fontFamily',
        'ts/typography/css/shorthand',
        'ts/border/css/shorthand',
        'ts/shadow/css/shorthand',
      ],
      files: [
        {
          destination: `_tokens-${name}.scss`,
          format: 'scss/variables',
        },
      ],
    },
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/js/',
      files: [
        {
          destination: `tokens-${name}.js`,
          format: 'javascript/es6',
        },
      ],
    },
  },
}));

for (const cfg of configs) {
  const sd = new StyleDictionary(cfg);
  // optionally, cleanup files first..
  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
}
