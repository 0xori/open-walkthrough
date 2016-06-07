/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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
	    walkThoughExecutor.setFloatingButtonTemplate("<div id='customTemplate'>Guide me Yo</div>");
	    walkThoughExecutor.setActions(actions);
	    walkThoughExecutor.runButton();
	    walkThoughExecutor.registerOnWalkThroughFinish(walkThoughExecutor.resetWalkthrough);
	});

/***/ }
/******/ ]);