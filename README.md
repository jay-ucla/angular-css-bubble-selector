This is an AngularJS module which provides a CSS gadget to display options in animated bubbles arranged in a circle.
![Preview](preview.gif?raw=true "Preview")

https://media.giphy.com/media/iehKXWnuRsXropciRe/giphy.gif

The module can be included as bubbleLib, and the gadget can be used as a directive bubbleGrid as :
```
<div data-bubble-grid="values" data-bg-field-name="{{field}}" data-bg-callback="selectVal(val)" data-bg-title="Choose a number" data-bubble-style="customStyle"></div>'
```

The following parameters can be passed into bubbleGrid:
1. bubbleGrid (reqd): the array of options to be displayed
2. bgCallback (reqd): the callback to be executed with a selected options
3. bgFieldName (reqd): The key used to access the value of an option in the array
4. bgTitle (reqd): The title displayed in the center of the circle of options
5. bubbleStyle: Custom CSS to be applied to each option/bubble



A ready to see demo is provided in the repository, along with all the source code for the demo. The demo can be viewed by following these steps:
1. Install node
2. Clone this repo
3. cd to demo/
4. execute `node app`
