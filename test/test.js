$ = require("jquery");
jQuery = require("jquery");
var walkThoughExecutor = require("../src/walkThoughExecutor");
var actionTypes = require("../src/actionTypes");

var action1 = {
    selector: '#yo1',
    type: actionTypes.ACTION_POPOVER,
    data: {
        title: "Click Here",
        description: "Get in Shape",
        placement: "right"
    }
};
var action2 = {
    selector: '#yo2',
    type: actionTypes.ACTION_POPOVER,
    data: {
        title: "Click Here",
        description: "Get in Shape"
    }
};
var action3 = {
    selector: '#yo3',
    type: actionTypes.ACTION_POPOVER,
    data: {
        title: "Click Here",
        description: "Get in Shape"
    }
};
var action4 = {
    selector: '#yo4',
    type: actionTypes.ACTION_POPOVER,
    data: {
        title: "Click Here",
        container: "body",
        description: "Get in Shape"
    }
};

var actions = [action1, action2, action3, action4];

$(document).ready(function () {
    walkThoughExecutor.setActions(actions);
    walkThoughExecutor.run();
    walkThoughExecutor.registerOnWalkThroughFinish(walkThoughExecutor.resetWalkthrough);
});