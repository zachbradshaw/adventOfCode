const arr = document.body.textContent
    .trim()
    .split('\n')
    .map(str => str.replace(/\s+/g, ' ').trim())
    .map(str => str.split(' '))
    .map(n => n.map(Number));
const add = (a, b) => a + b;

const checkSum = arr.map(a => Math.max(...a) - Math.min(...a)).reduce(add);

const nums = [];
arr.forEach(a => {
    for (let i = 0; i < a.length; ++i) {
        for (let j = 0; j < a.length; ++j) {
            if (a[i] % a[j] === 0 && a[i] !== a[j]) {
                nums.push(a[i] / a[j]);
            }
        }
    }
});
const checkSumDivisible = nums.reduce(add);

console.log(checkSum);
console.log(checkSumDivisible);
