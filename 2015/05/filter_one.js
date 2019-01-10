const filter = input => {
    let niceStrings = 0;
    input.forEach(string => {
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        const badPairs = ['ab', 'cd', 'pq', 'xy'];
        let vowelCount = 0;
        let enoughVowels = false;
        let doubleLetter = false;
        let noBadPairs = true;

        string.split('').forEach((char, index) => {
            if (vowels.includes(char)) {
                vowelCount++;
                if (vowelCount >= 3) {
                    enoughVowels = true;
                }
            }

            if (char === string[index + 1]) {
                doubleLetter = true;
            }

            if (badPairs.includes(`${char}${string[index + 1]}`)) {
                noBadPairs = false;
            }
        });

        if (enoughVowels && doubleLetter && noBadPairs) {
            niceStrings++;
        }
    });

    return niceStrings;
};

module.exports = filter;
