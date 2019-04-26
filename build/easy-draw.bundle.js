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

/***/ "./src/basic.js":
/*!**********************!*\
  !*** ./src/basic.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tool = __webpack_require__(/*! ./tool */ \"./src/tool.js\");\n\nclass Basic {\n  constructor (options) {\n    this.EasyDraw = options.EasyDraw;\n\n    this.id = options.id;\n    this.ctx = options.ctx;\n    // If current polycon is active\n    this.active = true;\n\n    // Shape style\n    this.style = options.style;\n\n    // Shape Object\n    this.shapeObject = null;\n\n    // Shape points \n    this.points = options.points || [];\n    // Shape handle points\n    this.handlePoints = [];\n\n    this.defaultStyle = {\n      lineWidth: 2,\n      fillStyle: 'rgba(255, 255, 255, 0.5)',\n      strokeStyle: '#409EFF'\n    };\n  }\n\n  updateStyle (style = {}) {\n    this.ctx.lineWidth = style.lineWidth;\n    this.ctx.fillStyle = style.fillStyle;\n    this.ctx.strokeStyle = style.strokeStyle;\n  }\n\n  drawPath (path, style = {}) {\n    const newPath = new Path2D(path);\n    this.updateStyle(style);\n    this.ctx.fill(newPath);\n    this.ctx.stroke(newPath);\n    return newPath;\n  }\n\n  drawRect (params) {\n    const { x, y, width, height, style = {} } = params;\n    const newRect = new Path2D();\n    newRect.rect(x, y, width, height);\n    this.updateStyle(style);\n    this.ctx.fill(newRect);\n    this.ctx.stroke(newRect);\n    return this\n  }\n\n  trigger (event) {\n    const { type } = event;\n    switch (type) {\n      case 'mousedown':\n        if (this.handleMouseDown && typeof this.handleMouseDown === 'function') {\n          this.handleMouseDown(event);\n        }\n        break;\n      case 'mousemove':\n        if (this.handleMouseMove && typeof this.handleMouseDown === 'function') {\n          this.handleMouseMove(event);\n        }\n        break;\n      case 'mouseup':\n        if (this.handleMouseUp && typeof this.handleMouseDown === 'function') {\n          this.handleMouseUp(event);\n        }\n        break;\n    }\n  }\n\n  finish () {\n    this.active = false;\n    this.handlePoints = [];\n    this.EasyDraw.refreshShapes();\n    return {\n      id: this.id,\n      points: this.points,\n      path: Tool.pointsToSVGPath(this.points)\n    }\n  }\n\n  isPointInShape (point, shape) {\n    const { x, y } = point;\n    return this.ctx.isPointInPath(shape, x, y);\n  }\n}\n\nmodule.exports = Basic;\n\n//# sourceURL=webpack:///./src/basic.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Polygon = __webpack_require__(/*! ./polygon */ \"./src/polygon.js\");\nconst Rect = __webpack_require__(/*! ./rect */ \"./src/rect.js\");\n\nclass EasyDraw {\n  constructor (options) {\n    this.canvasDOM = options.canvas;\n    this.ctx = this.canvasDOM.getContext(\"2d\");\n\n    this.shapeInCanvas = {};\n    this._initCanvasEvent();\n    // Current model view/edit\n    this.model = 'view';\n    this.editingShapeId = null;\n  }\n\n  _initCanvasEvent () {\n    this.canvasDOM.addEventListener('mousedown', this._distributeCanvasEvent.bind(this));\n    this.canvasDOM.addEventListener('mousemove', this._distributeCanvasEvent.bind(this));\n    this.canvasDOM.addEventListener('mouseup', this._distributeCanvasEvent.bind(this));\n  }\n\n  _distributeCanvasEvent (event) {\n    const { type } = event;\n    // trigger all events when in edit model\n    if (this.model === 'edit') {\n      for (let shape in this.shapeInCanvas) {\n        // should only one shape in active status\n        if (this.shapeInCanvas[shape].active) {\n          this.shapeInCanvas[shape].trigger(event);\n          break;\n        }\n      }\n    } else if (this.model === 'view' && type === 'mousedown') {\n      for (let shape in this.shapeInCanvas) {\n        this.shapeInCanvas[shape].trigger(event);\n      }\n    }\n  }\n\n  removeAll () {\n    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)\n    return this\n  }\n\n  /**\n   * Finish current drawing\n   */\n  finish () {\n    this.model = 'view';\n    const shape = this.shapeInCanvas[this.editingShapeId].finish();\n    this.editingShapeId = null;\n    return shape;\n  }\n\n  /**\n   * Remove shape by unique id\n   * @param {*} uniqueId\n   */\n  removeShape (id) {\n    if (this.shapeInCanvas[id]) {\n      delete this.shapeInCanvas[id];\n      this.refreshShapes();\n    } else {\n      console.warn('Shape not exist')\n    }\n  }\n\n  refreshShapes () {\n    this.removeAll();\n    for (let shape in this.shapeInCanvas) {\n      this.shapeInCanvas[shape].refresh();\n    }\n  }\n\n  addShape (params) {\n    const { id, type } = params;\n    if (!id) {\n      throw new Error(`Shape id can not be empty`);\n    }\n    if (this.shapeInCanvas[id]) {\n      throw new Error(`Shape id must be unique, shape id '${id}' has already exist`);\n    }\n    this.model = 'edit';\n    this.editingShapeId = id;\n    if (type === 'path') {\n    } else if (type === 'polygon') {\n      return this._addPolygon(params);\n    } else if (type === 'rect') {\n      return this._addRect(params);\n    }\n  }\n\n  _addPolygon (params) {\n    const { id, style } = params;\n    this.shapeInCanvas[id] = new Polygon({ id, ctx: this.ctx, style, EasyDraw: this });\n    return this.shapeInCanvas[id];\n  }\n\n  _addRect (params) {\n    const { id, style } = params;\n    this.shapeInCanvas[id] = new Rect({ id, ctx: this.ctx, style, EasyDraw: this });\n    return this.shapeInCanvas[id];\n  }\n  \n  \n}\n\nwindow.EasyDraw = EasyDraw;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/polygon.js":
