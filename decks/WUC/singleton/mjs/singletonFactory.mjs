let instance;

class Singleton {
  constructor () {
    // Initialization
  }
};

export function singletonFactory () {
  if (!instance) {
    instance = new Singleton();
  }
  return instance;
};
