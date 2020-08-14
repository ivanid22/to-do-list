/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@ivanid22/js-event-aggregator/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ivanid22/js-event-aggregator/index.js ***!
  \*************************************************************/
/*! exports provided: getAggregatorInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAggregatorInstance\", function() { return getAggregatorInstance; });\nconst eventAggregator = () => {\r\n  const _subscribers = {};\r\n  \r\n  const subscribe = (event, callback) => {\r\n    if(!_subscribers[event])\r\n      _subscribers[event] = []\r\n    _subscribers[event].push(callback);\r\n  }\r\n\r\n  const publish = (event, data) => {\r\n    const callbacks = _subscribers[event];\r\n    if(callbacks) {\r\n      callbacks.forEach((callback) => {\r\n        callback(data)\r\n      });\r\n    }\r\n  }\r\n\r\n  const unsubscribe = (event, callback) => {\r\n    if(_subscribers[event]) {\r\n      const startingLength = _subscribers[event].length;\r\n      _subscribers[event] = _subscribers[event].filter(cb => cb !== callback);\r\n      return (startingLength - _subscribers[event].length) \r\n    }\r\n    return 0;\r\n  }\r\n\r\n  return {\r\n    subscribe,\r\n    publish,\r\n    unsubscribe\r\n  }\r\n}\r\n\r\nlet instance = null;\r\n\r\nconst getAggregatorInstance = () => {\r\n  if(!instance) {\r\n    instance = eventAggregator();\r\n  }\r\n  return instance;\r\n}\n\n//# sourceURL=webpack:///./node_modules/@ivanid22/js-event-aggregator/index.js?");

/***/ }),

