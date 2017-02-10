Simple Object Transformer
=========================

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

The lib exports __converterFactory__ by default, which allows partial application.
I.e. it takes _Rules_, and returns a _Converter_, that expects only _Source_ object.

In addition, ordinary __converter__ could be imported by name. It expects both
_Rules_ and _Source_ objects as arguments.

Examples
--------
TODO (see tests)

Special notes
-------------
To use it as a library you should add "stage-0" preset to your babel configuration,
 because of object destructuring being used in the code.

Author
------
Eldar A. <eldar.aliyev8@gmail.com>
