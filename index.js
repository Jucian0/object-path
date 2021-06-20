const { propToPath, isPrimitive } = require("./utils");

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

  function deletePropertyValue(object, index) {
    let clone = Object.assign({}, object);

    if (paths.length > index) {
      if (Array.isArray(object)) {
        paths[index] = parseInt(paths[index]);
        clone = object.slice();
      }

      if (Array.isArray(object)) {
        clone.splice(paths[index], 1);
      } else {
        const result = deletePropertyValue(object[paths[index]], index + 1);

        typeof result === "undefined"
          ? delete clone[paths[index]]
          : (clone[paths[index]] = result);
      }

      return clone;
    }
    return undefined;
  }

  return deletePropertyValue(defaultObject, 0);
}

function get(defaultObject, prop) {
  const paths = propToPath(prop);

  function getPropertyValue(object, index) {
    const clone = Object.assign({}, object);
    if (paths.length === index + 1) {
      if (Array.isArray(clone[paths[index]])) {
        return clone[paths[index]].slice();
      } else if (typeof clone[paths[index]] === "object") {
        return Object.assign({}, clone[paths[index]]);
      }
      return clone[paths[index]];
    }
    return getPropertyValue(object[paths[index]], index + 1);
  }

  return getPropertyValue(defaultObject, 0);
}

function merge(defaultObject, prop, value) {
  const targetValue = get(defaultObject, prop);
  if (typeof targetValue === "undefined" || isPrimitive(value)) {
    throw new Error("Target value is undefine, verify your property path");
  }

  if (Array.isArray(value)) {
    if (!Array.isArray(targetValue)) {
      throw new Error("The bot values should be arrays");
    }
    const resultValue = targetValue.concat(value);
    return set(defaultObject, prop, resultValue);
  }

  const resultValue = Object.assign(targetValue, value);

  return set(defaultObject, prop, resultValue);
}

module.exports = {
  set,
  del,
  get,
  merge,
};
