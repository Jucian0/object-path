const { set } = require("./index");

const defaultObject = {
  name: "juciano de carvalho",
  email: "juciano@juciano.com",
  address: {
    street: "Doesn't meter",
    number: 1090,
    deep: {
      test: "deep",
      array: [],
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
        array: [],
        test: deep,
      },
    },
  });
});

it("should assign object", () => {
  const object = {
    property: "value",
  };

  const result = set(defaultObject, "address.deep.test", object);

  expect(result).toEqual({
    ...defaultObject,
    address: {
      ...defaultObject.address,
      deep: {
        test: object,
        array: [],
      },
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

it("should assign an array", () => {
  const array = [1, 2, 3, 4];

  const result = set(defaultObject, "address.deep.test", array);

  expect(defaultObject).not.toEqual(result);
});

it.only("should assign an value in an array", () => {
  const value = 1;

  const result = set(defaultObject, "address.deep.test.array.0", value);

  //console.log(defaultObject, result);

  expect(result).toEqual({
    ...defaultObject,
    address: {
      ...defaultObject.address,
      deep: {
        test: "deep",
        array: [1],
      },
    },
  });
});
