let instance;

class Singleton {
  constructor () {
    // Initialization
  }
};

module.exports = function singletonFactory () {
  if (!instance) {
    instance = new Singleton();
  }
  return instance;
};
