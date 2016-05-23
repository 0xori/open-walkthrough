/**
 * Created by 0xori on 18-May-16.
 */
 const $ = require("jquery");
 const jQuery = require("jquery");
 require('bootstrap');

var actionTypes = require("./actionTypes");

var actionsStack = [];
var currAction = 0;

var beforeWalkthroughStackCallback = [];
var beforeNextStackCallback = [];
var afterNextStackCallback = [];
var finishStackCallbacks = [];

var walkThoughExecutor = {

    setActions: function(actions){
        actionsStack = actions;
    },

    addAction: function(action){
        actionsStack.push(action);
    },

    run: function(){
        this.onBeforeWalkthrough();
        var firstAction = actionsStack[0];
        this.runAction(firstAction);
    },

    runAction: function(action){
        switch (action.type){
            case actionTypes.ACTION_POPOVER:
                walkThoughExecutor.renderPopover(action);
                break;
        }
    },

    handleNext: function(){

        var prevActionIndex = currAction;
        currAction++;
        var prevAction = actionsStack[prevActionIndex];
        if(currAction + 1 > actionsStack.length){
            walkThoughExecutor.hidePopover(prevAction.selector);
            walkThoughExecutor.onWalkThroughFinish();
        }
        else{
            walkThoughExecutor.onBeforeNext();
            walkThoughExecutor.hidePopover(prevAction.selector);
            walkThoughExecutor.runAction(actionsStack[currAction]);    
            walkThoughExecutor.onAfterNext();
        }
    },

    renderPopover: function(action){
        var options ={
            title: action.data.title,
            content: action.data.description,
            placement: action.data.placement ? action.data.placement : "auto",
            template: '<div class="popover vt-popover walkthrough-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><button class="nextPop">Next</button></button></div>'
        };

       this.showPopover(action.selector, options);
    },

    showPopover: function(selector, options){
        $(selector).popover(options);
        $(selector).popover("show");
        $(".nextPop").on("click", this.handleNext);
    },

    hidePopover: function(selector){
        $(selector).popover("hide");
    },

    registerOnWalkThroughFinish: function(callback){
        finishStackCallbacks.push(callback);
    },

    registerBeforeWalkThrough: function(callback){
        beforeWalkthroughStackCallback.push(callback);
    },

    registerBeforeNext: function(callback){
        beforeNextStackCallback.push(callback);
    },

    registerAfterNext: function(callback){
        afterNextStackCallback.push(callback);
    },

    onWalkThroughFinish: function(){
        console.log("onWalkThroughFinish");
        for(var i=0; i<finishStackCallbacks.length; i++){
            try{
                finishStackCallbacks[i]();
            }catch(e){
                console.error(e);
            }
        }
    },

    onBeforeWalkthrough: function(){
        console.log("onBeforeWalkthrough");
        for(var i=0; i<beforeWalkthroughStackCallback.length; i++){
            try{
                beforeWalkthroughStackCallback[i]();
            }catch(e){
                console.error(e);
            }
        }
    },

    onBeforeNext: function(){
         console.log("onBeforeNext");
        for(var i=0; i<beforeNextStackCallback.length; i++){
            try{
                beforeNextStackCallback[i]();
            }catch(e){
                console.error(e);
            }
        }
    },

    onAfterNext: function(){
         console.log("afterNextStackCallback");
        for(var i=0; i<afterNextStackCallback.length; i++){
            try{
                beforeNextStackCallback[i]();
            }catch(e){
                console.error(e);
            }
        }
    }

};

module.exports = walkThoughExecutor;