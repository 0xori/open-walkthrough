//$ = require("jquery");
//jQuery = require("jquery");
//var walkThoughExecutor = require("../lib/open-walkthrough");
//var actionTypes = require("../src/actionTypes");

var action1 = {
    selector: '#yo1',
    type: 1,
    data: {
        title: "Click Here",
        description: "Get in Shape",
        placement: "right"
    }
};
var action2 = {
    selector: '#yo2',
    type: 1,
    data: {
        title: "Click Here",
        description: "Get in Shape"
    }
};
var action3 = {
    selector: '#yo3',
    type: 1,
    data: {
        title: "Click Here",
        description: "Get in Shape"
    }
};
var action4 = {
    selector: '#yo4',
    type: 1,
    data: {
        title: "Click Here",
        container: "body",
        description: "Get in Shape"
    }
};

var actions = [action1, action2, action3, action4];

$(document).ready(function () {
    var options = {
        scrollOffsetElements: {
            header: ".stiky-header"
        },
        floatingButtonTemplate: "<div id='customTemplate'>Guide me Yo</div>"
    };
    openWalkthrough.init(options);
    openWalkthrough.setActions(actions);
    openWalkthrough.runButton();
    openWalkthrough.registerOnWalkThroughFinish(openWalkthrough.resetWalkthrough);
});