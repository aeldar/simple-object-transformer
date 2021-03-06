Simple Object Transformer
=========================

[![Build Status](https://travis-ci.org/aeldar/simple-object-transformer.svg?branch=master)](https://travis-ci.org/aeldar/simple-object-transformer)
[![Build status](https://ci.appveyor.com/api/projects/status/xntriortwirhr5q9?svg=true)](https://ci.appveyor.com/project/aeldar/simple-object-transformer)
[![npm version](https://badge.fury.io/js/simple-object-transformer.svg)](https://badge.fury.io/js/simple-object-transformer)
[![Coverage Status](https://coveralls.io/repos/github/aeldar/simple-object-transformer/badge.svg?branch=master)](https://coveralls.io/github/aeldar/simple-object-transformer?branch=master)
[![Dependencies Status](https://david-dm.org/aeldar/simple-object-transformer.svg)](https://david-dm.org/aeldar/simple-object-transformer)
[![NSP Status](https://nodesecurity.io/orgs/aeldar/projects/792bff03-a7a8-4ced-867a-ca3bcba9851d/badge)](https://nodesecurity.io/orgs/aeldar/projects/792bff03-a7a8-4ced-867a-ca3bcba9851d)
[![Greenkeeper badge](https://badges.greenkeeper.io/aeldar/simple-object-transformer.svg)](https://greenkeeper.io/)

[![NPM](https://nodei.co/npm/simple-object-transformer.png)](https://nodei.co/npm/simple-object-transformer/)


Declare Rules to transform flat JS object into another flat JS object.
 Useful for simple transformations between internal state objects
 and server requests/responses.

How to use
----------

_Rules_ is an object with property names equals to the target property name,
and the value is one of:

1. String - then it is considered the property name of the source object,
 and should be copied into the target **as is** to specified target property (same
 as rule's name).
2. Function - then this function will be applied to the source object and optional
 property name, and the result will be assigned to the target's property (same
 as rule's name).
3. TODO: null|undefined - just copy the value from the same source's property.

The lib exports __transformerFactory__ by default, which allows partial application.
I.e. it takes _Rules_, and returns a _Converter_, that expects only _Source_ object.

In addition, ordinary __transformer__ could be imported by name. It expects both
_Rules_ and _Source_ objects as arguments.

Usage with flowtypes
--------------------
Import module functions from __src__ directory of the package, instead of a default
(which is compiled to ES5 version inside __dist__ directory)

Examples
--------

```javascript
// const transformerFactory = require('simple-object-transformer').transformerFactory;
import { transformerFactory } from 'simple-object-transformer';

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

// create a transformer based on the rules, specified as argument
const transformer = transformerFactory(RULES);
const target = transformer(SOURCE);

console.log(target); // { id: 123, name: 'John', fullName: 'John Doe' }
```

For more examples see tests.

Special notes
-------------
To use it as a library you should add "stage-0" preset to your babel configuration,
 because of object destructuring being used in the code. Also you need
 babel's __transform-flow-strip-types__ plugin as the code uses flowtype.

TODO
----
* implement 'undefined' rule.

Author
------
Eldar A. <eldar.aliyev8@gmail.com>
