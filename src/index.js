'use strict';
var Alexa = require('alexa-sdk');

var states = {
    NOERGELMODE: '_NOERGELMODE',
    STARTMODE:   '_STARTMODE'
};

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

var newSessionHandlers = {
    'NewSession':          function () {
        if (Object.keys(this.attributes).length === 0) {
            this.attributes['lastNoergler'] = null;
        }

        this.handler.state = states.STARTMODE;

        var question = getDefaultAnswer() + '. Soll ich weiternörgeln?';

        if (this.attributes['lastNoergler']) {
            question = question + ' Der letzte Nörgler hier war natürlich wieder ' + this.attributes['lastNoergler']
        }

        this.emit(
            ':ask', question,
            'Ja oder nein, Mann!'
        );

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

        this.emit(':ask', 'Ja oder nein, Mann!', message);
    }
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.dynamoDBTableName = 'Noergel';
    alexa.registerHandlers(newSessionHandlers);
    alexa.execute();
};