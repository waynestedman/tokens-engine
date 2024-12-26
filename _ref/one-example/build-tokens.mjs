// build-tokens.mjs
import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

register(StyleDictionary);

const sd = new StyleDictionary('config.mjs');

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
