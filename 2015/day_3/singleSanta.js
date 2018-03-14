const singleSanta = input => {
    let houses = ['x: 0 y: 0'];
    let x = 0;
    let y = 0;

    input.split('').forEach((direction, index) => {
        switch (direction) {
            case '^':
                y++;
                break;
            case '>':
                x++;
                break;
            case 'v':
                y--;
                break;
            case '<':
                x--;
                break;
        }

        houses.push(`x: ${x} y: ${y}`);
    });

    const uniqueHouses = [...new Set(houses)];
    return uniqueHouses.length;
};

module.exports = singleSanta;
