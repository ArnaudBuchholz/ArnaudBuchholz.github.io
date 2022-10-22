const singletonFactory = require('./singletonFactory.cjs');
const assert = require('node:assert/strict');

const instance1 = singletonFactory();
const instance2 = singletonFactory();

assert.strictEqual(instance1, instance2);
