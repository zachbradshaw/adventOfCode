const multiSanta = input => {
    let realSanta = ['x: 0 y: 0'];
    let roboSanta = ['x: 0 y: 0'];
    let realSantaX = 0;
    let realSantaY = 0;
    let roboSantaX = 0;
    let roboSantaY = 0;

    input.split('').forEach((direction, index) => {
        const isRealSanta = index % 2 === 0;
        let currentSanta = isRealSanta ? realSanta : roboSanta;
        switch (direction) {
            case '^':
                isRealSanta ? realSantaY++ : roboSantaY++;
                break;
            case '>':
                isRealSanta ? realSantaX++ : roboSantaX++;
                break;
            case 'v':
                isRealSanta ? realSantaY-- : roboSantaY--;
                break;
            case '<':
                isRealSanta ? realSantaX-- : roboSantaX--;
                break;
        }

        currentSanta.push(
            `x: ${isRealSanta ? realSantaX : roboSantaX} y: ${
                isRealSanta ? realSantaY : roboSantaY
            }`
        );
    });

    const uniqueHouses = [...new Set(realSanta.concat(roboSanta))];
    return uniqueHouses.length;
};

module.exports = multiSanta;
