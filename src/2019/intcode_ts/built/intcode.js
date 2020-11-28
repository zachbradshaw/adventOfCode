"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computer = void 0;
exports.computer = ({ program, valueOverrides }) => {
    // initialize computer's memory
    const memory = program.split(",").map(Number);
    if (valueOverrides) {
        valueOverrides.forEach((override) => {
            const key = Number(Object.keys(override));
            const value = Number(Object.values(override));
            memory[key] = value;
        });
    }
    // TODO replace with getJumpForward() method
    const jumpForward = 4;
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
