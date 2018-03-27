const fs = require('fs');

const input = fs
    .readFileSync('./input.txt', 'utf8')
    .trim()
    .split('\n');

const testInput = [
    '123 -> x',
    '456 -> y',
    'x AND y -> d',
    'x OR y -> e',
    'x LSHIFT 2 -> f',
    'y RSHIFT 2 -> g',
    'NOT x -> h',
    'NOT y -> io'
];

testInput.forEach(command => {
    command = command.split(' ');
    let commandInfo = {
        origin: [],
        value: null,
        destination: command.pop(),
        operator: null
    };

    console.log(commandInfo);
});
