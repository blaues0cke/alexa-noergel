'use strict';
var Alexa = require('alexa-sdk');

const language = {
    help: 'Du nörgelst, ich nörgel. Ganz einfach.',
    stop: 'Ok ok, genug genörgelt. Nörgel.',
};

var textBuilder = {

    build:   function (text) {
        // TODO: format + add nörgels

        return text;
    },
    noergel: function () {
        return 'todo';
    }
};

//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
//####
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

//####
//####
//####
//####
//####
//####
//####
//####
//####
//####

var noergelHandlers = {

    // When the user said something like "Alexa stop" (without application name)
    'AMAZON.CancelIntent': function () {
        this.emit('NoergelIntent');
    },

    // When the user said something like "Alexa stop" (without application name)
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', textBuilder.text(language.help));
    },

    // When the user said "no" to a question
    'AMAZON.NoIntent': function () {
        this.emit('NoergelIntent');
    },

    // When the user said "stop"
    'AMAZON.StopIntent': function () {
        this.emit(':tell', textBuilder.text(language.stop));
    },

    // When the user said "yes" to a question
    'AMAZON.YesIntent': function () {
        this.emit('NoergelIntent');
    },

    // Nörgel nörgel nörgel
    'NoergelIntent': function () {
        this.emit(':tell', textBuilder.noergel());
    },

    // User started the skill
    'LaunchRequest': function () {
        this.emit('NoergelIntent');
    },

    // Unknown request
    'Unhandled': function () {
        this.emit('NoergelIntent');
    },
};

/**
 * @param event
 * @param context
 * @param callback
 */
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(noergelHandlers);
    alexa.execute();
};