// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"or4r":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

},{}],"WEtf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// device sniffing for mobile
var isMobile = {
  android: function android() {
    return navigator.userAgent.match(/Android/i);
  },
  blackberry: function blackberry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  ios: function ios() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  opera: function opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  windows: function windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.android() || isMobile.blackberry() || isMobile.ios() || isMobile.opera() || isMobile.windows();
  }
};
var _default = isMobile;
exports.default = _default;
},{}],"TAPd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var stepperTriggered = false;
/* global d3 */

function resize() {} //----------------//
//building the stepper


function setupStepper() {
  //array of step states
  var steps = [step0, step1, step2, step3, step4, step5, step6 // step7
  ]; //define click events on right-left buttons

  var tapLeft = d3.select('svg.tap--left').on('click', function () {
    currentStep = currentStep - 1;
    switchStep(currentStep);
    console.log('clicked');
    d3.event.stopPropagation();
  });
  var tapRight = d3.select('svg.tap--right').on('click', function () {
    currentStep = currentStep + 1;
    switchStep(currentStep);
    console.log('clicked');
  });
  var tapDown = d3.select('svg.tap--final').on('click', function () {
    currentStep = currentStep + 1;
    switchStep(currentStep);
    console.log('clicked');
    document.querySelector('.step').scrollIntoView({
      behavior: 'smooth'
    });
  }); // define each step

  function step0() {
    var entirePage = d3.select('.stepper').on('click', function (d) {
      currentStep = currentStep + 1;
      switchStep(currentStep);
    }); //activate container

    d3.select('.stepper').classed('active', true); //Activate stepper tap

    d3.select(".stepper__tap").classed("active", true); //Activate first-button

    d3.select(".tap--first").classed("active", true); //Deactivate right-left click buttons

    d3.select(".tap.tap--left").classed("active", false).style('opacity', '0');
    d3.select(".tap.tap--right").classed("active", false).style('opacity', '0');
    d3.select(".tap.tap--left").transition().style('right', '55%').style('bottom', '5%').style('opacity', '0').style('pointer-events', 'none');
    d3.select(".tap.tap--right").transition().style('left', '55%').style('bottom', '5%').style('opacity', '0'); //stop the first video on clickback

    d3.select('video.ismo.step1')['_groups'][0][0].pause();
  }

  function step1() {
    //Remove full page click
    d3.select('.stepper').on('click', null); //Dectivate first-button

    d3.select(".tap--first").classed("active", false); //Activate right-left click buttons

    d3.select(".tap.tap--left").classed("active", true);
    d3.select(".tap.tap--right").classed("active", true);
    d3.select(".tap.tap--left").transition().duration(1000).style('opacity', '1').style('right', '55%').style('bottom', '5%').style('pointer-events', 'auto');
    d3.select(".tap.tap--right").transition().duration(1000).style('opacity', '1').style('left', '55%').style('bottom', '5%');
    d3.select('.pause-overlay').transition().duration(1500).style('opacity', 0); // function splitSubtitle() {
    // var subtitleWords = document.getElementsByClassName('subtitle')[0]
    // subtitleWords.innerHTML = "<span>".concat(subtitleWords.innerHTML)
    // console.log(subtitleWords.innerHTML)
    // subtitleWords.innerHTML = subtitleWords.innerHTML.replace(/ /g,"</span> <span>")
    // console.log(subtitleWords.innerHTML)
    // subtitleWords.innerHTML = subtitleWords.innerHTML.slice(0,-7)
    // d3.selectAll('.subtitle>span').classed('subtitle-word',true)
    // splitSubtitle = function() {}
    // }
    // splitSubtitle()

    d3.select('.subtitle').classed('active', true);
    d3.select('.subtitle').style('opacity', 0);
    d3.select('.subtitle').transition().delay(400).duration(150).style('opacity', 1); // var subtitleHighlights = d3.selectAll('.subtitle-word')
    // subtitleHighlights.transition()
    //   .delay(400)
    //   .duration(200)
    //   .style('color','white')
    //play the first video

    d3.select('video.ismo.step1')['_groups'][0][0].currentTime = 0;
    d3.select('video.ismo.step1')['_groups'][0][0].play();
  }

  function step2() {
    // //activate script
    // d3.select('.script-container').classed("active",true)
    //  .transition()
    //  .duration(1000)
    //  //deselct active text on clickback
    //  d3.selectAll('.script-line').classed("active",false)
    //  //select active text
    //  d3.selectAll('.script-line')
    //    .filter(function (d) {
    //      return d.step_used == 'step2'
    //    })
    //    .classed('active',true)
    //  //stop the first video
    //  d3.select('video.ismo.step1')['_groups'][0][0].pause()
    //  d3.select('video.ismo.step1')['_groups'][0][0].currentTime = 0
    //  //play the second video
    //  d3.select('video.ismo.step2')['_groups'][0][0].play()
    // //pause the third video on clickback
    //  d3.select('video.ismo.step3')['_groups'][0][0].pause()
    //  d3.select('video.ismo.step3')['_groups'][0][0].currentTime = 0
    //stop the first video
    d3.select('video.ismo.step1')['_groups'][0][0].pause();
    d3.select('.stepper__video.step1').classed('active', true); // d3.select('video.ismo.step1')['_groups'][0][0].currentTime = 0

    d3.select('.pause-overlay').transition().duration(1500).style('opacity', 1); //deactivate script on clickback

    d3.select('.script-container').classed("active", false);
    d3.select('.subtitle').classed('active', false);
    d3.select('.subtitle').style('opacity', 0); //deselect active text on clickback

    d3.selectAll('.script-line').classed("active", false); //stop the second video on clickback

    d3.select('video.ismo.step3')['_groups'][0][0].pause();
    d3.select('video.ismo.step3')['_groups'][0][0].currentTime = 0;
  }

  function step3() {
    //activate script
    d3.select('.script-container').classed("active", true); //transition out overlay

    d3.select('.pause-overlay').transition().duration(2000).style('opacity', 0); //deselct active text on clickback

    d3.selectAll('.script-line').classed("active", false); //select active text

    d3.selectAll('.script-line').filter(function (d) {
      return d.step_used == 'step2';
    }).classed('active', true); //play the second video

    d3.select('video.ismo.step3')['_groups'][0][0].play(); //pause the third video on clickback

    d3.select('video.ismo.step4')['_groups'][0][0].pause();
    d3.select('video.ismo.step4')['_groups'][0][0].currentTime = 0;
  }

  function step4() {
    //stop the second video
    d3.select('video.ismo.step3')['_groups'][0][0].pause();
    d3.select('video.ismo.step3')['_groups'][0][0].currentTime = 0; //play the third video

    d3.select('video.ismo.step4')['_groups'][0][0].play(); //pause the fourth video on clickback

    d3.select('video.ismo.step5')['_groups'][0][0].pause();
    d3.select('video.ismo.step5')['_groups'][0][0].currentTime = 0; //deselect active text on clickback/clickthrough

    d3.selectAll('.script-line').classed("active", false); //select active text

    d3.selectAll('.script-line').filter(function (d) {
      return d.step_used == 'step3';
    }).classed('active', true); //reset text color on clickback

    d3.selectAll('#ass-instance').transition().duration(1000).style('color', 'rgba(0,255,243,0.4)');
  }

  function step5() {
    //stop the third video
    d3.select('video.ismo.step4')['_groups'][0][0].pause();
    d3.select('video.ismo.step4')['_groups'][0][0].currentTime = 0; //play the fourth video

    d3.select('video.ismo.step5')['_groups'][0][0].play(); //pause the fifth video on clickback

    d3.select('video.ismo.step6')['_groups'][0][0].pause();
    d3.select('video.ismo.step6')['_groups'][0][0].currentTime = 0; //deselect active text on clickback/clickthrough

    d3.selectAll('.script-line').classed("active", false); //select active text

    d3.selectAll('.script-line').filter(function (d) {
      return d.step_used == 'step4';
    }).classed('active', true); //highlight instances of ass

    highlightAss(); //reset text color on clickback

    d3.selectAll('#ass-instance').transition().duration(1000).style('color', '#00fff3'); //Reactivate right click buttons on clickback

    d3.select(".tap.tap--right").classed("active", true);
    d3.select(".tap.tap--left").classed("active", true); //Move left tap to top corner
    //Deactivate final click button on clickback

    d3.select(".tap.tap--final").classed("active", false);
    d3.select(".tap.tap--final").transition().style('opacity', '0'); //Move back right-left click buttons

    d3.select(".tap.tap--right").style("display", null).transition().duration(1000).style('left', '55%').style('bottom', '5%').style('opacity', '1');
    d3.select('.tap.tap--left').transition().duration(1000).style('right', '55%').style('bottom', '5%').style('opacity', '1');
  }

  function step6() {
    //stop the fourth video
    d3.select('video.ismo.step5')['_groups'][0][0].pause();
    d3.select('video.ismo.step5')['_groups'][0][0].currentTime = 0; //play the fifth video

    d3.select('video.ismo.step6')['_groups'][0][0].play(); //deselect active text on clickback/clickthrough

    d3.selectAll('.script-line').classed("active", false); //select active text

    d3.selectAll('.script-line').filter(function (d) {
      return d.step_used == 'step5';
    }).classed('active', true);
    window.setTimeout(function (d) {
      if (!stepperTriggered) {
        var scrollTween = function scrollTween(offset) {
          stepperTriggered = true;
          return function () {
            var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset);
            return function (t) {
              scrollTo(0, i(t));
            };
          };
        };

        d3.transition().delay(0).duration(1000).tween("scroll", scrollTween(window.innerHeight));
      } ////remove the stepper and activate the scroller
      //d3.select('.stepper__graphics').classed('active',false)
      //  .attr('display','none')
      // d3.select('.stepper').classed('active',false)
      // d3.select('.script-container')
      //   .classed('active',false)
      // d3.select('.tap.tap--final')
      //   .classed('active',false)
      // d3.select(".tap.tap--final").transition()
      //   .duration(1000)
      //   .style('opacity',0)


      d3.select('.scroll').classed('active', true).attr('display', 'inline');
      d3.select('.stack').classed('active', true); //deselect active text on clickback/clickthrough

      d3.selectAll('.script-line').classed("active", false); //activate tap back button

      var tapBack = d3.select('svg.tap--back').on('click', function () {
        currentStep = currentStep - 1;
        switchStep(currentStep);
      });
      d3.select('svg.tap--back').classed('active', true);
      d3.select('svg.tap--back').transition().duration(1000).style('opacity', 1); //pause the fifth video
      // d3.select('video.ismo.step6')['_groups'][0][0].pause()
    }, 3000); //Move out right-left click buttons
    // d3.select(".tap.tap--right").transition()
    //   .duration(1000)
    //   .style('left','65%')
    //   .style('bottom','20%')
    //   .style('opacity','.6')
    // d3.select('.tap.tap--left').transition()
    //   .duration(1000)
    //   .style('right','65%')
    //   .style('bottom','20%')
    //   .style('opacity','.6')
    // //Activate final click button
    //   d3.select(".tap.tap--final").classed("active", true)
    //
    //   d3.select(".tap.tap--final").transition()
    //     .duration(1)
    //     .style('opacity',0)
    //
    //   d3.select(".tap.tap--final").transition()
    //     .duration(1000)
    //     .style('opacity',1)
    // //Dectivate clickback button on clickback
    //   d3.select(".tap.tap--back").classed("active", false)
    //
    //   //Reactivate left-right click on clickback
    //   d3.select('.tap.tap--left').classed('active',true)
    //   d3.select(".tap.tap--right").classed("active", true)
    //
    //     //reactivate on clickback
    //   d3.select('.stepper').classed('active',true)
    //   d3.select('.stepper__graphics').classed('active',true)
    //     .attr('display','none')
    //   d3.select('.script-container')
    //     .classed('active',true)
    //
    //   //deactivate scroller and stack on clickback
    //   d3.select('.scroll').classed('active',false)
    //   d3.select('.stack').classed('active',false)
    //deactivate leftright click button
    // d3.select('.tap.tap--left')
    //   .classed('active',false)

    d3.select('.tap.tap--right').classed('active', false).style("display", "none").style('opacity', '0'); // d3.select('.tap.tap--left').transition()
    //   .style('opacity','0')
  }

  function step7() {} //remove the stepper and activate the scroller
  // d3.select('.stepper__graphics').classed('active',false)
  //   .attr('display','none')
  // d3.select('.stepper').classed('active',false)
  // d3.select('.script-container')
  //   .classed('active',false)
  // d3.select('.tap.tap--final')
  //   .classed('active',false)
  // d3.select(".tap.tap--final").transition()
  //   .duration(1000)
  //   .style('opacity',0)
  //
  // d3.select('.scroll').classed('active',true)
  //   .attr('display','inline')
  // d3.select('.stack').classed('active',true)
  // //deselect active text on clickback/clickthrough
  // d3.selectAll('.script-line').classed("active",false)
  //
  // //activate tap back button
  //
  //   var tapBack = d3.select('svg.tap--back')
  //     .on('click', function () {
  //       currentStep = currentStep - 1
  //       switchStep(currentStep)
  //       console.log('clicked')
  //     })
  //
  // d3.select('svg.tap--back')
  //   .classed('active',true)
  //
  // d3.select('svg.tap--back').transition()
  //   .duration(1000)
  //   .style('opacity',1)
  //
  // //pause the fifth video
  // d3.select('video.ismo.step6')['_groups'][0][0].pause()
  //
  // //deactivate leftright click button
  // d3.select('.tap.tap--left')
  //   .classed('active',false)
  // d3.select('.tap.tap--right')
  //   .classed('active',false)
  //
  // d3.select('.tap.tap--left').transition()
  //   .style('opacity','0')
  // d3.select('.tap.tap--right').transition()
  //   .style('opacity','0')
  //end of step functions
  //highlight asses function


  function highlightAss() {
    var scriptLines = document.getElementsByClassName('script-line');
    var x;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = scriptLines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        x = _step.value;
        x.innerHTML = x.innerHTML.replace(/ass-berg/g, '<span id="ass-instance">ass-berg</span>');
        x.innerHTML = x.innerHTML.replace(/badass/g, '<span id="ass-instance">badass</span>');
        x.innerHTML = x.innerHTML.replace(/dumbass/g, '<span id="ass-instance">dumbass</span>');
        x.innerHTML = x.innerHTML.replace(/your ass/g, '<span id="ass-instance">your ass</span>');
        x.innerHTML = x.innerHTML.replace(/Your ass/g, '<span id="ass-instance">Your ass</span>');
        x.innerHTML = x.innerHTML.replace(/my ass/g, '<span id="ass-instance">my ass</span>');
        x.innerHTML = x.innerHTML.replace(/My ass/g, '<span id="ass-instance">My ass</span>');
        x.innerHTML = x.innerHTML.replace(/half-assed/g, '<span id="ass-instance">half-assed</span>');
        x.innerHTML = x.innerHTML.replace(/blue-ass/g, '<span id="ass-instance">blue-ass</span>');
        x.innerHTML = x.innerHTML.replace(/long-ass/g, '<span id="ass-instance">long-ass</span>');
        x.innerHTML = x.innerHTML.replace(/good-ass/g, '<span id="ass-instance">good-ass</span>');
        x.innerHTML = x.innerHTML.replace(/grown-ass/g, '<span id="ass-instance">grown-ass</span>');
        x.innerHTML = x.innerHTML.replace(/lazy-ass/g, '<span id="ass-instance">lazy-ass</span>');
        x.innerHTML = x.innerHTML.replace(/piece of ass/g, '<span id="ass-instance">piece of ass</span>');
        x.innerHTML = x.innerHTML.replace(/ ass\./g, ' <span id="ass-instance">ass</span>.');
        x.innerHTML = x.innerHTML.replace(/“ass”/g, '“<span id="ass-instance">ass</span>”');
        x.innerHTML = x.innerHTML.replace(/“ass.”/g, '“<span id="ass-instance">ass</span>.”');
        x.innerHTML = x.innerHTML.replace(/ ass,/g, ' <span id="ass-instance">ass</span>,');
        x.innerHTML = x.innerHTML.replace(/ ass /g, ' <span id="ass-instance">ass</span> ');
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    highlightAss = function highlightAss() {};
  } //end of highlight asses function
  //keep only asses function


  function assOnlyScript() {
    var scriptLines = document.getElementsByClassName('scroll-script-line');
    var x;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = scriptLines[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        x = _step2.value;
        x.innerHTML = x.innerHTML.replace(/ass-berg/g, '<span id="ass-instance">ass-berg</span>');
        x.innerHTML = x.innerHTML.replace(/badass/g, '<span id="ass-instance">badass</span>');
        x.innerHTML = x.innerHTML.replace(/dumbass/g, '<span id="ass-instance">dumbass</span>');
        x.innerHTML = x.innerHTML.replace(/your ass/g, '<span id="ass-instance">your ass</span>');
        x.innerHTML = x.innerHTML.replace(/Your ass/g, '<span id="ass-instance">Your ass</span>');
        x.innerHTML = x.innerHTML.replace(/my ass/g, '<span id="ass-instance">my ass</span>');
        x.innerHTML = x.innerHTML.replace(/My ass/g, '<span id="ass-instance">My ass</span>');
        x.innerHTML = x.innerHTML.replace(/half-assed/g, '<span id="ass-instance">half-assed</span>');
        x.innerHTML = x.innerHTML.replace(/blue-ass/g, '<span id="ass-instance">blue-ass</span>');
        x.innerHTML = x.innerHTML.replace(/long-ass/g, '<span id="ass-instance">long-ass</span>');
        x.innerHTML = x.innerHTML.replace(/good-ass/g, '<span id="ass-instance">good-ass</span>');
        x.innerHTML = x.innerHTML.replace(/grown-ass/g, '<span id="ass-instance">grown-ass</span>');
        x.innerHTML = x.innerHTML.replace(/lazy-ass/g, '<span id="ass-instance">lazy-ass</span>');
        x.innerHTML = x.innerHTML.replace(/piece of ass/g, '<span id="ass-instance">piece of ass</span>');
        x.innerHTML = x.innerHTML.replace(/ ass\./g, ' <span id="ass-instance">ass</span>.');
        x.innerHTML = x.innerHTML.replace(/“ass”/g, '“<span id="ass-instance">ass</span>”');
        x.innerHTML = x.innerHTML.replace(/“ass.”/g, '“<span id="ass-instance">ass</span>.”');
        x.innerHTML = x.innerHTML.replace(/ ass,/g, ' <span id="ass-instance">ass</span>,');
        x.innerHTML = x.innerHTML.replace(/ ass /g, ' <span id="ass-instance">ass</span> ');
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    assOnlyScript = function assOnlyScript() {};
  } //end of highlight asses function
  //change step function


  function switchStep(currentStep) {
    //activate the current step
    d3.selectAll(".stepper__annotation").classed("active", false);
    d3.select(".stepper__annotation.step" + currentStep).classed("active", true);
    d3.selectAll(".stepper__video").classed("active", false);
    d3.select(".stepper__video.step" + currentStep).classed("active", true);
    d3.selectAll(".stepper__intro").classed("active", false);
    d3.select(".stepper__intro.step" + currentStep).classed("active", true); //console.log(steps[("step" + currentStep)])
    //run that step

    steps[currentStep]();
  } //end of change step function
  //initalize stepper


  var currentStep = 0;
  switchStep(currentStep); //end of stepper function
} //-------------//
//define the data, run script function


