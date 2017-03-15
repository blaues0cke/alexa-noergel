'use strict';
// @formatter:off
var Alexa       = require('alexa-sdk');
var language    = require('./lib/language');
var textBuilder = require('./lib/textBuilder');
// @formatter:on

var noergelHandlers = {

    // When the user said something like "Alexa stop" (without application name)
    'AMAZON.CancelIntent': function () {
        this.emit('NoergelIntent');
    },

    // When the user said something like "Alexa stop" (without application name)
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', textBuilder.replacePlaceholders(language.help));
    },

    // When the user said "no" to a question
    'AMAZON.NoIntent': function () {
        this.emit('NoergelIntent');
    },

    // When the user said "stop"
    'AMAZON.StopIntent': function () {
        this.emit(':tell', textBuilder.replacePlaceholders(language.stop));
    },

    // When the user said "yes" to a question
    'AMAZON.YesIntent': function () {
        this.emit('NoergelIntent');
    },

    // Nörgel nörgel nörgel
    'NoergelIntent': function () {
        this.emit(':ask', textBuilder.noergel());
    },

    // User started the skill
    'LaunchRequest': function () {
        this.emit('NoergelIntent');
    },

    // Unknown request
    'Unhandled': function () {
        this.emit('NoergelIntent');
    }
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