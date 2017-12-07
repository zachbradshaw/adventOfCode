const digits = [...document.body.textContent.trim()].map(Number);
const captcha = (input, interval) => {
    let sum = 0;
    input.forEach((num, index, arr) => {
        const nextNum = arr[(index + interval) % arr.length];
        if (num === nextNum || (nextNum === undefined && num === arr[0])) {
            sum = sum + num;
        }
    });
    console.log(sum);
};

captcha(digits, 1);
captcha(digits, digits.length / 2);
