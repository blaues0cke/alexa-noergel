/**
 * Created by thomaskekeisen on 15/03/2017.
 */

var language = require('./language');
var util = require('./util');

// @formatter:off
var textBuilder = {
    getPersonAnswer: function (person) {
        return textBuilder.replacePlaceholders('__ANSWER_PREFIX' + person);
    },
    getRandomNoergel: function () {
        var count    = util.getRandomNumber(1, 5);
        var noergels = (language.noergel + ' ').repeat(count).trim();

        return noergels;
    },
    replacePlaceholders: function (answer) {
        var answerPrefix    = util.getRandomArrayItem(language.answerPrefixes);
        var noergels        = textBuilder.getRandomNoergel();
        var formattedAnswer = answer;
            formattedAnswer = formattedAnswer.replace(/__NOERGEL/g,       noergels);
            formattedAnswer = formattedAnswer.replace(/__ANSWER_PREFIX/g, answerPrefix + ' ');

        return formattedAnswer;
    },
    noergel: function () {
        return textBuilder.replacePlaceholders('__NOERGEL');
    }
};
// @formatter:on

module.exports = textBuilder;