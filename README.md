# IntervalX

Run functions a specific number of times at defined intervals.

Usage:

    $.intervalX({
        intervalFunction: <your function>,
        intervalPeriod: <millisecond interval period>,
        x: <number of executions>
    });

Required parameters:

 - intervalFunction
  - callable function
  - the function you want to execute at intervals
 - intervalPeriod
  - integer
  - millisecond interval period
 - x
  - integer
  - number of times to execute interval function

Additional parameters:

 - runImmediately 
  - boolean
  - runs the intervalFunction immediately rather than waiting for first interval to elapse
 - orUntil
  - callable function
  - should return true if needed to halt prematurely
 - doWhile
  - callable function
  - should return if false if needed to halt prematurely

