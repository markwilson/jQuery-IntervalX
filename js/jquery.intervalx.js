(function ($) {
    // TODO: move to options array rather than parameters
    $.intervalXTimes = function (intervalFunction, intervalPeriod, x, runImmediately, orUntil) {
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
        if (typeof orUntil === 'undefined') {
            orUntil = function () { return false; };
        }
        // check orUntil is callable
        if (typeof orUntil !== 'function') {
            throw new Error('orUntil is not a callable function');
        }

        // get parameters array - additional params for this function
        var additionalParameters = Array.prototype.slice.call(arguments, 5);


        // initialise intervals
        var runsRemaining = x;
        var interval;

        // internal interval function
        var intervalExecuted = function () {
            // check orUntil is false
            if (orUntil() === true) {
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
