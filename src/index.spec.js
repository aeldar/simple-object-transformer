import { expect } from 'chai';

import { transformerFactory, transformer } from './index';

const RULES = Object.freeze({
  id: 'productId',
  name: 'firstName',
  fullName: context => `${context.firstName} ${context.lastName}`,
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
  describe('throws error in case of unsupported rule type', () => {
    it('for rule as array', () => {
      const rules = Object.freeze({ id: [] });
      const fn = transformer.bind(rules, SOURCE);
      expect(fn).to.throw(Error);
    });
    it('for rule as object', () => {
      const rules = Object.freeze({ id: {} });
      const fn = transformer.bind(rules, SOURCE);
      expect(fn).to.throw(Error);
    });
    it('for rule as number', () => {
      const rules = Object.freeze({ id: 3 });
      const fn = transformer.bind(rules, SOURCE);
      expect(fn).to.throw(Error);
    });
    it('for rule as null', () => {
      const rules = Object.freeze({ id: null });
      const fn = transformer.bind(rules, SOURCE);
      expect(fn).to.throw(Error);
    });
    it('for rule as undefined', () => {
      const rules = Object.freeze({ id: undefined });
      const fn = transformer.bind(rules, SOURCE);
      expect(fn).to.throw(Error);
    });
  });
});

describe('transformerFactory()', () => {
  // $FlowIgnore
  it('creates a function', () => {
    const tformer = transformerFactory(RULES);
    expect(tformer).to.be.a.function;
  });
  it('created transformer converts source into target according to provided rules', () => {
    const tformer = transformerFactory(RULES);
    const target = tformer(SOURCE);
    expect(target).to.be.deep.equal(EXPECTED_TARGET);
  });
});
