const filter = input => {
    let niceStrings = 0;
    input.forEach(string => {
        let condition1 = false;
        let condition2 = false;
        let repeatingStrings = 0;

        string.split('').forEach((char, index) => {
            if (
                string.substring(index + 2).includes(char + string[index + 1])
            ) {
                condition1 = true;
            }

            if (char === string[index + 2]) {
                condition2 = true;
            }
        });

        if (condition1 && condition2) {
            niceStrings++;
        }
    });

    return niceStrings;
};

module.exports = filter;
