(function ($) {
    $.intervalX = function (options) { 
        // load in default options
        var defaultOptions = {
            runImmediately: false,
            orUntil: function () { return false; },
            doWhile: function () { return true; }
        };

        options = $.extend(defaultOptions, options);

        // extract options
        var intervalFunction = options.intervalFunction;
        var intervalPeriod = options.intervalPeriod;
        var x = options.x;
        var runImmediately = options.runImmediately;
        var orUntil = options.orUntil;
        var doWhile = options.doWhile;
        var additionalParameters = options.additionalParameters;

        // validate intervalFunction - check it is callable
        if (typeof intervalFunction !== 'function') {
            throw new Error('intervalFunction is not a callable function');
        }

        // validate intervalPeriod - integer given
        if (typeof intervalPeriod !== 'number' || intervalPeriod % 1 !== 0) {
            throw new Error('intervalPeriod is not an integer');
        }

        // validate x - integer given
        if (typeof x !== 'number' || x % 1 !== 0) {
            throw new Error('x is not an integer');
        }
        
        // validate runImmediately - boolean given
        if (typeof runImmediately !== 'boolean') {
            if (typeof runImmediately === 'undefined') {
                runImmediately = false;
            } else {
                throw new Error('Incorrect value for runImmediately');
            }
        }

        // validate orUntil - callable given
        if (typeof orUntil !== 'function') {
            throw new Error('orUntil is not a callable function');
        }

        // validate doWhile - callable given
        if (typeof doWhile !== 'function') {
            throw new Error('doWhile is not a callable function');
        }

        // initialise intervals
        var runsRemaining = x;
        var interval;

        // internal interval function
        var intervalExecuted = function () {
            // check orUntil is false or doWhile is true
            if (!orUntil() && !doWhile()) {
                clearInterval(interval);
                return;
            }

            // callback
            intervalFunction.apply(intervalFunction, additionalParameters);

            // decrement runs remaining and check it is greater than 0
            runsRemaining--;
            if (runsRemaining === 0) {
                // no more interval executions
                clearInterval(interval);
            }
        };

        // run immediately if required
        if (runImmediately) {
            intervalExecuted();
        }

        // start interval
        interval = setInterval(intervalExecuted, intervalPeriod);
    };
})(jQuery);
