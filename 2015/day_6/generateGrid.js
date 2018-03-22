const generateGrid = size => {
    let grid = [];
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            grid.push({ power: false, brightness: 0, x: x, y: y });
        }
    }
    return grid;
};

module.exports = generateGrid;
