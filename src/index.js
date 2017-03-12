'use strict';
var Alexa = require('alexa-sdk');

var answers = [
    '__NOERGEL, du Schwanz',
    '__NOERGEL',
    'schon wieder?'
];

var answerNames = [
    '__NAME, du Schwanz, hör auf herumzunörgeln',
    '__NOERGEL, __NAME'
];

function formatAnswer (answer, name) {
    var count = getRandomNumber(1, 5);
    var noergels = 'Nörgel '.repeat(count).trim();
    var formattedAnswer = answer.replace(/__NOERGEL/g, noergels);

    if (name) {
        formattedAnswer = answer.replace(/__NAME/g, name);
    }

    return formattedAnswer;
}

function getDefaultAnswer () {

    var formattedAnswer = formatAnswer('__NOERGEL');

    return formattedAnswer;
}

function getRandomAnswer (name) {
    var target = (
        name ? answerNames : answers
    );
    var randomAnswer = target[Math.floor(Math.random() * target.length)];
    var formattedAnswer = formatAnswer(randomAnswer, name);

    return formattedAnswer;
}

function getRandomNumber (min, max) {
    return Math.random() * (
            max - min
        ) + min;
}

var noergelHandlers = {
    'NewSession':          function () {
        var question = getDefaultAnswer();
        this.emit(
            ':ask', question,
            'Ja oder nein, Mann!'
        );

    },
    'CorneliaIntent':      function () {
        this.emit(':ask', 'Cornelia.');
    },
    'VeryYesIntent':       function () {
        this.emit(':ask', 'Oh Gott, ja.');
    },
    'AMAZON.StopIntent':   function () {
        this.emit(':tell', getDefaultAnswer());
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', getDefaultAnswer());
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', getDefaultAnswer());
    },
    'Unhandled':           function () {
        console.log('Unhandled');

        this.emit(':ask', getDefaultAnswer());
    }
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(noergelHandlers);
    alexa.execute();
};