/***/ "./src/checklistItem.js":
/*!******************************!*\
  !*** ./src/checklistItem.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ivanid22_js_event_aggregator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ivanid22/js-event-aggregator */ \"./node_modules/@ivanid22/js-event-aggregator/index.js\");\n\n\nconst CheckistItem = (checkistItemtitle) => {\n  const eventAggregator = Object(_ivanid22_js_event_aggregator__WEBPACK_IMPORTED_MODULE_0__[\"getAggregatorInstance\"])();\n  let title = checkistItemtitle;\n  let status = false;\n  const id = Date.now();\n\n  const setTitle = (val) => {\n    title = val;\n    eventAggregator.publish('checklistItemUpdated', id);\n  };\n  const getTitle = () => title;\n  const toggleStatus = () => {\n    status = !status;\n    eventAggregator.publish('checklistItemUpdated', id);\n  };\n  const getStatus = () => status;\n  const getId = () => id;\n\n  return {\n    setTitle,\n    getTitle,\n    toggleStatus,\n    getStatus,\n    getId,\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CheckistItem);\n\n//# sourceURL=webpack:///./src/checklistItem.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ivanid22_js_event_aggregator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ivanid22/js-event-aggregator */ \"./node_modules/@ivanid22/js-event-aggregator/index.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n/* harmony import */ var _checklistItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checklistItem */ \"./src/checklistItem.js\");\n\n\n\n\n\nconst projects = [];\n\nconst eventAggregator = Object(_ivanid22_js_event_aggregator__WEBPACK_IMPORTED_MODULE_0__[\"getAggregatorInstance\"])();\n\n\nconst renderProjects = () => {\n  let projectContainer = document.querySelector('#projectContainer')\n  if (projectContainer) {\n    projectContainer.innerHTML = '';\n  } else {\n    projectContainer = document.createElement('div');\n    projectContainer.id = 'projectContainer';\n  }\n  projects.forEach(element => {\n    const projectDiv = document.createElement('div');\n    projectDiv.innerHTML = element.getName();\n    projectContainer.appendChild(projectDiv);\n  });\n  \n  projectContainer.appendChild(createNewProject());\n\n  const mainContainer = document.querySelector('#container');\n  mainContainer.innerHTML = '';\n  mainContainer.appendChild(projectContainer);\n};\n\nconst validInput = (val) => {\n  return /.+/.test(val);\n};\n\n\n\neventAggregator.subscribe('createNewProject', (val) => {\n  projects.push(Object(_project__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(val));\n});\n\neventAggregator.subscribe('createNewProject', renderProjects);\n\n\nconst createNewProject = () => {\n  const divCreate = document.createElement('div');\n  const itemInput = document.createElement('input');\n  itemInput.setAttribute('type', 'text');\n  itemInput.setAttribute('placeholder', 'New Project');\n  const itemButton = document.createElement('button');\n  itemButton.innerHTML = 'Create';\n  itemButton.onclick = () => {\n    console.log('works?')\n    if (validInput(itemInput.value)) {\n      console.log('Valid')\n      eventAggregator.publish('createNewProject', itemInput.value);\n    }\n  };\n  divCreate.append(itemInput, itemButton);\n  return divCreate;\n};\n\n\n\n\nwindow.onload = () => {\n  // const mainContainer = document.querySelector('#container');\n  // mainContainer.appendChild(createNewProject());\n  renderProjects();\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ivanid22_js_event_aggregator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ivanid22/js-event-aggregator */ \"./node_modules/@ivanid22/js-event-aggregator/index.js\");\n\n\nconst Project = (projectname) => {\n  const eventsAggregator = Object(_ivanid22_js_event_aggregator__WEBPACK_IMPORTED_MODULE_0__[\"getAggregatorInstance\"])();\n  let name = projectname;\n\n  const todos = [];\n  const id = Date.now();\n\n  const getName = () => name;\n  const setName = (val) => { name = val; };\n  const getTodos = () => todos;\n  const getId = () => id;\n\n  const addTodo = (todo) => {\n    todos.push(todo);\n    eventsAggregator.publish('addedTodo', todo);\n  };\n\n  const getTodo = (id) => {\n    const foundTodo = todos.find(todo => todo.getId() === id);\n    return foundTodo;\n  };\n\n  const removeTodo = (id) => {\n    const removeTodo = todos.find(todo => todo.getId() === id);\n    if (removeTodo) {\n      todos.splice(todos.indexOf(removeTodo), 1);\n      eventsAggregator.publish('removedTodo', ...removeTodo);\n      return true;\n    }\n    return false;\n  };\n\n  return {\n    getName,\n    setName,\n    getTodos,\n    getId,\n    addTodo,\n    removeTodo,\n    getTodo,\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Project);\n\n//# sourceURL=webpack:///./src/project.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ivanid22_js_event_aggregator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ivanid22/js-event-aggregator */ \"./node_modules/@ivanid22/js-event-aggregator/index.js\");\n\n\nconst Todo = (todotitle) => {\n  const eventsAggregator = Object(_ivanid22_js_event_aggregator__WEBPACK_IMPORTED_MODULE_0__[\"getAggregatorInstance\"])();\n\n  let title = todotitle;\n  let description = '';\n  let dueDate = -1;\n  let priority = 0;\n  let status = false;\n  const checklists = [];\n  let notes = '';\n  const id = Date.now();\n\n  const getTitle = () => title;\n  const setTitle = val => {\n    title = val;\n    eventsAggregator.publish('todoUpdated', id);\n  };\n\n  const getDescription = () => description;\n  const setDescription = val => {\n    description = val;\n    eventsAggregator.publish('todoUpdated', id);\n  };\n\n  const getDueDate = () => dueDate;\n  const setDueDate = val => {\n    dueDate = val;\n    eventsAggregator.publish('todoUpdated', id);\n  };\n\n  const getPriority = () => priority;\n  const setPriority = val => {\n    priority = val;\n    eventsAggregator.publish('todoUpdated', id);\n  };\n\n  const getStatus = () => status;\n  const setStatus = val => {\n    status = val;\n    eventsAggregator.publish('todoUpdated', id);\n  };\n\n  const addCheckListItem = (checklistItem) => {\n    checklists.push(checklistItem);\n    eventsAggregator.publish('addedChecklist', checklistItem);\n  };\n\n  const getCheckListItem = (id) => {\n    const foundCheckListItem = checklists.find(checklist => checklist.getId() === id);\n    return foundCheckListItem;\n  };\n\n  const removeCheckListItem = (id) => {\n    const removeCheckList = checklists.find(checklist => checklist.getId() === id);\n    if (removeCheckList) {\n      checklists.splice(checklists.indexOf(removeCheckList), 1);\n      eventsAggregator.publish('removedChecklist', ...removeCheckList);\n      return true;\n    }\n    return false;\n  };\n\n  const getAllChecklistItems = () => checklists;\n\n  const getNotes = () => notes;\n  const setNotes = val => { notes = val; };\n\n  const getId = () => id;\n\n  return {\n    getTitle,\n    setTitle,\n    getDescription,\n    setDescription,\n    getDueDate,\n    setDueDate,\n    getPriority,\n    setPriority,\n    getStatus,\n    setStatus,\n    addCheckListItem,\n    getCheckListItem,\n    removeCheckListItem,\n    getAllChecklistItems,\n    getNotes,\n    setNotes,\n    getId,\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Todo);\n\n\n//# sourceURL=webpack:///./src/todo.js?");

/***/ })

/******/ });