d3.csv('assets/data/ismo_script.csv').then( //begin script function
function setupStepperScript(datapoints) {
  var scriptContainer = d3.select('.stepper__graphics').append('p').attr('class', 'script-container');
  var scriptLines = scriptContainer.selectAll('span').data(datapoints).enter().append('span').attr('class', 'script-line').text(function (d) {
    return d.text + " ";
  }); //end of script function
}).catch(function (error) {// handle error
}); //end of data read/script

function setupAssLine(datapoints, container) {
  if (datapoints.length > 1) {
    var citationData = datapoints;
    console.log(citationData); //set up variables

    var margin = {
      top: 20,
      right: 26,
      bottom: 20,
      left: 26
    };
    var height = (window.innerHeight - margin.top - margin.bottom) / 2;
    var width = window.innerWidth - margin.left - margin.right;
    var sliderContainer = container.append('div').attr('class', 'slider-container');
    var svg = container.append('svg').attr('class', 'time-line').attr('width', width + margin.left + margin.right).attr('height', height + margin.bottom + margin.top).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var lineFunction = d3.line().x(function (d) {
      return d.x;
    }).y(function (d) {
      return d.y;
    });
    var lineData = [{
      "x": 0,
      "y": height * .02
    }, {
      "x": width,
      "y": height * .02
    }]; //filter data

    var citationCounter = 0;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = citationData[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var x = _step3.value;

        if (x['@first'] == 'yes') {
          citationData = citationData.slice(citationCounter);
        }

        citationCounter = citationCounter + 1;
      } //grab just the dates

    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var citationDates = citationData.map(function (d) {
      return +d.date;
    });
    var firstDate = citationDates[0];
    var lastDate = citationDates.slice(-1)[0]; //set up scales

    var xPositionScale = d3.scaleLinear().domain([+firstDate, +lastDate]).range([0, width]);
    var indexCounter = 0; //remove extraneous years

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = citationDates[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var x = _step4.value;

        if (x.length > 4) {
          var newDate = x.slice(0, 4);
          citationDates[indexCounter] = newDate;
        } else {}

        indexCounter = indexCounter + 1;
      } //add the timeline

    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    var timeLine = svg.append('line').attr("class", "background-bar").attr("x1", 0).attr("x2", width).attr("y1", 8).attr("y2", 8).attr('stroke-width', 2).attr('stroke', '#333333'); //add axis labels

    var yearLabelStart = svg.append('g').attr('transform', 'translate(' + 0 + ',' + 0 + ')').append('text').text(firstDate).attr('class', 'year-label');
    var yearLabelEnd = svg.append('g').attr('transform', 'translate(' + width + ',' + 0 + ')').append('text').text(lastDate).attr('class', 'year-label'); //add circle for each citation

    var citationCircles = svg.selectAll('.citation').data(citationData).enter().append('line').attr("class", "citation").attr('x1', function (d) {
      if (d.date.length > 4) {
        return xPositionScale(d.date.slice(0, 4));
      } else {
        return xPositionScale(d.date);
      }
    }).attr('x2', function (d) {
      if (d.date.length > 4) {
        return xPositionScale(d.date.slice(0, 4));
      } else {
        return xPositionScale(d.date);
      }
    }).attr('y1', 0).attr('y2', 16).classed("active", function (d, i) {
      return i == 0;
    }).attr('opacity', .5).attr('id', function (d) {
      if (d.date.length > 4) {
        return 'date' + d.date.slice(0, 4);
      } else {
        return 'date' + d.date;
      }
    }); //add the selected citation container

    var citationContainer = container.append('div').attr('class', 'citationContainer').text('(' + citationData[0].date + ') ' + citationData[0]['#text']);
    sliderContainer.append('input').attr('type', 'range').attr('min', firstDate).attr('max', lastDate).attr('id', 'rangeSLider').attr('value', firstDate).attr('step', 1).attr('class', 'slider').attr('dates', citationDates.map(function (d) {
      return +d;
    })).on("input", function (d) {
      var value = d3.select(this).property("value");
      var dates = citationDates.map(function (d) {
        return +d;
      });
      var selected = dates.reduce(function (prev, curr) {
        return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
      });
      citationCircles.classed("active", function (d) {
        if (+d.date == selected) {
          var text = d["#text"];
          citationContainer.text('(' + selected + ') ' + d["#text"]);
          return true;
        }

        return false;
      });
    });
  } else {
    var citationData = datapoints;
    var citationContainer = container.append('div').attr('class', 'citationContainer').text('(' + citationData.date + ') ' + citationData['#text']);
  }
} //begin scrolly function


