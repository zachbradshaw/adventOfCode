const { partOne, partTwo } = require("./index");

describe("partOne", () => {
  it("should return 58", () => {
    expect(partOne("2x3x4")).toEqual(58);
  });

  it("should return 43", () => {
    expect(partOne("1x1x10")).toEqual(43);
  });
});

describe("partTwo", () => {
  it("should return 34", () => {
    expect(partTwo("2x3x4")).toEqual(34);
  });

  it("should return 14", () => {
    expect(partTwo("1x1x10")).toEqual(14);
  });
});
