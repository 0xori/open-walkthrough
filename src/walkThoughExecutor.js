/**
 * Created by 0xori on 18-May-16.
 */
var style = require("../assets/css/main.css");
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

    _backgroundLayerSelector : "open-walkthrough-overlay",

    _floatingButtonSelector: "open-walkthrough-floating-button",

    _floatingButtonText: "Guide Me",

    init: function(){
        walkThoughExecutor.renderBackgroundLayer();
        walkThoughExecutor.showBackgroundLayer();
        walkThoughExecutor.renderFloatingButton();
        walkThoughExecutor.hideFloatingButton()
        // reset actions in case of hash chane (we don't want actions to run on other pages)
        $(window).bind('hashchange', function() {
           walkThoughExecutor.resetActions();
        });
    },

    setFloatingButtonText: function(text){
        walkThoughExecutor._floatingButtonText = text;
    },

    setActions: function(actions){
        walkThoughExecutor.resetActions();
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
        try{
            switch (action.type){
                case actionTypes.ACTION_POPOVER:
                    walkThoughExecutor.renderPopover(action);
                    break;
            }
        }
        catch (e){
            console.error("unable to run action:", action, e);
        }

    },

    stopAction: function(action){
        try {
            switch (action.type){
                case actionTypes.ACTION_POPOVER:
                    walkThoughExecutor.hidePopover(action.selector);
                    break;
            }
        }catch (e){
            console.error("unable to stop action:", action, e);
        }

    },

    resetActions: function(){
        for(var i =0; i< actionsStack.length; i++){
            walkThoughExecutor.resetAction(actionsStack[i]);
        }
        actionsStack = [];
        walkThoughExecutor.resetIndex();
    },

    resetAction: function(action){
        switch (action.type){
            case actionTypes.ACTION_POPOVER:
                walkThoughExecutor.destroyPopover(action.selector);
                break;
        }
    },

    resetIndex: function(){
        currAction = 0;
    },

    resetWalkthrough: function(){
        walkThoughExecutor.resetActions();
        walkThoughExecutor.resetIndex();
        walkThoughExecutor.hideBackgroundLayer();
        walkThoughExecutor.hideFloatingButton();
        beforeWalkthroughStackCallback = [];
        beforeNextStackCallback = [];
        afterNextStackCallback = [];
        finishStackCallbacks = [];
    },

    handleNext: function(){

        var prevActionIndex = currAction;
        currAction++;
        var prevAction = actionsStack[prevActionIndex];
        if(currAction + 1 > actionsStack.length){
            walkThoughExecutor.stopAction(prevAction);
            walkThoughExecutor.onWalkThroughFinish();
        }
        else{
            walkThoughExecutor.onBeforeNext();
            walkThoughExecutor.stopAction(prevAction);
            walkThoughExecutor.runAction(actionsStack[currAction]);    
            walkThoughExecutor.onAfterNext();
        }
    },

    renderPopover: function(action){
        var options ={
            title: action.data.title,
            content: action.data.description,
            placement: action.data.placement ? action.data.placement : "auto",
            container: action.data.container ? action.data.container : false,
            template: '<div class="popover vt-popover walkthrough-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><button class="nextPop">Next</button></button></div>',
            trigger: "manual"
        };

       this.showPopover(action.selector, options);
    },

    showPopover: function(selector, options){
        $(selector).popover(options);
        $(selector).popover("show");
        $(".nextPop").off("click");
        $(".nextPop").on("click", this.handleNext);
    },

    hidePopover: function(selector){
        $(selector).popover("hide");
    },

    destroyPopover: function(selector){
        $(selector).popover("destroy");
    },


    showFloatingButton: function(){
        $("#"+walkThoughExecutor._floatingButtonSelector).show();
    },

    hideFloatingButton: function(){
        $("#"+walkThoughExecutor._floatingButtonSelector).hide();
    },

    suspendWalkthrough:function(){
        walkThoughExecutor.hideBackgroundLayer();
        if(currAction + 1 <= actionsStack.length){
            var currentAction = actionsStack[currAction];
            walkThoughExecutor.stopAction(currentAction);
        }
        walkThoughExecutor.resetIndex();
        walkThoughExecutor.renderFloatingButton();
        walkThoughExecutor.showFloatingButton();
    },

    resumeWalkthrough: function(){
        if(currAction + 1 <= actionsStack.length){
            var currentAction = actionsStack[currAction];
            walkThoughExecutor.runAction(currentAction);
            walkThoughExecutor.hideFloatingButton();
            walkThoughExecutor.showBackgroundLayer();
        }
        else {
            console.log("couldn't resume Walkthrough");
        }
    },

    renderFloatingButton: function(){
        if($("#"+walkThoughExecutor._floatingButtonSelector).length){
            return;
        }
        var button = "<div id='"+walkThoughExecutor._floatingButtonSelector+"'>"+walkThoughExecutor._floatingButtonText+"</div>";
        $('body').append(button);
        $("#"+walkThoughExecutor._floatingButtonSelector).on("click",this.resumeWalkthrough);
    },

    renderBackgroundLayer: function(){
        if($("#"+walkThoughExecutor._backgroundLayerSelector).length){
            return;
        }
        var overlay = "<div id='"+walkThoughExecutor._backgroundLayerSelector+"'></div>";
        $('body').append(overlay);
        $("#"+walkThoughExecutor._backgroundLayerSelector).on("click",this.suspendWalkthrough);
    },

    showBackgroundLayer: function(){
        $("#"+walkThoughExecutor._backgroundLayerSelector).show();
    },

    hideBackgroundLayer: function(){
        $("#"+walkThoughExecutor._backgroundLayerSelector).hide();
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
        walkThoughExecutor.hideBackgroundLayer();
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
        walkThoughExecutor.init();
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