function propToPath(prop) {
  return prop
    .replaceAll("][", ".")
    .replaceAll("]", ".")
    .replaceAll("[", ".")
    .split(".");
}

module.exports = {
  propToPath,
};
