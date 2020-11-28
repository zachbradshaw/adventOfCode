const path = require("path");
const fs = require("fs");
const puzzleInput = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const createReactionGuide = reactions => {
  const guide = {};
  reactions.split("\n").forEach(reaction => {
    const ingredients = {};
    const [input, output] = reaction.split(" => ");
    const splitIngredients = input.split(", ");
    splitIngredients.forEach(ing => {
      const [amount, type] = ing.split(" ");
      ingredients[type] = Number(amount);
    });
    const [resultAmount, resultType] = output.split(" ");

    guide[resultType] = {
      name: resultType,
      ingredients
    };
    if (ingredients["ORE"]) {
      guide[resultType].amountProduced = Number(resultAmount);
    }
  });
  return guide;
};

const updateRequirements = (requirements, record) => {
  requirements.forEach(req => {
    console.log(req);

    if (req[0] === "ORE") {
      return;
    }
    if (!record[req[0]]) {
      record[req[0]] = { need: req[1], have: 0 };
    } else {
      record[req[0]].need += req[1];
    }
  });
  return record;
};

const partOne = input => {
  const reactionGuide = createReactionGuide(input);
  Object.entries(reactionGuide).forEach(entry => console.log(entry));

  const fuelIngredients = reactionGuide["FUEL"].ingredients;
  const record = {};
  let ore = 0;
  //   Object.entries(fuelIngredients).forEach(entry => {
  //     console.log(entry);
  //     console.log(reactionGuide[entry[0]]);
  //     if (reactionGuide[entry[0]].ingredients["ORE"]) {
  //       record[entry[0]] = { need: entry[1], have: 0 };
  //       while (record[entry[0]].have < record[entry[0]].need) {
  //         ore += reactionGuide[entry[0]].ingredients["ORE"];
  //         record[entry[0]].have += reactionGuide[entry[0]].amountProduced;
  //       }
  //     }
  //   });
  //   console.log(record);
  //   console.log(ore);

  //   Object.entries(fuelIngredients).forEach(entry => {
  //     // console.log(entry);

  //     record[entry[0]] = { need: entry[1], have: 0 };

  //     const { ingredients } = reactionGuide[entry[0]];
  //     Object.entries(ingredients).forEach(ing => {
  //       //   console.log(ing);
  //       if (ing[0] === "ORE") {
  //         return;
  //       }
  //       if (!record[ing[0]]) {
  //         record[ing[0]] = {
  //           need: ing[1] * entry[1],
  //           have: 0
  //         };
  //       } else {
  //         record[ing[0]].need += ing[1] * entry[1];
  //       }
  //       // if(!reactionGuide[ing].ingredients['ORE']) {
  //       //     record[ing] =
  //       // }
  //     });
  //     // console.log(entry[0], ingredients);
  //   });

  //   let ore = 0;
  //   Object.entries(record).forEach(entry => {
  //     // console.log(entry);
  //     if (entry[0] === "ORE") {
  //       return;
  //     }
  //     if (reactionGuide[entry[0]] && reactionGuide[entry[0]].ingredients["ORE"]) {
  //       // while(ore <)
  //       while (entry[1].need > entry[1].have) {
  //         ore += reactionGuide[entry[0]].ingredients["ORE"];
  //         entry[1].have += reactionGuide[entry[0]].amountProduced;
  //       }
  //     } else {
  //       //   console.log(reactionGuide[entry[0]]);
  //     }
  //   });

  //   console.log(record);
  //   console.log("ore required", ore);
};

partOne(puzzleInput);
