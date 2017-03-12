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
        formattedAnswer = answer.replace(/__NAME/g, noergels);
    }

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

var handlers = {
    'LaunchRequest': function () {
        this.emit(':tell', 'test');
        //this.emit('SayHello');
    },
    'NoergelIntent': function () {
        this.emit('SayHello')
    },
    'SayHello':      function () {
        var name = this.event.request.intent.slots.name;

        this.emit(':tell', getRandomAnswer(name));
    }
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.dynamoDBTableName = 'Noergel';
    alexa.registerHandlers(handlers);
    alexa.execute();
};