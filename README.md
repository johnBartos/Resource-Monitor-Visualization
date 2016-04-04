# Resource Monitor Visualization
A React/Redux project to monitor CPU load and trigger load alarms. When the CPU load exceeds an average of 1 for the past
two minutes, an alert is generated. After triggering, when the average load is below 1 for the past two minutes,
the alert is resolved.

#### [Live Demo!](https://johnbartos.github.io/Resource-Monitor-Visualization/)
###### (also works on your phone)

![demo](https://i.imgur.com/wDM0wIp.png)

## Installing & Running
- Pull the source code, obviously
- `npm install` to install dependencies
- `npm start` to start it up
    - Graph lines appear 10s after start
    - High Load Alarm triggered 2 minutes after start
- `npm t` to run Mocha tests

## Design

### Folder Layout
    .
    ├── css                     # App styles + SkeletonCss
    ├── src                     # Source code
        ├── actions             # Redux actions
        ├── components          # Presentational components
        ├── containers          # Structural components
        ├── reducers
            ...
            ├── tests           # unit & integration tests
            ├── loadAlarm.js    # Alarming logic
        ├── store
        ├── utils
            ├── graph.js        # D3 graph
            ├── loadGenerator.js# Mock CPU load generator
    ├── dist                    # Compiled files
        ├── bundle.js           # Bundled client code
    ├── node_modules            # NPM Dependencies
    ├── index.html              # Main HTML file
    └── package.json            # NPM manifest

### Architecture Brief
I chose to use Redux to handle the alarming logic, the meat of which is in `loadAlarm.js`.

##### Batching
Instead of dispatching a single action representing the three load averages for that date, I instead chose to dispatch
three actions, one for each average. These actions are batched, meaning they're dispatched at once and only one state
is produced from their sum.

The reason I split up the load averages is to produce DRY code which is free of messy looping logic.

##### How alerts are generated - `loarAlarm.js`
An alert is generated when every reading from the past two minutes exceeds a set threshold - it's resolved when every reading
for the past two minutes thereafter is below the same threshold.

A state machine (`loadAlarm.js`) is used to determine the state of the alarm based on it's previous state and the input of a `reading`,
which has a time and a value. There are 4 states, two of which generate an alert:

      alarming | triggered
      00 -> no event
      01 -> alarm resolution event
      10 -> no event
      11 -> alarm trigger event

The state machine's job is threefold: to record the beginning of an abnormal load period (represented as `startDate`),
to trigger an alert when the load period exceeds a set duration (represented as `trigger`), and to toggle the alarm state
whenever an alert is triggered (represented as `alarming`).
Using this 4-bit state, the state machine is able to represent both the initial trigger and resolution, as well as in-between
periods.

The determination for triggering is done by checking whether the difference between the current `reading`'s date and
`startDate` exceeds `duration`. A small tolerance is added to this comparison to account for delay from generation to
 reception, since `setInterval` sometimes triggers a bit too soon.

##### How multiple alarms are managed - `alarms.js`
`loadAlarm.js` isn't directly part of Redux's state tree. Instead, the reducer `alarms.js` invokes the `loadAlarm`
reducer and saves the result in an associative array keyed to the alarm's `id`. Whenever a reading is received, `alarms`
does four things:

1. Retrieve the last state of the alarm by th payload's `id`
2. Calculate the next state of that alarm by calling `loadAlarm` with the last state and current action
3. Checks the flags of the next state and generates an alert if `trigger` is true
4. Replaces the last state with the next state

By indirectly using the `loadAlarm` reducer, we're able to manage multiple alarms in one reducer and retain the simplicity
of managing a single alarm.

##### Load Generation - `loadGenerator.js`
Since Windows doesn't have the concept of CPU load, I made an ES6 `function*` generator to simulate it for me. On each
request, it either returns a high load reading or a normal load based on the current index into an array of fake readings.

13 readings represent a period of two minutes at 10 seconds each.


### Improvements
##### Appearance
1. It's not ugly, but it's not pretty either
    - Needs better whitespacing
    - Needs consistency between colors/sizes
2. Better representation of all alarms on the page
    - No scrollbar would be ideal
    - Better association of trigger -> resolve
3. Better graph styling
    - I initially went for a multi-line plot, but it was too cramped
    - Visual cues to indicate the three plots are related
    - Better indication of trigger/resolve zones
    - Resolve clipping/overlap of some elements
    - Better indication of where the load threshold is
4. Improved responsiveness
    - Page is fully responsive, but the graph gets cramped when small
    - Key media breakpoints to graph ticks/range/etc

##### Performance
1. Managing load for the past 10 minutes will be slow at scale
    - O(n) with filtering on each action
    - Can be faster - ideas
        - Hashing on dates to find cutoff range easily - potentially O(1)
        - Binary search to find crossover - O(logn)
2. Don't re-render the entire graph on each cycle
    - For simplicity I redraw the entire graph
    - Can be smarter when updating data

##### Interactivity
1. Add graph interactivity
    - Show time/value at mouse location
2. Clicking on graph alarm zone focuses alarm off graph
3. Clicking alarm off graph focuses corresponding alarm zone on graph
4. Interactivity to tie all three graphs together
    - Mousing over one can draw a line at the same date on all three

##### Code improvements
1. `loadAlarm` state is hard to debug from log statements
    - No indication that the alarm is close to triggering
2. All d3 logic is in one function
    - Definitely won't scale
4. Unit testing React components
    - use `shallowRender`
5. Further componentization
    - Alerts can be their own component instead of just an `li`
        - Will be useful if interactivity is added
5. Better testing overall - can eliminate a lot of code by using `sinon` for mocks
6. Use constants instead of strings for actions
7. Better naming conventions
8. More graceful handling of graph before load has appeared
9. Elimination of hard-coded variables
    - Graph is fixed to 10 minutes with a threshold of 1
    - Alarm parameters (duration, threshold) are fixed at the defaults
        - Can easily be set with Redux actions
    - Alarms added are hardcoded to 'one', 'five', and 'fifteen'

##### Known Bugs
1. `setInterval()` isn't guaranteed to be accurate. This inaccuracy can cause inaccuracy in alarming periods - typically around 10s. The normal difference between the the one minute average's first alarming period (trigger -> resolve) is 2:30. The bug results in 2:40. Tests show that the alarming logic is working as intended.


The largest improvement, however, is adding tolerance for delays with regards to the updating of load at
set intervals. This a problem for two reasons: `setInterval` isn't guaranteed to delay by the set amount, and the request
for CPU load (which would be async in real life) completes in an indeterminate amount of time. Additionally,
two identical requests can be several ms off from each other. This delay can cause a few
problems:

1. Discrepancy between real CPU load and load represented on the graph
2. Potential miss of alarm periods
    - If the CPU load spikes and it's missed due to network delay, an alarm could be triggered/resolved improperly
    because `startDate` was not reset

I believe this could be solved by collecting the load server-side at set intervals, map it in a table, and serve the load
mapped to request time.



