const paper = input => {
    let total = 0;
    input.split('\n').forEach(block => {
        let [length, width, height] = block.split('x');
        let sorted = block.split('x').sort((a, b) => a - b);
        let extraPaper = sorted[0] * sorted[1];

        let surfaceArea =
            2 * (length * width + width * height + height * length);
        total += surfaceArea;
        total += extraPaper;
    });

    return total;
};

module.exports = paper;
