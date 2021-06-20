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
    let clone = Object.assign({}, object);

    if (paths.length > index) {
      if (Array.isArray(object)) {
        paths[index] = parseInt(paths[index]);
        clone = object.slice();
      }
      clone[paths[index]] = setPropertyValue(object[paths[index]], index + 1);

      return clone;
    }
    return value;
  }

  return setPropertyValue(defaultObject, 0);
}

function del(defaultObject, prop) {
  const paths = propToPath(prop);

  function setPropertyValue(object, index) {
    let clone = Object.assign({}, object);

    if (paths.length > index) {
      const result = setPropertyValue(object[paths[index]], index + 1);

      if (typeof result !== "undefined") {
        clone[paths[index]] = result;
      } else {
        delete clone[paths[index]];
      }

      return clone;
    }

    return undefined;
  }

  return setPropertyValue(defaultObject, 0);
}

module.exports = {
  set,
  del,
};