function setupScroller() {
  //define the data, run function
  d3.json('assets/data/ass_long_data.json').then(function (d) {
    setupAssLine(d[186].citations, d3.select("#graphic2"));
  }).catch(function (error) {// handle error
  }); //end of data read/script
} //end of scrolly function
//-----------------//
//adding charts to stack


function buildCitationTimeline(usageData, icebergnumber, overlaynumber) {
  //set up variables
  // const margin = { top: 20, right: 20, bottom: 20, left: 20 }
  // const height = window.innerHeight - margin.top - margin.bottom
  // const width = window.innerWidth - margin.left - margin.right
  //
  // var svg = d3.select(overlaynumber)
  //   .append('svg')
  //   .attr('class','time-line')
  //   .attr('width',width)
  //   .attr('height',height-margin.bottom)
  //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  // var lineFunction = d3.line()
  //   .x(function(d) { return d.x; })
  //   .y(function(d) { return d.y; })
  // var lineData = [ { "x": width*.1,   "y": height*.2},  { "x": width*.9,  "y": height*.2} ]
  //filter data and only do line if more than 1 citation
  if (usageData.number_of_citations == 1) {
    var citationData = Array(usageData.citations); //add circle for each citation
    // var citationCircles = svg.selectAll('.citation-circle')
    //     .data(citationData)
    //     .enter().append('circle')
    //     .attr('cx',width/2)
    //     .attr('class','citation-circle')
    //     .attr('cy',height*.2)
    //     .attr('r',4)
    //     .attr('opacity',1)
    //     .attr('text', function (d){
    //       return d['#text']
    //     })
    //     .attr('fill','#F24C3D')
    //     .attr('id', function (d) {
    //
    //       if (d.date.length >4)
    //         {return 'date' + d.date.slice(0,4)}
    //       else
    //         {return 'date' + d.date}
    //     })
    //
    //   if (citationData[0].date.length > 4)
    //     {var yearLabelText = citationData[0].date.slice(0,4)}
    //   else
    //     {var yearLabelText = citationData[0].date}
    //
    //   var yearLabelStart = svg.append('g')
    //     .attr('transform','translate(' + width*.5 +','+ height*.23 + ')')
    //     .append('text')
    //     .text(yearLabelText)
    //     .attr('class','year-label')
    //
    //           //add the selected citation container
    // var citationContainer = d3.select(overlaynumber).append('div')
    //   .attr('class','citationContainerIceberg')
    //   .text('(' + citationData[0].date + ') ' + citationData[0]['#text'])
  } else {
    var citationData = usageData.citations; // setupAssLine(citationData)
    //   var x
    //   var citationCounter = 0
    //   for (x of citationData){
    //     if (x['@first'] == 'yes')
    //       {citationData = citationData.slice(citationCounter,)}
    //     citationCounter = citationCounter + 1
    //   }
    //
    //   //grab just the dates
    //   var citationDates = citationData.map(function (d) {return d.date})
    //   var x
    //   var indexCounter = 0
    //     //remove extraneous years
    //   for (x of citationDates) {
    //    if (x.length > 4) {
    //     var newDate = x.slice(0,4)
    //     citationDates[indexCounter] = newDate
    //    }
    //    else {}
    //    indexCounter = indexCounter + 1
    //   }
    //
    //     //set up scales
    // var xPositionScale = d3.scaleLinear()
    //   .domain([d3.min(citationDates),d3.max(citationDates)])
    //   .range([width*.1,width*.9])
    //
    // //add the timeline
    // var timeLine = svg.append('path')
    //     //.transition().duration(2000)
    //     .attr('d',lineFunction(lineData))
    //     .attr('stroke-width',2)
    //     .attr('stroke','#333333')
    //
    // //add axis labels
    //
    // var yearLabelStart = svg.append('g')
    //   .attr('transform','translate(' + width*.1 +','+ height*.23 + ')')
    //   .append('text')
    //     .text(d3.min(citationDates))
    //     .attr('class','year-label')
    //
    // var yearLabelEnd = svg.append('g')
    //   .attr('transform','translate(' + width*.9 +','+ height*.23 + ')')
    //   .append('text')
    //     .text(d3.max(citationDates))
    //     .attr('class','year-label')
    //
    //   //add circle for each citation
    //   var citationCircles = svg.selectAll('.citation-circle')
    //       .data(citationData)
    //       .enter().append('circle')
    //       .attr('cx',function (d) {
    //         return xPositionScale(d.date)
    //       })
    //       .attr('class','citation-circle')
    //       .attr('cy',height*.2)
    //       .attr('r',4)
    //       .attr('opacity',.5)
    //       .attr('text', function (d){
    //         return d['#text']
    //       })
    //       .attr('fill','#F24C3D')
    //       .attr('id', function (d) {
    //
    //         if (d.date.length >4)
    //           {return 'date' + d.date.slice(0,4)}
    //         else
    //           {return 'date' + d.date}
    //       })
    //
    // //add a slider
    // var sliderContainer = d3.select(overlaynumber).append('div')
    //   .attr('class','slider-container')
    //
    //
    // var slider = sliderContainer.append('input')
    //   .attr('type','range')
    //   .attr('min',d3.min(citationDates))
    //   .attr('max',d3.max(citationDates))
    //   .attr('id','rangeSlider')
    //   .attr('value',d3.min(citationDates))
    //   .attr('step',1)
    //   .attr('class','sliderIceberg')
    //   .attr('dates',citationDates)
    //   // .attr('oninput','selectCitationIceberg(this.value)')
    //   // .attr('onstart','selectCitationIceberg(this.value)')
    //
    // //add the selected citation container
    // var citationContainer = d3.select(overlaynumber).append('div')
    //   .attr('class','citationContainerIceberg')
    //   .text('(' + citationData[0].date + ') ' + citationData[0]['#text'])
    //end of if/else
  } //end of function

} //---------------------///


