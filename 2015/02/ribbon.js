const ribbon = input => {
    let total = 0;
    input.split('\n').forEach(block => {
        let [length, width, height] = block.split('x');
        let asc = block.split('x').sort((a, b) => a - b);
        let perimeter = asc[0] * 2 + asc[1] * 2;
        let volume = length * width * height;

        total += perimeter;
        total += volume;
    });

    return total;
};

module.exports = ribbon;
