const { partOne, partTwo } = require("./index");

describe("partOne", () => {
  it("should return the sum of a string of numbers", () => {
    expect(partOne("+1\n+1\n+1")).toEqual(3);
    expect(partOne("+1\n+1\n-2")).toEqual(0);
    expect(partOne("-1\n-2\n-3")).toEqual(-6);
  });
});

describe("partTwo", () => {
  it("should find the first duplicate value in a loop", () => {
    expect(partTwo("+3\n+3\n+4\n-2\n-4")).toEqual(10);
    expect(partTwo("-6\n+3\n+8\n+5\n-6")).toEqual(5);
    expect(partTwo("+7\n+7\n-2\n-7\n-4")).toEqual(14);
  });
});
