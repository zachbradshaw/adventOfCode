const input = "hxbxwxba";

function checkPassword(password) {
  let hasStraight = false;
  let pairCount = 0;
  for (let i = 0; i < password.length; i++) {
    if (i === password.length - 1) {
      break;
    }
    if (password[i] === password[i + 1]) {
      if (password[i] !== password[i - 1]) {
        pairCount++;
      }
    }
    if (password[i + 1] % password[i] === 1) {
      if (i === password.length - 2) {
        break;
      }
      if (
        password[i + 2] > password[i + 1] &&
        password[i + 2] % password[i + 1] === 1
      ) {
        hasStraight = true;
      }
    }
  }
  // console.log(password.map(num => validChars[num]).join(""));
  // console.log({ hasStraight: hasStraight, pairCount: pairCount });
  return hasStraight && pairCount >= 2;
}

// prettier-ignore
const validChars = ["a","b","c","d","e","f","g","h","j","k","m","n","p","q","r","s","t","u","v","w","x","y","z"];

function partOne(input) {
  if (checkPassword(input)) {
    console.log("new password:", input.map(num => validChars[num]).join(""));
    return;
  }
  // return false;

  // count++;

  for (let i = input.length - 1; i >= 0; i--) {
    if (input[i] < validChars.length - 1) {
      input[i]++;
      return partOne(input);
    } else if (input[i] === validChars.length - 1) {
      input[i] = 0;
    }
  }
}

partOne(
  input.split("").map(char => {
    return validChars.indexOf(char);
  })
);

module.exports = {
  partOne
};
