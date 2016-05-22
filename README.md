"# open-walkthrough" 

this is a client side website walkthrough executor engine.

installation:
npm i open-walkthrough

usage:

var walkThoughExecutor = require("./src/walkThoughExecutor");
var actionTypes = require("./src/actionTypes");

var action1 = {
    selector: '#yo1',
    type: actionTypes.ACTION_POPOVER,
    data: {
        title: "Click Here",
        description: "Get in Shape"
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
        description: "Get in Shape"
    }
};

var actions = [action1,action2,action3,action4];

walkThoughExecutor.setActions(actions);
walkThoughExecutor.run();


