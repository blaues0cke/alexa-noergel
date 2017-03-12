'use strict';
var Alexa = require('alexa-sdk');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var answers = [
    '__NOERGEL, du Schwanz',
    '__NOERGEL',
    'schon wieder?'
];

function formatAnswer (answer) {
    var count = getRandomNumber(1, 5);
    var noergels = 'Nörgel '.repeat(count).trim();
    var formattedAnswer = answer.replace(/__NOERGEL/g, noergels);

    return formattedAnswer;
}

function getRandomAnswer () {
    var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    var formattedAnswer = formatAnswer(randomAnswer);

    return formattedAnswer;
}

function getRandomNumber (min, max) {
    return Math.random() * (
            max - min
        ) + min;
}

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'NoergelIntent': function () {
        this.emit('SayHello')
    },
    'SayHello':      function () {
        this.emit(':tell', getRandomAnswer());
    }
};