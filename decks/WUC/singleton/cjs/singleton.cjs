class Singleton {
  static #instance

  constructor () {
    if (!Singleton.instance) {
      // Initialization
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
};

module.exports = Singleton;
