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

module.exports = function (object, prop, value) {
  const paths = propToPath(prop);
  //  const object = JSON.parse(JSON.stringify(defaultObject));

  function setPropertyValue(partialObject, index) {
    const nextPath = index + 1;

    if (partialObject.hasOwnProperty(paths[index])) {
      const dataOrObject = partialObject[paths[index]];

      if (typeof dataOrObject === "object") {
        return Object.assign(partialObject, {
          ...partialObject,
          [paths[index]]: setPropertyValue(dataOrObject, nextPath),
        });
      }
      return Object.assign(partialObject, { [paths[index]]: value });
    }
    return partialObject;
  }

  return setPropertyValue(object, 0);
};