function buildIcebergTextChart(filename, icebergnumber, overlaynumber) {
  //time to make some charts
  //define the data, run function
  d3.json(filename).then( //begin function
  function icebergChart(datapoints) {
    var citationsLengths = datapoints.map(function (d) {
      return d.number_of_citations;
    }); //set up scales

    var colorScale = d3.scaleOrdinal().domain(['noun', 'compound', 'phrase', 'adjective', 'suffix', 'verb', 'adverb']).range(['#FABD21', '#DB2CCA', '#8633FF', '#DB772C', '#F24C3D', 'green', 'gray']);
    var container = d3.select(icebergnumber); //append span groups to svg

    var spans = container.selectAll('span').data(datapoints).enter().append('span').sort(function (x, y) {
      return y.number_of_citations - x.number_of_citations;
    }).attr('class', 'iceberg-text').attr('opacity', .8).style('color', '#333333').text(function (d) {
      return d.word + ' • ';
    }).on('mouseover', function (d, i) {
      var currentState = this;
      d3.select(this).style('opacity', 1);
    }).on('mouseout', function (d, i) {
      var currentState = this;
      d3.select(this).style('opacity', .8);
    }).on('click', function (d, i) {
      var overlay = d3.select(overlaynumber).classed('active', true).on('click', d3.select(this).classed('active', false));
      var usageData = d3.select(this)['_groups'][0][0]['__data__'];
      buildCitationTimeline(usageData, icebergnumber, overlaynumber);
    });
    var leftShape = d3.select('#left-shape1').style('height', '101em'); // .style('height','2000px')

    var rightShape = d3.select('#right-shape1').style('height', '101em'); //end of function
  }).catch(function (error) {// handle error
  }); //end of data read/script
}

