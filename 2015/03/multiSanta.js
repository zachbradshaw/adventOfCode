const multiSanta = input => {
    let realSanta = {
        houses: ['x: 0 y: 0'],
        x: 0,
        y: 0
    };
    let roboSanta = {
        houses: ['x: 0 y: 0'],
        x: 0,
        y: 0
    };

    input.split('').forEach((direction, index) => {
        const isRealSanta = index % 2 === 0;
        let currentSanta = isRealSanta ? realSanta : roboSanta;

        switch (direction) {
            case '^':
                currentSanta.y++;
                break;
            case '>':
                currentSanta.x++;
                break;
            case 'v':
                currentSanta.y--;
                break;
            case '<':
                currentSanta.x--;
                break;
        }

        currentSanta.houses.push(`x: ${currentSanta.x} y: ${currentSanta.y}`);
    });

    const uniqueHouses = [
        ...new Set(realSanta.houses.concat(roboSanta.houses))
    ];
    return uniqueHouses.length;
};

module.exports = multiSanta;
