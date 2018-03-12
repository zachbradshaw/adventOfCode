const findFloorIndex = input => {
    let floor = 0;
    let basementIndex = [];

    input.split('').forEach((char, index) => {
        if (char === '(') {
            floor++;
        } else if (char === ')') {
            floor--;

            if (floor === -1) {
                basementIndex.push(index + 1);
            }
        }
    });

    return basementIndex[0];
};

module.exports = findFloorIndex;
