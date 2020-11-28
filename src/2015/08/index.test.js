const { partOne, partTwo } = require("./index");

const testString = '""\n"abc"\n"aaaaaa"\n"\x27"';

describe("partOne", () => {
  it("should return the total differences of the string literal and the number of chars in the in memory string from an array of strings", () => {
    expect(partOne(testString)).toEqual(8);
  });
});

describe("partTwo", () => {
  it("should return the total differences of the number of chars in the in memory string and the length of the string literal", () => {
    expect(partTwo(testString)).toEqual(16);
  });
});
