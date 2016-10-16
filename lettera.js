'use strict';

(function() {
    var lettera = {
        settings: {
            minDelay: 10,
            maxDelay: 40,
            minHeight: true,
            errorChance: -1,
            type: 'innerHTML',
        },
        element: null,
        elementHeight: null,
        string: null,
        sentence: [],
        halt: false,
        init: function(obj) {

            if (!obj.element || !obj.string)
                return false;

            lettera.settings.type        = obj.type         || lettera.settings.type;
            lettera.settings.minDelay    = obj.minDelay     || lettera.settings.minDelay;
            lettera.settings.maxDelay    = obj.maxDelay     || lettera.settings.maxDelay;
            lettera.settings.minHeight   = obj.minHeight    || lettera.settings.minHeight;
            lettera.settings.errorChance = obj.errorChance  || lettera.settings.errorChance;

            lettera.sentence        = [];
            lettera.element         = obj.element;
            lettera.elementHeight   = (lettera.element.offsetHeight || lettera.element.clientHeight) + 'px'; //lettera.element.style.minHeight;

            var words = obj.string.split(' ');

            for (var i = 0; i < words.length; i++) {
                lettera.sentence.push(words[i].split(''));
                if (i+1 != words.length) {
                    lettera.sentence[i].push(' ');
                }
            }

            obj.autoclear ? lettera.clear() : null
            obj.autostart ? lettera.start() : null

            return this;
        },
        start: function(cb) {
            if (!lettera.element)
                return false;

            lettera.clear();
            lettera.halt = false;

            lettera.iterateWords(function() {
                if (lettera.settings.minHeight)
                    lettera.element.style.minHeight = lettera.elementHeight;

                typeof cb == 'function' ? cb(!lettera.halt) : null;
            });
        },

        clear: function() {
            if (lettera.settings.minHeight)
                lettera.element.style.minHeight = (lettera.element.offsetHeight || lettera.element.clientHeight)+'px';

            lettera.element[lettera.settings.type] = '';
        },

        stop: function() {
            lettera.halt = true;
        },

        iterateWords: function(cb) {
            var _sentence = lettera.sentence.slice(0);
            var tick = function() {
                _sentence.length > 0 && !lettera.halt ? lettera.typeWord(_sentence.shift(), tick) : cb();
            };
            tick();
        },

        typeWord: function(word, cb) {
            var _word = word.slice(0);
            var tick = function() {
                _word.length > 0 && !lettera.halt ? lettera.appendCharacter(_word.shift(), tick) : cb();
            };
            tick();
        },

        appendCharacter: function(character, cb) {

            var delay = (Math.floor(Math.random() * (lettera.settings.maxDelay - lettera.settings.minDelay + 1)) + lettera.settings.minDelay);
            var a = (Math.floor(Math.random() * (100 - 1 + 1)) + 1);
            var didFail = a < lettera.settings.errorChance;

            var failed = function() {
                setTimeout(function() {
                    lettera.element[lettera.settings.type] += lettera.getRandomCharacter(character);
                }, delay);

                setTimeout(function() {
                    lettera.element[lettera.settings.type] = lettera.element[lettera.settings.type].slice(0, -1);
                    correct();
                }, delay*5);
            }

            var correct = function() {
                setTimeout(function() {
                    lettera.element[lettera.settings.type] += character;
                    cb();
                }, delay);
            }

            didFail ? failed() : correct();

        },

        getRandomCharacter: function(except) {
            var getCharacter = function() {
                return String.fromCharCode(97 + Math.floor(Math.random() * 26));
            }

            var character = getCharacter();

            while (character == except) {
                character = getCharacter();
            }

            return character;
        }
    }

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports ) {
          exports = module.exports = lettera;
        }
        exports.lettera = lettera;
    } else {
        this.lettera = lettera;
    }

}).call(this);
