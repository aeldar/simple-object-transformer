// @flow

import type { TransformerFactory, Transformer } from './index.js.flow';


export const transformer: Transformer = (rules, source) =>
  Object.keys(rules).reduce((target, name) => {
    const rule = rules[name];
    switch (typeof rule) {
      case 'string':
        return { ...target, [name]: source[rule] };
      case 'function':
        return { ...target, [name]: rule(source, name) };
      default:
        throw new Error('Wrong transformer rule for property: ', name);
    }
  }, {});

export const transformerFactory: TransformerFactory = rules => source => transformer(rules, source);

export default transformerFactory;
