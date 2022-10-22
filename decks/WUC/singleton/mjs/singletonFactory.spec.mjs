import { singletonFactory } from './singletonFactory.mjs';
import assert from 'node:assert/strict';

const instance1 = singletonFactory();
const instance2 = singletonFactory();

assert.strictEqual(instance1, instance2);
