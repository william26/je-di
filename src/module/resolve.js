function resolve(names) {
  return names.map((name) => this.get(name));
};
module.exports = resolve;