function buildIcebergTextList(filename, icebergnumber, overlaynumber) {
  //time to make some charts
  //define the data, run function
  d3.json(filename).then( //begin function
  function icebergChart(datapoints) {
    var overlayHeight = window.innerHeight;
    d3.select(overlaynumber).transition().style('height', overlayHeight + 'px');
    var container = d3.select(icebergnumber); //append circle groups to svg

    var usages = container.append("div").attr("class", "usage-wrapper").selectAll('.usage-rows').data(datapoints).enter().append('div').attr("class", "usage-rows");
    usages.append("p").attr('class', 'usage-examples') // .style('color', '#333333')
    .text(function (d, i) {
      return i + 1 + '. ' + d.ismo_example;
    });
    usages.append("p").attr('class', 'word-container').html(function (d) {
      return "<span class='first'>" + d.word + "</span> <span class='sense-container'><i>" + d.part_of_speech + "</i> ; " + d.definition + "</span>";
    }); // var usageData = d3.select(this)['_groups'][0][0]['__data__']

    usages.append("div").attr('class', 'def-container').each(function (d) {
      var container = d3.select(this);
      var data = d.citations;
      setupAssLine(data, container);
    }); // var senseContainer = usages.append('p')
    //   .attr('class','sense-container')
    //   .text(function(d){
    //     return
    // })
    // .on('click', function (d,i) {
    //
    //   // var overlay = d3.select(overlaynumber)
    //   //   .classed('active',true)
    //   //   .on('click', d3.select(this).classed('active',false))
    //
    //
    //   console.log(usageData,icebergnumber,overlaynumber);
    //
    //   buildCitationTimeline(usageData,icebergnumber,overlaynumber)
    // })
    //end of function
  }).catch(function (error) {// handle error
  }); //end of data read/script
} //run functions


