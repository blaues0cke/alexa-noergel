/**
 * Created by thomaskekeisen on 15/03/2017.
 */

var language = require('./language');
var util = require('./util');

// @formatter:off
var textBuilder = {
    build: function (text) {
        // TODO: format + add nörgels

        return text;
    },
    getRandomNoergel: function () {
        var count    = util.getRandomNumber(1, 5);
        var noergels = (language.noergel + ' ').repeat(count).trim();

        return noergels;
    },
    replacePlaceholders: function (answer) {
        var noergels        = textBuilder.getRandomNoergel();
        var formattedAnswer = answer.replace(/__NOERGEL/g, noergels);

        return formattedAnswer;
    },
    noergel: function () {
        return textBuilder.replacePlaceholders('__NOERGEL');
    }
};
// @formatter:on

module.exports = textBuilder;