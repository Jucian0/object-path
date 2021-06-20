const { set } = require("./index");

describe("tests with objects", () => {
  const defaultObject = {
    name: "juciano de carvalho",
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

describe("tests with arrays", () => {
  const defaultObject = {
    name: "juciano de carvalho",
    email: "juciano@juciano.com",
    address: {
      info: [],
    },
  };

  it("should assign an array", () => {
    const array = [1, 2, 3, 4];

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

    const result = set(defaultObject, "address.info.0", value);

    expect(result).toEqual({
      ...defaultObject,
      address: {
        ...defaultObject.address,
        info: [1],
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

    const result = set(defaultObject, "info", value);

    console.log(result);

    expect(result).toEqual({
      ...defaultObject,
      info: value,
    });
  });
});