function init() {
  console.log('Make something awesome!'); //Run the stepper

  setupStepper(); //Run the scroller

  setupScroller(); //Build charts

  buildIcebergTextList('assets/data/ass_ismo_citations_final.json', '#iceberg0', '#overlay0');
  buildIcebergTextChart('assets/data/ass_long_data.json', '#iceberg1', '#overlay1');
  buildIcebergTextChart('assets/data/fuck_long_data.json', '#iceberg2', '#overlay2');
  buildIcebergTextChart('assets/data/dog_long_data.json', '#iceberg3', '#overlay3');
  buildIcebergTextChart('assets/data/shit_long_data.json', '#iceberg4', '#overlay4');
}

var _default = {
  init: init,
  resize: resize
};
exports.default = _default;
},{}],"v9Q8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var fallbackData = [{
  image: '2018_02_stand-up',
  url: '2018/02/stand-up',
  hed: 'The Structure of Stand-Up Comedy'
}, {
  image: '2018_04_birthday-paradox',
  url: '2018/04/birthday-paradox',
  hed: 'The Birthday Paradox Experiment'
}, {
  image: '2018_11_boy-bands',
  url: '2018/11/boy-bands',
  hed: 'Internet Boy Band Database'
}, {
  image: '2018_08_pockets',
  url: '2018/08/pockets',
  hed: 'Women’s Pockets are Inferior'
}];
var storyData = null;

