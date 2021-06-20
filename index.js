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

function mutable(object, prop, value) {
  const paths = propToPath(prop);

  function setPropertyValue(partialObject, index) {
    const nextPath = index + 1;

    if (Array.isArray(partialObject[paths[index]])) {
      const newArray = partialObject[paths[index]];
      newArray[paths[index + 1]] = value;
    }

    if (partialObject.hasOwnProperty(paths[index])) {
      const data = partialObject[paths[index]];

      if (typeof data === "object") {
        return setPropertyValue(data, nextPath);
      }
    } else {
      if (index <= paths.length && !!paths[nextPath]) {
        if (isNaN(parseInt(paths[nextPath]))) {
          const newObject = Object.assign(partialObject, {
            [paths[index]]: {},
          });

          return setPropertyValue(newObject, index);
        }

        const newArray = Object.assign(partialObject, { [paths[index]]: [] });

        return setPropertyValue(newArray, index);
      }
    }

    return (partialObject[paths[index]] = value);
  }

  return setPropertyValue(object, 0);
}

function set(defaultObject, prop, value) {
  const paths = propToPath(prop);

  function setPropertyValue(object, index) {
    const nextPath = index + 1;

    if (object.hasOwnProperty(paths[index])) {
      const dataOrObject = object[paths[index]];
      const clone = Object.assign({}, object);

      if (Array.isArray(object[paths[nextPath]])) {
        clone[paths[nextPath]][paths[nextPath + 1]] = value;
        return clone;
      }

      if (typeof dataOrObject === "object") {
        clone[paths[index]] = setPropertyValue(dataOrObject, nextPath);
      } else {
        clone[paths[index]] = value;
      }
      return clone;
    }
    return object;
  }

  return setPropertyValue(defaultObject, 0);
}

module.exports = {
  set,
};
