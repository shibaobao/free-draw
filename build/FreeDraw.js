!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.FreeDraw=e():t.FreeDraw=e()}(window,function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/build/",i(i.s=0)}([function(t,e,i){t.exports=i(1)},function(t,e,i){"use strict";i.r(e);var n={lineWidth:2,fillStyle:"#FFFFFF",strokeStyle:"#0E71EB",width:8},s={lineWidth:2,fillStyle:"rgba(14, 113, 235, 0.25)",strokeStyle:"#0E71EB"},o={lineWidth:2,fillStyle:"rgba(14, 113, 235, 0.8)",strokeStyle:"rgba(14, 113, 235, 0.8)"};function a(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var r=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=e.id,this.type=e.type,this.edit=e.edit||!0,this.points=e.points||[],this.path=e.points||"",this.handlePoints=[],this.clickedHandlePointIndex=null,this.clickedShape=!1,this.clickedShapePoint=[],this.clickedHandlePoint=!1,this.freeDraw=e.freeDraw,this.handlePointStyle=e.handlePointStyle,this.shapeStyle=e.shapeStyle,this.shape=null}var e,i,r;return e=t,(i=[{key:"_initShape",value:function(){this.handlePointStyle||(this.handlePointStyle=n),this.shapeStyle||(this.shapeStyle=s)}},{key:"_trigger",value:function(t){switch(t.type){case"mousedown":this._handleMouseDown&&"function"==typeof this._handleMouseDown&&this._handleMouseDown(t);break;case"mousemove":this._handleMouseMove&&"function"==typeof this._handleMouseMove&&this._handleMouseMove(t);break;case"mouseup":this._handleMouseUp&&"function"==typeof this._handleMouseUp&&this._handleMouseUp(t);break;case"keydown":this._handleKeydown&&"function"==typeof this._handleKeydown&&this._handleKeydown(t)}}},{key:"_drawRectPoint",value:function(t,e,i,n){var s=new Path2D;return s.rect(t-i/2,e-i/2,i,i),this.freeDraw._updateCtxStyle(n),this.freeDraw.ctx.fill(s),this.freeDraw.ctx.stroke(s),s}},{key:"_drawCirclePoint",value:function(t,e,i,n){var s=new Path2D;return s.arc(t,e,i,0,2*Math.PI,!1),this.freeDraw._updateCtxStyle(n),this.freeDraw.ctx.fill(s),this.freeDraw.ctx.stroke(s),s}},{key:"_includes",value:function(t,e){return this._pointInHandlePoints(t,e)||this._pointInShape(t,e)}},{key:"_handleMouseDown",value:function(t){var e=t.offsetX,i=t.offsetY;this._pointInHandlePoints(e,i)?(this.clickedHandlePoint=!0,this.clickedShapePoint=[],this.clickedShape=!1):this._pointInShape(e,i)?(this.clickedHandlePoint=!1,this.clickedShapePoint=[e,i],this.clickedShape=!0):"polygon"===this.type&&this._polygonMouseDown(t)}},{key:"_handleMouseUp",value:function(){this.clickedShape=!1,this.clickedHandlePoint=!1,this.clickedShapePoint=[]}},{key:"_pointInShape",value:function(t,e){return!!this.shape&&this.freeDraw.ctx.isPointInPath(this.shape,t,e)}},{key:"_pointInHandlePoints",value:function(t,e){var i=!1;if(this.edit){for(var n=null,s=0;s<this.handlePoints.length;s++)if(this.freeDraw.ctx.isPointInPath(this.handlePoints[s].obj,t,e)){i=!0,n=s;break}this.clickedHandlePointIndex=n}return i}},{key:"editShape",value:function(){return this.shapeStyle=s,this.edit=!0,this.freeDraw._updateModel("edit",this.id),this.freeDraw._refreshShapesInCanvas(),this._backupData(),this}},{key:"finish",value:function(){return this.edit=!1,this.freeDraw._updateModel("view"),this.shapeStyle=o,this._pointsToPath&&"function"==typeof this._pointsToPath&&this._pointsToPath(),this.freeDraw._refreshShapesInCanvas(),this}},{key:"cancelEdit",value:function(){return this.shapeStyle=o,this.edit=!1,this.freeDraw._updateModel("view"),this._rollbackData(),this.freeDraw._refreshShapesInCanvas(),this}},{key:"getHandlePointCoordinate",value:function(t){return this.handlePoints[t]?this.handlePoints[t].point:null}}])&&a(e.prototype,i),r&&a(e,r),t}();function h(t){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function u(t,e){return!e||"object"!==h(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var d=function(t){function e(t){var i;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(i=u(this,f(e).call(this,t))).startPoint=t.startPoint||[],i.width=t.width,i.height=t.height,i.startPointBackup=[],i.widthBackup=null,i.heightBackup=null,i.pointsBackup=[],i.pathBackup="",i._initRect(),i}var i,n,s;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(e,r),i=e,(n=[{key:"_initRect",value:function(){this._initShape(),this.startPoint.length>0&&this.width&&this.height&&this._draw()}},{key:"_draw",value:function(){this._generateHandlePointsByPoints(),this.shape=this._drawRect(),this.edit&&this._drawRectHandlePoints()}},{key:"_generateHandlePointsByPoints",value:function(){var t=this.getZoomAndMove(),e=t.startPoint,i=t.width,n=t.height;this.handlePoints[0]={obj:null,point:e},this.handlePoints[1]={obj:null,point:[e[0]+i,e[1]]},this.handlePoints[2]={obj:null,point:[e[0]+i,e[1]+n]},this.handlePoints[3]={obj:null,point:[e[0],e[1]+n]}}},{key:"_drawRectHandlePoints",value:function(){for(var t=0;t<4;t++)this.handlePoints[t].obj=this._drawRectPoint(this.handlePoints[t].point[0],this.handlePoints[t].point[1],this.handlePointStyle.width,{lineWidth:this.handlePointStyle.lineWidth,fillStyle:this.handlePointStyle.fillStyle,strokeStyle:this.handlePointStyle.strokeStyle})}},{key:"_drawRect",value:function(){var t=this.getZoomAndMove(),e=t.startPoint,i=t.width,n=t.height,s=new Path2D;return s.rect(e[0],e[1],i,n),this.freeDraw._updateCtxStyle(this.shapeStyle),this.freeDraw.ctx.fill(s),this.freeDraw.ctx.stroke(s),s}},{key:"_handleMouseMove",value:function(t){var e=t.offsetX,i=t.offsetY;if(this.clickedHandlePoint){var n=this.handlePoints[this.clickedHandlePointIndex].point;0===this.clickedHandlePointIndex?(this.width+=(n[0]-e)/this.freeDraw.zoomLevel,this.height+=(n[1]-i)/this.freeDraw.zoomLevel,this.startPoint=[this.startPoint[0]+(e-n[0])/this.freeDraw.zoomLevel,this.startPoint[1]+(i-n[1])/this.freeDraw.zoomLevel]):1===this.clickedHandlePointIndex?(this.width+=(e-n[0])/this.freeDraw.zoomLevel,this.height+=(n[1]-i)/this.freeDraw.zoomLevel,this.startPoint[1]+=(i-n[1])/this.freeDraw.zoomLevel):2===this.clickedHandlePointIndex?(this.width+=e-n[0],this.height+=i-n[1]):3===this.clickedHandlePointIndex&&(this.width+=(n[0]-e)/this.freeDraw.zoomLevel,this.height+=(i-n[1])/this.freeDraw.zoomLevel,this.startPoint[0]+=(e-n[0])/this.freeDraw.zoomLevel),this.freeDraw.eventsReceive.includes("transform")&&this.freeDraw.eventsCallBack(t,this.id,"transform")}else this.clickedShape&&(this.startPoint=[this.startPoint[0]+(e-this.clickedShapePoint[0])/this.freeDraw.zoomLevel,this.startPoint[1]+(i-this.clickedShapePoint[1])/this.freeDraw.zoomLevel],this.clickedShapePoint=[e,i],this.freeDraw.eventsReceive.includes("drag")&&this.freeDraw.eventsCallBack(t,this.id,"drag"));this._generateHandlePointsByPoints(),this.freeDraw._refreshShapesInCanvas()}},{key:"getZoomAndMove",value:function(){var t=this.width,e=this.height;t=this.width*this.freeDraw.zoomLevel,e=this.height*this.freeDraw.zoomLevel;var i=(this.startPoint[0]-this.freeDraw.transformCenter[0])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[0],n=(this.startPoint[1]-this.freeDraw.transformCenter[1])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[1];return 0!==this.freeDraw.offsetLeft&&(i+=this.freeDraw.offsetLeft),0!==this.freeDraw.offsetTop&&(n+=this.freeDraw.offsetTop),{width:t,height:e,startPoint:[i,n]}}},{key:"_pointsToPath",value:function(){this.points[0]=this.startPoint,this.points[1]=[this.startPoint[0]+this.width,this.startPoint[1]],this.points[2]=[this.startPoint[0]+this.width,this.startPoint[1]+this.height],this.points[3]=[this.startPoint[0],this.startPoint[1]+this.height],this.path="M".concat(this.points[0].join(","),"L").concat(this.points[1].join(","),"L").concat(this.points[2].join(","),"L").concat(this.points[3].join(","),"Z")}},{key:"_backupData",value:function(){this.startPointBackup=JSON.parse(JSON.stringify(this.startPoint)),this.widthBackup=this.width,this.heightBackup=this.height,this.pointsBackup=JSON.parse(JSON.stringify(this.points)),this.pathBackup=this.path}},{key:"_rollbackData",value:function(){this.startPoint=JSON.parse(JSON.stringify(this.startPointBackup)),this.width=this.widthBackup,this.height=this.heightBackup,this.points=JSON.parse(JSON.stringify(this.pointsBackup)),this.path=this.pathBackup}}])&&l(i.prototype,n),s&&l(i,s),e}();function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function v(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function y(t,e){return!e||"object"!==p(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function w(t){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function k(t,e){return(k=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var P=function(t){function e(t){var i;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(i=y(this,w(e).call(this,t))).x=t.x,i.y=t.y,i.radiusX=t.radiusX,i.radiusY=t.radiusY,i.rotation=t.rotation||0,i.startAngle=t.startAngle||0,i.endAngle=t.endAngle||2*Math.PI,i.anticlockwise=t.anticlockwise||!1,i.xBackup=null,i.yBackup=null,i.radiusXBackup=null,i.radiusYBackup=null,i.rotationBackup=null,i.startAngleBackup=null,i.endAngleBackup=null,i.anticlockwiseBackup=null,i._initEllipse(),i}var i,n,s;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&k(t,e)}(e,r),i=e,(n=[{key:"_initEllipse",value:function(){this._initShape(),this.x&&this.y&&this.radiusX&&this.radiusY&&this._draw()}},{key:"_generateHandlePointsByPoints",value:function(){var t=this.getZoomAndMove(),e=t.x,i=t.y,n=t.radiusX,s=t.radiusY;this.handlePoints[0]={obj:null,point:[e-n,i-s]},this.handlePoints[1]={obj:null,point:[e+n,i-s]},this.handlePoints[2]={obj:null,point:[e+n,i+s]},this.handlePoints[3]={obj:null,point:[e-n,i+s]}}},{key:"_draw",value:function(){this._generateHandlePointsByPoints(),this.shape=this._drawEllipse(),this.edit&&this._drawEllipseHandlePoints()}},{key:"_drawEllipse",value:function(){var t=this.getZoomAndMove(),e=t.x,i=t.y,n=t.radiusX,s=t.radiusY,o=t.startAngle,a=t.endAngle,r=t.anticlockwise,h=new Path2D;return h.ellipse(e,i,n,s,o,a,r),this.freeDraw._updateCtxStyle(this.shapeStyle),this.freeDraw.ctx.fill(h),this.freeDraw.ctx.stroke(h),h}},{key:"_handleMouseMove",value:function(t){var e=t.offsetX,i=t.offsetY;if(this.clickedHandlePoint){var n=this.handlePoints[this.clickedHandlePointIndex].point;this.x+=(e-n[0])/2*this.freeDraw.zoomLevel,this.y+=(i-n[1])/2*this.freeDraw.zoomLevel,0===this.clickedHandlePointIndex?(this.radiusX+=(n[0]-e)/2*this.freeDraw.zoomLevel,this.radiusY+=(n[1]-i)/2*this.freeDraw.zoomLevel):1===this.clickedHandlePointIndex?(this.radiusX+=(e-n[0])/2*this.freeDraw.zoomLevel,this.radiusY+=(n[1]-i)/2*this.freeDraw.zoomLevel):2===this.clickedHandlePointIndex?(this.radiusX+=(e-n[0])/2*this.freeDraw.zoomLevel,this.radiusY+=(i-n[1])/2*this.freeDraw.zoomLevel):3===this.clickedHandlePointIndex&&(this.radiusX+=(n[0]-e)/2*this.freeDraw.zoomLevel,this.radiusY+=(i-n[1])/2*this.freeDraw.zoomLevel),this.freeDraw.eventsReceive.includes("transform")&&this.freeDraw.eventsCallBack(t,this.id,"transform")}else this.clickedShape&&(this.x+=(e-this.clickedShapePoint[0])/this.freeDraw.zoomLevel,this.y+=(i-this.clickedShapePoint[1])/this.freeDraw.zoomLevel,this.clickedShapePoint=[e,i],this.freeDraw.eventsReceive.includes("drag")&&this.freeDraw.eventsCallBack(t,this.id,"drag"));this._generateHandlePointsByPoints(),this.freeDraw._refreshShapesInCanvas()}},{key:"_drawEllipseHandlePoints",value:function(){for(var t=0;t<4;t++)this.handlePoints[t].obj=this._drawRectPoint(this.handlePoints[t].point[0],this.handlePoints[t].point[1],this.handlePointStyle.width,{lineWidth:this.handlePointStyle.lineWidth,fillStyle:this.handlePointStyle.fillStyle,strokeStyle:this.handlePointStyle.strokeStyle})}},{key:"getZoomAndMove",value:function(){var t=this.radiusX*this.freeDraw.zoomLevel,e=this.radiusY*this.freeDraw.zoomLevel,i=(this.x-this.freeDraw.transformCenter[0])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[0],n=(this.y-this.freeDraw.transformCenter[1])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[1];return 0!==this.freeDraw.offsetLeft&&(i+=this.freeDraw.offsetLeft),0!==this.freeDraw.offsetTop&&(n+=this.freeDraw.offsetTop),{x:i,y:n,radiusX:t,radiusY:e,rotation:this.rotation,startAngle:this.startAngle,endAngle:this.endAngle,anticlockwise:this.anticlockwise}}},{key:"_backupData",value:function(){this.xBackup=this.x,this.yBackup=this.y,this.radiusXBackup=this.radiusX,this.radiusYBackup=this.radiusY,this.rotationBackup=this.rotation,this.startAngleBackup=this.startAngle,this.endAngleBackup=this.endAngle,this.anticlockwiseBackup=this.anticlockwise}},{key:"_rollbackData",value:function(){this.x=this.xBackup,this.y=this.yBackup,this.radiusX=this.radiusXBackup,this.radiusY=this.radiusYBackup,this.rotation=this.rotationBackup,this.startAngle=this.startAngleBackup,this.endAngle=this.endAngleBackup,this.anticlockwise=this.anticlockwiseBackup}}])&&v(i.prototype,n),s&&v(i,s),e}();function m(t){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function S(t,e){return!e||"object"!==m(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function b(t){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function g(t,e){return(g=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var D=function(t){function e(t){var i;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(i=S(this,b(e).call(this,t))).pointsBackup=[],i._initPolygon(),i}var i,n,s;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&g(t,e)}(e,r),i=e,(n=[{key:"_initPolygon",value:function(){this._initShape(),this.points.length>0&&this._draw()}},{key:"_draw",value:function(){this.shape=this._drawPolygon(),this._generateHandlePointsByPoints(),this.edit&&this._drawPolygonHandlePoints()}},{key:"_generateHandlePointsByPoints",value:function(){var t=this.getZoomAndMove();this.handlePoints=[];for(var e=0;e<t.length;e++)this.handlePoints[e]={obj:null,point:t[e]}}},{key:"_drawPolygon",value:function(){var t=this.getPath(),e=new Path2D(t);return this.freeDraw._updateCtxStyle(this.shapeStyle),this.freeDraw.ctx.fill(e),this.freeDraw.ctx.stroke(e),e}},{key:"_drawPolygonHandlePoints",value:function(){var t=!0,e=!1,i=void 0;try{for(var n,s=this.handlePoints[Symbol.iterator]();!(t=(n=s.next()).done);t=!0){var o=n.value;o.obj=this._drawCirclePoint(o.point[0],o.point[1],this.handlePointStyle.width,{lineWidth:this.handlePointStyle.lineWidth,fillStyle:this.handlePointStyle.fillStyle,strokeStyle:this.handlePointStyle.strokeStyle})}}catch(t){e=!0,i=t}finally{try{t||null==s.return||s.return()}finally{if(e)throw i}}}},{key:"_polygonMouseDown",value:function(t){var e=t.offsetX,i=t.offsetY;this.points.push([e,i]),this.freeDraw._refreshShapesInCanvas()}},{key:"_handleKeydown",value:function(t){this.points.length>0&&(this.points.pop(),this.freeDraw._refreshShapesInCanvas())}},{key:"_handleMouseMove",value:function(t){var e=t.offsetX,i=t.offsetY;if(this.clickedHandlePoint)this.points[this.clickedHandlePointIndex]=[e,i];else if(this.clickedShape){var n=[],s=!0,o=!1,a=void 0;try{for(var r,h=this.points[Symbol.iterator]();!(s=(r=h.next()).done);s=!0){var l=r.value;n.push([l[0]+(e-this.clickedShapePoint[0])/this.freeDraw.zoomLevel,l[1]+(i-this.clickedShapePoint[1])/this.freeDraw.zoomLevel])}}catch(t){o=!0,a=t}finally{try{s||null==h.return||h.return()}finally{if(o)throw a}}this.clickedShapePoint=[e,i],this.points=n}this.freeDraw._refreshShapesInCanvas()}},{key:"_polygonMouseUp",value:function(){}},{key:"getZoomAndMove",value:function(){for(var t=[],e=0;e<this.points.length;e++){var i=(this.points[e][0]-this.freeDraw.transformCenter[0])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[0],n=(this.points[e][1]-this.freeDraw.transformCenter[1])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[1];0!==this.freeDraw.offsetLeft&&(i+=this.freeDraw.offsetLeft),0!==this.freeDraw.offsetTop&&(n+=this.freeDraw.offsetTop),t.push([i,n])}return t}},{key:"_backupData",value:function(){this.pointsBackup=JSON.parse(JSON.stringify(this.points))}},{key:"_rollbackData",value:function(){this.points=JSON.parse(JSON.stringify(this.pointsBackup))}},{key:"getPath",value:function(){return"M"+this.getZoomAndMove().map(function(t){return t.join(",")}).join("L")+"Z"}}])&&_(i.prototype,n),s&&_(i,s),e}();function C(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var x=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.canvasDOM=e.canvas,this.eventsCallBack=e.eventsCallBack,this.eventsReceive=e.eventsReceive||["mouseenter","mouseleave"],this.ctx=null,this.model="view",this.editingId=null,this.isClickedShape=!1,this.clickedShapeId=null,this.shapeInCanvas={},this.zoomLevel=1,this.offsetTop=0,this.offsetLeft=0,this.transformCenter=[0,0],this.eventsKeysMap={},this._initFreeDraw()}var e,i,n;return e=t,(i=[{key:"_initFreeDraw",value:function(){this.ctx=this.canvasDOM.getContext("2d"),this.canvasDOM.addEventListener("mousedown",this._distributeEvents.bind(this)),this.canvasDOM.addEventListener("mousemove",this._distributeEvents.bind(this)),this.canvasDOM.addEventListener("mouseup",this._distributeEvents.bind(this)),window.document.addEventListener("keydown",this._distributeEvents.bind(this))}},{key:"_distributeEvents",value:function(t){var e=t.type,i=t.offsetX,n=t.offsetY;if("view"===this.model){if("keydown"===e)return;if("mousedown"===e)for(var s in this.shapeInCanvas){this.shapeInCanvas[s]._includes(i,n)&&(this.clickedShapeId=s,this.isClickedShape=!0)}else"mouseup"===e&&(this.clickedShapeId=null,this.isClickedShape=!1);if(this.eventsCallBack&&"function"==typeof this.eventsCallBack)for(var o in this.shapeInCanvas){this.shapeInCanvas[o]._includes(i,n)?this.eventsKeysMap[o]?this.eventsReceive.includes("mousemove")&&this.eventsCallBack(t,o,"mousemove"):(this.eventsKeysMap[o]="mouse-enter",this.eventsReceive.includes("mouseenter")&&this.eventsCallBack(t,o,"mouseenter")):this.eventsKeysMap[o]&&(this.eventsKeysMap[o]=void 0,this.eventsReceive.includes("mouseleave")&&this.eventsCallBack(t,o,"mouseleave"))}}else if("edit"===this.model){var a=this.shapeInCanvas[this.editingId];a&&(a._trigger(t),"mousedown"===e?a._includes(i,n)&&(this.isClickedShape=!0,this.clickedShapeId=a.id):"mouseup"===e&&(this.isClickedShape=!1,this.clickedShapeId=null))}}},{key:"_updateCtxStyle",value:function(t){this.ctx.lineWidth=t.lineWidth,this.ctx.fillStyle=t.fillStyle,this.ctx.strokeStyle=t.strokeStyle}},{key:"removeShape",value:function(t){return this.shapeInCanvas[t]&&delete this.shapeInCanvas[t],"edit"===this.model&&this.editingId===t&&(this.model="view",this.editingId=null),this._refreshShapesInCanvas(),this}},{key:"removeAllShape",value:function(){return this.shapeInCanvas={},this._refreshShapesInCanvas(),this}},{key:"_updateModel",value:function(t,e){this.model=t||"view",this.editingId=e||null}},{key:"_clearCanvas",value:function(){return this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this}},{key:"_refreshShapesInCanvas",value:function(){for(var t in this._clearCanvas(),this.shapeInCanvas)this.shapeInCanvas[t]._draw()}},{key:"zoomAndOffset",value:function(t,e,i,n){this.zoomLevel=t,this.offsetTop=n,this.offsetLeft=i,this.transformCenter=e,this._refreshShapesInCanvas()}},{key:"addShape",value:function(t){if("edit"===this.model)throw new Error("Can not add another shape in edit model");var e=t.type,i=t.id;if(!i)throw new Error("Shape id can not be empty");if(this.shapeInCanvas[i])throw new Error("Shape id must be unique, shape id '".concat(i,"' has already exist"));return this._updateModel("edit",i),"rect"===e?(this.shapeInCanvas[i]=this._addRect(t),this.shapeInCanvas[i]):"ellipse"===e?(this.shapeInCanvas[i]=new P(Object.assign({},{freeDraw:this},t)),this.shapeInCanvas[i]):"polygon"===e?(this.shapeInCanvas[i]=new D(Object.assign({},{freeDraw:this},t)),this.shapeInCanvas[i]):void 0}},{key:"_addRect",value:function(t){var e=t.id,i=t.type,n=t.shapeStyle,s=t.handlePointStyle,o=t.startPoint,a=t.width,r=t.height,h=this.removeZoomAndMoveRect(a,r,o);return new d({id:e,type:i,width:h.width,height:h.height,startPoint:h.startPoint,shapeStyle:n,handlePointStyle:s,freeDraw:this})}},{key:"removeZoomAndMoveRect",value:function(t,e,i){t/=this.zoomLevel,e/=this.zoomLevel;var n=i[0],s=i[1];return 0!==this.offsetLeft&&(n-=this.offsetLeft),0!==this.offsetTop&&(s-=this.offsetTop),{width:t,height:e,startPoint:[n=(n-this.transformCenter[0])/this.zoomLevel+this.transformCenter[0],s=(s-this.transformCenter[1])/this.zoomLevel+this.transformCenter[1]]}}}])&&C(e.prototype,i),n&&C(e,n),t}();e.default=x}])});