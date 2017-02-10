// @flow

import { expect } from 'chai';

import { transformerFactory, transformer } from './index';

const RULES = Object.freeze({
  id: 'productId',
  name: 'firstName',
  fullName: (context) => `${context.firstName} ${context.lastName}`,
});

const SOURCE = Object.freeze({
  productId: 123,
  firstName: 'John',
  lastName: 'Doe',
  trash: 555,
});

const EXPECTED_TARGET = Object.freeze({
  id: SOURCE.productId,
  name: SOURCE.firstName,
  fullName: `${SOURCE.firstName} ${SOURCE.lastName}`,
});

// $FlowIgnore
describe('transformer()', () => {
  // $FlowIgnore
  it('converts source into target according to provided rules', () => {
    const target = transformer(RULES, SOURCE);
    expect(target).to.be.deep.equal(EXPECTED_TARGET);
  });
});

describe('transformerFactory()', () => {
  // $FlowIgnore
  it('creates a function', () => {
    const convert = transformerFactory(RULES);
    expect(convert).to.be.a.function; // eslint-disable-line no-unused-expressions
  });
  it('created transformer converts source into target according to provided rules', () => {
    const convert = transformerFactory(RULES);
    const target = convert(SOURCE);
    expect(target).to.be.deep.equal(EXPECTED_TARGET);
  });
});
