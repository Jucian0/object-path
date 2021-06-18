const set = require("./index");

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
  console.log(defaultObject, result);

  expect(result).toEqual({
    ...defaultObject,
    name: newName,
  });
});

it("should change second layer", () => {
  const street = "NewStreet";

  const result = set(defaultObject, "address.street", street);

  console.log(defaultObject, result);

  expect(result).toEqual({
    ...defaultObject,
    address: {
      ...defaultObject.address,
      street: street,
    },
  });
});

it.only("should change second layer", () => {
  const deep = "NewDeep";

  const result = set(defaultObject, "address.deep.test", deep);

  console.log(defaultObject, result);

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
