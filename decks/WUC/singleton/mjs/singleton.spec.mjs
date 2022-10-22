import { Singleton } from './singleton.mjs';
import assert from 'node:assert/strict';

const instance1 = new Singleton();
const instance2 = new Singleton();

assert.strictEqual(instance1, instance2);
