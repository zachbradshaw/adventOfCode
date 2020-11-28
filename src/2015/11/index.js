const input = "hxbxwxba";

function passwordValidator(password) {
  let hasStraight = false;
  let pairCount = 0;
  for (let i = 0; i < password.length; i++) {
    if (i === password.length - 1) {
      break;
    }
    // count pairs, but don't double count three of the
    // same chars in a row
    if (password[i] === password[i + 1]) {
      if (password[i] !== password[i - 1]) {
        pairCount++;
      }
    }
    // check for straight character sets like 'abc'
    if (password[i + 1] - password[i] === 1) {
      if (i === password.length - 2) {
        break;
      }
      if (
        password[i + 2] > password[i + 1] &&
        password[i + 2] - password[i + 1] === 1
      ) {
        hasStraight = true;
      }
    }
  }
  return hasStraight && pairCount >= 2;
}

// prettier-ignore
const validChars = ["a","b","c","d","e","f","g","h","j","k","m","n","p","q","r","s","t","u","v","w","x","y","z"];
let validPasswords = [];
function passwordGenerator(input, passwordCount) {
  if (passwordValidator(input)) {
    if (validPasswords.length < passwordCount) {
      validPasswords.push(input.map(num => validChars[num]).join(""));
      if (validPasswords.length === passwordCount) {
        console.log("new password(s):", validPasswords);
        return;
      }
    }
  }

  for (let i = input.length - 1; i >= 0; i--) {
    if (input[i] < validChars.length - 1) {
      input[i]++;
      return setTimeout(() => {
        passwordGenerator(input);
      });
    } else if (input[i] === validChars.length - 1) {
      input[i] = 0;
    }
  }
}

function partOne(input) {
  return passwordGenerator(input, 1);
}

function partTwo(input) {
  return passwordGenerator(input, 2);
}

// partOne(
//   input.split("").map(char => {
//     return validChars.indexOf(char);
//   })
// );

// partTwo(
//   input.split("").map(char => {
//     return validChars.indexOf(char);
//   })
// );

module.exports = {
  partOne,
  partTwo
};
