type ComputerArgs = {
  program: string;
  valueOverrides?: {
    [index: number]: number;
  }[];
};

export const computer = ({ program, valueOverrides }: ComputerArgs): any => {
  // initialize computer's memory
  const memory: number[] = program.split(",").map(Number);

  if (valueOverrides) {
    valueOverrides.forEach((override) => {
      const key = Number(Object.keys(override));
      const value = Number(Object.values(override));

      memory[key] = value;
    });
  }
  // TODO replace with getJumpForward() method
  const jumpForward: number = 4;

  for (let i = 0; i < memory.length; i += jumpForward) {
    const instruction = memory.slice(i, i + jumpForward);
    let [opcode, param1, param2, destParam] = instruction;

    switch (opcode) {
      case 1:
        memory[destParam] = memory[param1] + memory[param2];
        break;
      case 2:
        memory[destParam] = memory[param1] * memory[param2];
        break;
      case 99:
        return memory;
    }
  }
};
