const { partOne, partTwo } = require("./index");

describe("partOne", () => {
  it("should return 1", () => {
    expect(partOne("(()")).toEqual(1);
  });

  it("should return -1", () => {
    expect(partOne("((())))")).toEqual(-1);
  });
});

describe("partTwo", () => {
  it("should return 5", () => {
    expect(partTwo("(()))")).toEqual(5);
  });

  it("should return 3", () => {
    expect(partTwo("())")).toEqual(3);
  });
});
