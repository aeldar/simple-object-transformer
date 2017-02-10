// @flow

import type { ConverterFactory, Converter } from './flowtypes';


export const converter: Converter = (rules, source) =>
  Object.keys(rules).reduce((target, name) => {
    const rule = rules[name];
    switch (typeof rule) {
      case 'string':
        return { ...target, [name]: source[rule] };
      case 'function':
        return { ...target, [name]: rule(source, name) };
      default:
        throw new Error('Wrong converter rule for property: ', name);
    }
  }, {});

export const converterFactory: ConverterFactory = rules => source => converter(rules, source);

export default converterFactory;
