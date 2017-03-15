'use strict';
// @formatter:off
var Alexa       = require('alexa-sdk');
var language    = require('./lib/language');
var textBuilder = require('./lib/textBuilder');
var util        = require('./lib/util');

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

    // The user wants to compare two persons
    'PersonIntent': function () {
        var person = util.getRandomArrayItem(
        [
            this.event.request.intent.slots.FirstPerson.value,
            this.event.request.intent.slots.SecondPerson.value
        ]);

        this.emit(':tell', textBuilder.getPersonAnswer(person));
    },

    // Unknown request
    'Unhandled': function () {
        this.emit('AMAZON.StopIntent');
    }
};

/**
 * @param event
 * @param context
 * @param callback
 */
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = 'amzn1.ask.skill.dc1cc440-a9fe-4bad-a8fc-117081a38579';
    alexa.registerHandlers(noergelHandlers);
    alexa.execute();
};
// @formatter:on