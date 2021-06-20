function propToPath(prop) {
  return prop
    .replaceAll("][", ".")
    .replaceAll("]", ".")
    .replaceAll("[", ".")
    .split(".");
}

function isPrimitive(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

function set(defaultObject, prop, value) {
  const paths = propToPath(prop);

  function setPropertyValue(object, index) {
    const clone = Object.assign({}, object);

    if (Array.isArray(clone[paths[index]])) {
      if (Array.isArray(value)) {
        clone[paths[index]] = value;
      } else {
        clone[paths[index]][index - 1] = value;
      }
    } else if (typeof clone[paths[index]] === "object") {
      if (paths.length > index + 1) {
        clone[paths[index]] = setPropertyValue(clone[paths[index]], index + 1);
      } else {
        clone[paths[index]] = value;
      }
    } else {
      clone[paths[index]] = value;
    }
    return clone;
  }

  return setPropertyValue(defaultObject, 0);
}

module.exports = {
  set,
};
