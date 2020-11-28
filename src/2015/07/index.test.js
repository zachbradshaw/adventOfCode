const { partOneAndTwo } = require("./index");

describe("partOneAndTwo", () => {
  it("should take in an array of bitwise operation commands and return an object representing a complete circuit", () => {
    const input =
      "123 -> x\n456 -> y\nx AND y -> d\nx OR y -> e\nx LSHIFT 2 -> f\ny RSHIFT 2 -> g\nNOT x -> h\nNOT y -> i";
    const expectedOutput = {
      d: 72,
      e: 507,
      f: 492,
      g: 114,
      h: 65412,
      i: 65079,
      x: 123,
      y: 456
    };
    expect(partOneAndTwo(input)).toEqual(expectedOutput);
  });
});