function loadJS(src, cb) {
  var ref = document.getElementsByTagName('script')[0];
  var script = document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);

  if (cb && typeof cb === 'function') {
    script.onload = cb;
  }

  return script;
}

function loadStories(cb) {
  var request = new XMLHttpRequest();
  var v = Date.now();
  var url = "https://pudding.cool/assets/data/stories.json?v=".concat(v);
  request.open('GET', url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      cb(data);
    } else cb(fallbackData);
  };

  request.onerror = function () {
    return cb(fallbackData);
  };

  request.send();
}

function createLink(d) {
  return "\n\t<a class='footer-recirc__article' href='https://pudding.cool/".concat(d.url, "' target='_blank'>\n\t\t<img class='article__img' src='https://pudding.cool/common/assets/thumbnails/640/").concat(d.image, ".jpg' alt='").concat(d.hed, "'>\n\t\t<p class='article__headline'>").concat(d.hed, "</p>\n\t</a>\n\t");
}

function recircHTML() {
  var url = window.location.href;
  var html = storyData.filter(function (d) {
    return !url.includes(d.url);
  }).slice(0, 4).map(createLink).join('');
  d3.select('.pudding-footer .footer-recirc__articles').html(html);
}

function setupSocialJS() {
  // facebook
  (function (d, s, id) {
    var js;
    var fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  loadJS('https://platform.twitter.com/widgets.js');
}

function init() {
  loadStories(function (data) {
    storyData = data;
    recircHTML();
    setupSocialJS();
  });
}

var _default = {
  init: init
};
exports.default = _default;
},{}],"epB2":[function(require,module,exports) {
"use strict";

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _isMobile = _interopRequireDefault(require("./utils/is-mobile"));

var _graphic = _interopRequireDefault(require("./graphic"));

var _footer = _interopRequireDefault(require("./footer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global d3 */
var $body = d3.select('body');
var previousWidth = 0;

function resize() {
  // only do resize on width changes, not height
  // (remove the conditional if you want to trigger on height change)
  var width = $body.node().offsetWidth;

  if (previousWidth !== width) {
    previousWidth = width;

    _graphic.default.resize();
  }
}

function setupStickyHeader() {
  var $header = $body.select('header');

  if ($header.classed('is-sticky')) {
    var $menu = $body.select('.header__menu');
    var $toggle = $body.select('.header__toggle');
    $toggle.on('click', function () {
      var visible = $menu.classed('is-visible');
      $menu.classed('is-visible', !visible);
      $toggle.classed('is-visible', !visible);
    });
  }
}

function init() {
  // add mobile class to body tag
  $body.classed('is-mobile', _isMobile.default.any()); // setup resize event
  //set stepperHeight

  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  d3.select(".stepper").style("height", h + "px");
  window.addEventListener('resize', (0, _lodash.default)(resize, 150)); // setup sticky header menu
  // setupStickyHeader();
  // kick off graphic code

  _graphic.default.init(); // load footer stories


  _footer.default.init();
}

init();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./graphic":"TAPd","./footer":"v9Q8"}]},{},["epB2"], null)
//# sourceMappingURL=/main.js.map