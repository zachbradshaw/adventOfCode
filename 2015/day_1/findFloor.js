const findFloor = input => {
    let floor = 0;
    input.split('').forEach(char => {
        if (char === '(') {
            floor++;
        } else if (char === ')') {
            floor--;
        }
    });

    return floor;
};

module.exports = findFloor;
