const { partOne, partTwo } = require("./index");

describe("partOne", () => {
  it("should return the product of the number of strings with double letters and the number of strings with triple letters", () => {
    expect(
      partOne("abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab")
    ).toEqual(12);
  });
});

describe("partTwo", () => {
  it("should the common characters from two strings with the difference of a single character from an array of strings", () => {
    expect(partTwo("abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz")).toEqual(
      "fgij"
    );
  });
});
