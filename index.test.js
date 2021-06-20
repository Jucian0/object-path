const { set, del } = require("./index");

describe("test set function with objects", () => {
  const defaultObject = {
    name: "jucian0",
    email: "juciano@juciano.com",
    address: {
      street: "Doesn't meter",
      number: 1090,
      deep: {
        test: "deep",
      },
    },
  };

  it("should change first layer", () => {
    const newName = "Antonio";

    const result = set(defaultObject, "name", newName);

    expect(result).toEqual({
      ...defaultObject,
      name: newName,
    });
  });

  it("should change second layer", () => {
    const street = "NewStreet";

    const result = set(defaultObject, "address.street", street);

    expect(result).toEqual({
      ...defaultObject,
      address: {
        ...defaultObject.address,
        street: street,
      },
    });
  });

  it("should change thirty layer", () => {
    const deep = "NewDeep";

    const result = set(defaultObject, "address.deep.test", deep);

    expect(result).toEqual({
      ...defaultObject,
      address: {
        ...defaultObject.address,
        deep: {
          test: deep,
        },
      },
    });
  });

  it("should assign object", () => {
    const object = {
      property: "value",
    };

    const result = set(defaultObject, "address.deep", object);

    expect(result).toEqual({
      ...defaultObject,
      address: {
        ...defaultObject.address,
        deep: object,
      },
    });
  });

  it("default object and final object should be different", () => {
    const object = {
      property: "value",
    };

    const result = set(defaultObject, "address.deep.test", object);

    expect(defaultObject).not.toEqual(result);
  });

  it("should assign a new object", () => {
    const value = {
      newObject: {
        test: "test",
      },
    };

    const result = set(defaultObject, "address.deep.test", value);

    expect(result).toEqual({
      ...defaultObject,
      address: {
        ...defaultObject.address,
        deep: {
          test: value,
        },
      },
    });
  });
});

describe("test set function with arrays", () => {
  const defaultObject = {
    name: "jucian0",
    email: "juciano@juciano.com",
    address: {
      info: [],
    },
  };

  it("should assign an array", () => {
    const array = [1, 2, 3, 4, 1000000];

    const result = set(defaultObject, "address.info", array);
    const expected = {
      ...defaultObject,
      address: {
        ...defaultObject.address,
        info: array,
      },
    };

    expect(result).toEqual(expected);
  });

  it("should assign a value in an array", () => {
    const value = 1;

    const result = set(defaultObject, "address.info.3", value);

    expect(result).toEqual({
      ...defaultObject,
      address: {
        ...defaultObject.address,
        info: [undefined, undefined, undefined, 1],
      },
    });
  });

  it("should assign an array in another position", () => {
    const value = [1, 2, 3, 4];

    const result = set(defaultObject, "list", value);

    expect(result).toEqual({
      ...defaultObject,
      list: value,
    });
  });

  it("should assign a value in an array with other values", () => {
    const value = [1, 2, 3, 4];

    const result = set(defaultObject, "address.info", value);
    const expected = {
      ...defaultObject,
      address: {
        info: value,
      },
    };

    expect(result).toEqual(expected);
  });

  it("should change a specific value of an array", () => {
    const value = [1, 2, 3, 4];

    const result = set(defaultObject, "address.info.0", value);
    const expected = {
      ...defaultObject,
      address: {
        info: [value],
      },
    };
    expect(result).toEqual(expected);
  });
});

describe("test del function", () => {
  const defaultObject = {
    name: "Jucian0",
    email: "juciano@juciano.com",
    address: {
      details: {
        street: "Street",
        number: 1220,
        list: [1, 2, 3, 4, 5],
      },
    },
  };

  it("should delete a value at thirsty layer", () => {
    const result = del(defaultObject, "address.details.street");

    const expected = {
      ...defaultObject,
      address: {
        details: {
          number: defaultObject.address.details.number,
          list: [1, 2, 3, 4, 5],
        },
      },
    };
    expect(result).toEqual(expected);
  });

  it("should delete an array at thirsty layer", () => {
    const result = del(defaultObject, "address.details.list");

    const expected = {
      ...defaultObject,
      address: {
        details: {
          number: defaultObject.address.details.number,
          street: "Street",
        },
      },
    };
    expect(result).toEqual(expected);
  });

  it("should delete a value of an array", () => {
    const result = del(defaultObject, "address.details.list.3");

    const expected = {
      ...defaultObject,
      address: {
        details: {
          number: defaultObject.address.details.number,
          list: [1, 2, 3, 5],
          street: "Street",
        },
      },
    };
    expect(result).toEqual(expected);
  });
});
