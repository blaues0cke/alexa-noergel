/**
 * Created by thomaskekeisen on 15/03/2017.
 */
const util = {
    getRandomArrayItem: function (array) {
        return array[Math.floor(Math.random() * array.length)];
    },
    getRandomNumber:    function (min, max) {
        // @formatter:off
        return Math.random() * (max - min) + min;
        // @formatter:off
    }
};

module.exports = util;