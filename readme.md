#lettera

Lettera gives you a typewriter effect for innerHTMLs

[Demo pen](http://codepen.io/bquentin/pen/YGvPBz)

![Lettera](https://raw.githubusercontent.com/bquentink/lettera/master/lettera.gif)



####Setup

`npm install --save lettera`

```javascript
//then
var lettera = require('lettera');
// or
import lettera from 'lettera';
```

or

[`Download lettera.min.js`](https://raw.githubusercontent.com/bquentink/lettera/master/lettera.min.js)

```html
<script src="lettera.min.js" type="text/javascript"></script>
```


####Use


```javascript
// Set up the lettera effect
var typewriterEffect = lettera.init(options);

// Start the effect
// Callback returns false if stopped by user, or true if completed
typewriterEffect.start(callback);

// Stop the effect
typewriterEffect.stop();

// Clear the element innerHTML
typewriterEffect.clear();

// available options
var options = {
    element     : (element),  // required
    string      : (string),   // required
    autostart   : (bool),     // optional, default : false
    autoclear   : (bool),     // optional, default : false
    minHeight   : (bool),     // optional, default : true
    minDelay    : (number),   // optional, default : 10(ms)
    maxDelay    : (number),   // optional, default : 40(ms)
    errorChance : (number)    // optional, default : 0(%)
}
```


