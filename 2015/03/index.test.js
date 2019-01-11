const { partOne, partTwo } = require("./index");

describe("singleSanta", () => {
  it("should return 2", () => {
    expect(partOne(">")).toEqual(2);
  });

  it("should return 4", () => {
    expect(partOne("^>v<")).toEqual(4);
  });

  it("should return 2", () => {
    expect(partOne("^v^v^v^v^v")).toEqual(2);
  });
});

describe("multiSanta", () => {
  it("should return 3", () => {
    expect(partTwo("^v")).toEqual(3);
  });

  it("should return 3", () => {
    expect(partTwo("^>v<")).toEqual(3);
  });

  it("should return 11", () => {
    expect(partTwo("^v^v^v^v^v")).toEqual(11);
  });
});
