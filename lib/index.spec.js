// @flow

import { expect } from 'chai';

import { converterFactory, converter } from './index';

const RULES = {
  id: 'productId',
  name: 'firstName',
  fullName: (context) => `${context.firstName} ${context.lastName}`,
};

const SOURCE = {
  productId: 123,
  firstName: 'John',
  lastName: 'Doe',
  trash: 555,
};

const TARGET = {
  id: SOURCE.productId,
  name: SOURCE.firstName,
  fullName: `${SOURCE.firstName} ${SOURCE.lastName}`,
};

// $FlowIgnore
describe('converter()', () => {
  // $FlowIgnore
  it('converts source into target according to provided rules', () => {
    const target = converter(RULES, SOURCE);
    expect(target).to.be.deep.equal(TARGET);
  });
});

describe('converterFactory()', () => {
  // $FlowIgnore
  it('creates a function', () => {
    const convert = converterFactory(RULES);
    expect(convert).to.be.a.function; // eslint-disable-line no-unused-expressions
  });
  it('created converter converts source into target according to provided rules', () => {
    const convert = converterFactory(RULES);
    const target = convert(SOURCE);
    expect(target).to.be.deep.equal(TARGET);
  });
});
