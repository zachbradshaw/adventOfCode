const file = await Deno.readTextFile(`${Deno.args}`);
const input = file.trim().split("\n");

const test = "HOH";
const test2 = 'HOHOHO'
const initial =
  `CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF`;

const lookup = input.reduce((prev: { [key: string]: string[] }, curr: string) => {
  const splitCurr = curr.split(" ");
  if (prev[splitCurr[0]]) {
    prev[splitCurr[0]] = [...prev[splitCurr[0]], splitCurr[2]];
  } else {
    prev[splitCurr[0]] = [splitCurr[2]];
  }

  return prev;
}, {});

const partOne = (init: string) => {
  const molecules: { [key: string]: number } = {};

  Object.keys(lookup).forEach((key) => {
    const replacements: string[] = lookup[key];
    const indices = [...init.matchAll(new RegExp(key, "g"))].map(
      (match) => match.index,
    )

    replacements.forEach((rep) => {
      indices.forEach((index) => {
        if (!index) {
          return
        }

        const copy = init.substring(0, index) + rep + init.substring(index + key.length);

        if (molecules[copy]) {
          molecules[copy] += 1;
        } else {
          molecules[copy] = 1;
        }
      });
    });
  });

  console.log('Part one:', Object.keys(molecules).length);
};

partOne(initial);
