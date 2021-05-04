const VOWELS = ['a', 'e', 'i', 'o', 'u'];
const countVowels = (word, counter) => {
    debugger;
    for (let i = 0; i < word.length; i++) {
        let char = word[i];
        if (VOWELS.includes(char)) {
            if (counter[char]) {
                counter[char]++;
            } else {
                counter[char] = 1;
            }
        }
    }
};
const largestValue = (counter) => {
    debugger;
    let vowel = '';
    let max = 0;
    for (let currentVowel in counter) {
        if (counter[currentVowel] > max) {
            vowel = currentVowel;
            max = counter[currentVowel];
        }
    }
    return vowel;
};


const mostFrequentVowel = function (words, counter = {}) {
    debugger;
    if (!words.length) {
        return largestValue(counter);
    }
    countVowels(words.pop(), counter);
    return mostFrequentVowel(words, counter);
};


console.log(mostFrequentVowel(['dog', 'cow', 'pig', 'chicken'])); // 'i' or 'o'