/*!************************!*\
  !*** ./src/polygon.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tool = __webpack_require__(/*! ./tool */ \"./src/tool.js\");\nconst Basic = __webpack_require__(/*! ./basic */ \"./src/basic.js\");\n\nclass Polygon extends Basic {\n  constructor (options) {\n    super(options);\n    \n    this.handlePointIndex = null;\n  \n    this.handlePointStyle = options.handlePointStyle;\n    this.defaultHandlePointStyle = {\n      lineWidth: 2,\n      fillStyle: 'rgba(255, 255, 255, 0.5)',\n      strokeStyle: '#F56C6C',\n      radius: 8\n    };\n    this.initPolygon();\n  }\n\n  initPolygon () {\n    if (this.points.length > 0) {\n      // TODO generate handle points with points\n    }\n  }\n\n  update (params) {\n    if (!params) {\n      return\n    }\n    const { style, active } = params;\n    if (style !== undefined) {\n      this.style = Object.assign({}, this.style, style);\n    }\n    if (active !== undefined) {\n      this.active = active;\n    }\n    // TODO Add refresh shape logic\n  }\n\n  refresh () {\n    this.refreshShape()\n    this.refreshHandlePoints()\n  }\n\n  refreshShape () {\n    const path = Tool.pointsToSVGPath(this.points);\n    this.shapeObject = this.drawPath(path, Object.assign({}, this.defaultStyle, this.style));\n  }\n\n  refreshHandlePoints () {\n    for (let handlePoint of this.handlePoints) {\n      handlePoint.obj = this._drawHandlePoint(handlePoint.point[0], handlePoint.point[1], handlePoint.style);\n    }\n  }\n  \n  handleMouseDown (event) {\n    if (!this.active) {\n      \n    } else {\n      const { offsetX: x, offsetY: y } = event;\n      const handlePointIndex = this._isClickHandlePoint(x, y);\n      if (handlePointIndex === null ) {\n        this.handlePointIndex = null;\n        this.points.push([x, y]);\n        this.handlePoints.push({\n          obj: null,\n          point: [x, y]\n        });\n        this.EasyDraw.refreshShapes();\n      } else {\n        this.handlePointIndex = handlePointIndex;\n      }\n    }\n  }\n\n  handleMouseMove (event) {\n    if (!this.active) {\n      \n    } else {\n      if (this.handlePointIndex !== null) {\n        const { offsetX: x, offsetY: y } = event;\n        this.points[this.handlePointIndex] = [x, y];\n        this.handlePoints[this.handlePointIndex].point = [x, y];\n        this.EasyDraw.refreshShapes();\n      }\n    }\n  }\n\n  handleMouseUp () {\n    if (this.handlePointIndex !== null) {\n      this.handlePointIndex = null;\n    }\n  }\n\n  /**\n   * Draw Handle Point\n   * @param {Number} x \n   * @param {Number} y \n   * @param {Object} style \n   */\n  _drawHandlePoint (x, y, style = this.defaultHandlePointStyle) {\n    const handlePoint = new Path2D();\n    handlePoint.arc(x, y, style.radius, 0, 2 * Math.PI);\n    this.updateStyle(style);\n    this.ctx.fill(handlePoint);\n    this.ctx.stroke(handlePoint);\n    return handlePoint;\n  }\n\n  _getHandlePointStyle () {\n    return Object.assign({}, this.handlePointStyle, this.defaultHandlePointStyle);\n  }\n\n  _isClickHandlePoint (x, y) {\n    let handlePointIndex = null;\n    for (let i = 0; i < this.handlePoints.length; i++) {\n      if (this.isPointInShape({x, y}, this.handlePoints[i].obj)) {\n        handlePointIndex = i;\n        break;\n      }\n    }\n    return handlePointIndex;\n  }\n}\n\nmodule.exports = Polygon;\n\n//# sourceURL=webpack:///./src/polygon.js?");

/***/ }),

/***/ "./src/rect.js":
/*!*********************!*\
  !*** ./src/rect.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tool = __webpack_require__(/*! ./tool */ \"./src/tool.js\");\nconst Basic = __webpack_require__(/*! ./basic */ \"./src/basic.js\");\n\nclass Rect extends Basic {\n  constructor (options) {\n    super(options);\n    this.initRect();\n  }\n\n  initRect () {\n\n  }\n}\n\nmodule.exports = Rect;\n\n//# sourceURL=webpack:///./src/rect.js?");

/***/ }),

/***/ "./src/tool.js":
/*!*********************!*\
  !*** ./src/tool.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Tool {\n  /**\n   * Covert points[x, y] to svg path\n   * @param {Array[number, number]} points \n   */\n  static pointsToSVGPath (points) {\n    return 'M' + points.join('L') + 'Z'\n  }\n\n  /**\n   * Get distance between two points\n   * @param {Array[x, y]} pointA \n   * @param {Array[x, y]} pointB \n   */\n  static getDistanceBetweenTwoPoints (pointA, pointB) {\n    const xDistance = pointA[0] - pointB[0];\n    const yDistance = pointA[1] - pointB[1];\n    return Math.sqrt(xDistance * xDistance + yDistance * yDistance).toFixed(2);\n  }\n}\n\nmodule.exports = Tool;\n\n//# sourceURL=webpack:///./src/tool.js?");

/***/ })

/******/ });