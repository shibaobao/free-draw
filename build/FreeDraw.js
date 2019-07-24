!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.FreeDraw=t():e.FreeDraw=t()}(window,function(){return function(e){var t=window.webpackHotUpdateFreeDraw;window.webpackHotUpdateFreeDraw=function(e,i){!function(e,t){if(!b[e]||!k[e])return;for(var i in k[e]=!1,t)Object.prototype.hasOwnProperty.call(t,i)&&(v[i]=t[i]);0==--w&&0===P&&g()}(e,i),t&&t(e,i)};var i,n=!0,r="d2835f15ab4c71ec9619",o=1e4,s={},a=[],h=[];function l(e){var t=C[e];if(!t)return O;var n=function(n){return t.hot.active?(C[n]?-1===C[n].parents.indexOf(e)&&C[n].parents.push(e):(a=[e],i=n),-1===t.children.indexOf(n)&&t.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),a=[]),O(n)},r=function(e){return{configurable:!0,enumerable:!0,get:function(){return O[e]},set:function(t){O[e]=t}}};for(var o in O)Object.prototype.hasOwnProperty.call(O,o)&&"e"!==o&&"t"!==o&&Object.defineProperty(n,o,r(o));return n.e=function(e){return"ready"===u&&f("prepare"),P++,O.e(e).then(t,function(e){throw t(),e});function t(){P--,"prepare"===u&&(m[e]||D(e),0===P&&0===w&&g())}},n.t=function(e,t){return 1&t&&(e=n(e)),O.t(e,-2&t)},n}function c(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:i!==e,active:!0,accept:function(e,i){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var n=0;n<e.length;n++)t._acceptedDependencies[e[n]]=i||function(){};else t._acceptedDependencies[e]=i||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var i=0;i<e.length;i++)t._declinedDependencies[e[i]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var i=t._disposeHandlers.indexOf(e);i>=0&&t._disposeHandlers.splice(i,1)},check:S,apply:x,status:function(e){if(!e)return u;d.push(e)},addStatusHandler:function(e){d.push(e)},removeStatusHandler:function(e){var t=d.indexOf(e);t>=0&&d.splice(t,1)},data:s[e]};return i=void 0,t}var d=[],u="idle";function f(e){u=e;for(var t=0;t<d.length;t++)d[t].call(null,e)}var p,v,y,w=0,P=0,m={},k={},b={};function _(e){return+e+""===e?+e:e}function S(e){if("idle"!==u)throw new Error("check() is only allowed in idle status");return n=e,f("check"),(t=o,t=t||1e4,new Promise(function(e,i){if("undefined"==typeof XMLHttpRequest)return i(new Error("No browser support"));try{var n=new XMLHttpRequest,o=O.p+""+r+".hot-update.json";n.open("GET",o,!0),n.timeout=t,n.send(null)}catch(e){return i(e)}n.onreadystatechange=function(){if(4===n.readyState)if(0===n.status)i(new Error("Manifest request to "+o+" timed out."));else if(404===n.status)e();else if(200!==n.status&&304!==n.status)i(new Error("Manifest request to "+o+" failed."));else{try{var t=JSON.parse(n.responseText)}catch(e){return void i(e)}e(t)}}})).then(function(e){if(!e)return f("idle"),null;k={},m={},b=e.c,y=e.h,f("prepare");var t=new Promise(function(e,t){p={resolve:e,reject:t}});v={};return D(0),"prepare"===u&&0===P&&0===w&&g(),t});var t}function D(e){b[e]?(k[e]=!0,w++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=O.p+""+e+"."+r+".hot-update.js",document.head.appendChild(t)}(e)):m[e]=!0}function g(){f("ready");var e=p;if(p=null,e)if(n)Promise.resolve().then(function(){return x(n)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var i in v)Object.prototype.hasOwnProperty.call(v,i)&&t.push(_(i));e.resolve(t)}}function x(t){if("ready"!==u)throw new Error("apply() is only allowed in ready status");var i,n,o,h,l;function c(e){for(var t=[e],i={},n=t.map(function(e){return{chain:[e],id:e}});n.length>0;){var r=n.pop(),o=r.id,s=r.chain;if((h=C[o])&&!h.hot._selfAccepted){if(h.hot._selfDeclined)return{type:"self-declined",chain:s,moduleId:o};if(h.hot._main)return{type:"unaccepted",chain:s,moduleId:o};for(var a=0;a<h.parents.length;a++){var l=h.parents[a],c=C[l];if(c){if(c.hot._declinedDependencies[o])return{type:"declined",chain:s.concat([l]),moduleId:o,parentId:l};-1===t.indexOf(l)&&(c.hot._acceptedDependencies[o]?(i[l]||(i[l]=[]),d(i[l],[o])):(delete i[l],t.push(l),n.push({chain:s.concat([l]),id:l})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:i}}function d(e,t){for(var i=0;i<t.length;i++){var n=t[i];-1===e.indexOf(n)&&e.push(n)}}t=t||{};var p={},w=[],P={},m=function(){console.warn("[HMR] unexpected require("+S.moduleId+") to disposed module")};for(var k in v)if(Object.prototype.hasOwnProperty.call(v,k)){var S;l=_(k);var D=!1,g=!1,x=!1,j="";switch((S=v[k]?c(l):{type:"disposed",moduleId:k}).chain&&(j="\nUpdate propagation: "+S.chain.join(" -> ")),S.type){case"self-declined":t.onDeclined&&t.onDeclined(S),t.ignoreDeclined||(D=new Error("Aborted because of self decline: "+S.moduleId+j));break;case"declined":t.onDeclined&&t.onDeclined(S),t.ignoreDeclined||(D=new Error("Aborted because of declined dependency: "+S.moduleId+" in "+S.parentId+j));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(S),t.ignoreUnaccepted||(D=new Error("Aborted because "+l+" is not accepted"+j));break;case"accepted":t.onAccepted&&t.onAccepted(S),g=!0;break;case"disposed":t.onDisposed&&t.onDisposed(S),x=!0;break;default:throw new Error("Unexception type "+S.type)}if(D)return f("abort"),Promise.reject(D);if(g)for(l in P[l]=v[l],d(w,S.outdatedModules),S.outdatedDependencies)Object.prototype.hasOwnProperty.call(S.outdatedDependencies,l)&&(p[l]||(p[l]=[]),d(p[l],S.outdatedDependencies[l]));x&&(d(w,[S.moduleId]),P[l]=m)}var I,L=[];for(n=0;n<w.length;n++)l=w[n],C[l]&&C[l].hot._selfAccepted&&P[l]!==m&&L.push({module:l,errorHandler:C[l].hot._selfAccepted});f("dispose"),Object.keys(b).forEach(function(e){!1===b[e]&&function(e){delete installedChunks[e]}(e)});for(var M,B,E=w.slice();E.length>0;)if(l=E.pop(),h=C[l]){var H={},A=h.hot._disposeHandlers;for(o=0;o<A.length;o++)(i=A[o])(H);for(s[l]=H,h.hot.active=!1,delete C[l],delete p[l],o=0;o<h.children.length;o++){var z=C[h.children[o]];z&&((I=z.parents.indexOf(l))>=0&&z.parents.splice(I,1))}}for(l in p)if(Object.prototype.hasOwnProperty.call(p,l)&&(h=C[l]))for(B=p[l],o=0;o<B.length;o++)M=B[o],(I=h.children.indexOf(M))>=0&&h.children.splice(I,1);for(l in f("apply"),r=y,P)Object.prototype.hasOwnProperty.call(P,l)&&(e[l]=P[l]);var F=null;for(l in p)if(Object.prototype.hasOwnProperty.call(p,l)&&(h=C[l])){B=p[l];var R=[];for(n=0;n<B.length;n++)if(M=B[n],i=h.hot._acceptedDependencies[M]){if(-1!==R.indexOf(i))continue;R.push(i)}for(n=0;n<R.length;n++){i=R[n];try{i(B)}catch(e){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:l,dependencyId:B[n],error:e}),t.ignoreErrored||F||(F=e)}}}for(n=0;n<L.length;n++){var N=L[n];l=N.module,a=[l];try{O(l)}catch(e){if("function"==typeof N.errorHandler)try{N.errorHandler(e)}catch(i){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:l,error:i,originalError:e}),t.ignoreErrored||F||(F=i),F||(F=e)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:l,error:e}),t.ignoreErrored||F||(F=e)}}return F?(f("fail"),Promise.reject(F)):(f("idle"),new Promise(function(e){e(w)}))}var C={};function O(t){if(C[t])return C[t].exports;var i=C[t]={i:t,l:!1,exports:{},hot:c(t),parents:(h=a,a=[],h),children:[]};return e[t].call(i.exports,i,i.exports,l(t)),i.l=!0,i.exports}return O.m=e,O.c=C,O.d=function(e,t,i){O.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},O.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},O.t=function(e,t){if(1&t&&(e=O(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(O.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)O.d(i,n,function(t){return e[t]}.bind(null,n));return i},O.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return O.d(t,"a",t),t},O.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},O.p="/build/",O.h=function(){return r},l(0)(O.s=0)}([function(e,t,i){e.exports=i(1)},function(e,t,i){"use strict";i.r(t);var n={lineWidth:2,fillStyle:"#FFFFFF",strokeStyle:"#0E71EB",width:8},r={lineWidth:2,fillStyle:"#FFFFFF",strokeStyle:"#0E71EB",radius:4},o={lineWidth:2,fillStyle:"rgba(14, 113, 235, 0.25)",strokeStyle:"#0E71EB"},s={lineWidth:2,fillStyle:"rgba(14, 113, 235, 0.8)",strokeStyle:"rgba(14, 113, 235, 0.8)"},a={lineWidth:1,strokeStyle:"#0E71EB"};function h(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.id=t.id,this.type=t.type,this.edit=t.edit||!0,this.points=t.points||[],this.temporaryPoints=[],this.temporaryPointsWithoutZoomAndOffset=[],this.path=t.path||"",this.SVGPath="",this.handlePoints=[],this.clickedHandlePointIndex=null,this.clickedShape=!1,this.clickedShapePoint=[],this.clickedHandlePoint=!1,this.freeDraw=t.freeDraw,this.handlePointStyle=t.handlePointStyle,this.shapeStyle=t.shapeStyle,this.shape=null}var t,i,r;return t=e,(i=[{key:"_initShape",value:function(){this.handlePointStyle||(this.handlePointStyle=n),this.shapeStyle||(this.shapeStyle=o)}},{key:"_trigger",value:function(e){switch(e.type){case"mousedown":this._handleMouseDown&&"function"==typeof this._handleMouseDown&&this._handleMouseDown(e);break;case"mousemove":this._handleMouseMove&&"function"==typeof this._handleMouseMove&&this._handleMouseMove(e);break;case"mouseup":this._handleMouseUp&&"function"==typeof this._handleMouseUp&&this._handleMouseUp(e);break;case"keydown":this._handleKeydown&&"function"==typeof this._handleKeydown&&this._handleKeydown(e)}}},{key:"_drawRectPoint",value:function(e,t,i,n){var r=new Path2D;return r.rect(e-i/2,t-i/2,i,i),this.freeDraw._updateCtxStyle(n),this.freeDraw.ctx.fill(r),this.freeDraw.ctx.stroke(r),r}},{key:"_drawLine",value:function(e,t,i){var n="M".concat(e[0],",").concat(e[1],"L").concat(t[0],",").concat(t[1]),r=new Path2D(n);return this.freeDraw._updateCtxStyle(i),this.freeDraw.ctx.fill(r),this.freeDraw.ctx.stroke(r),r}},{key:"_drawCirclePoint",value:function(e,t,i,n){var r=new Path2D;return r.arc(e,t,i,0,2*Math.PI,!1),this.freeDraw._updateCtxStyle(n),this.freeDraw.ctx.fill(r),this.freeDraw.ctx.stroke(r),r}},{key:"_includes",value:function(e,t){return this._pointInHandlePoints(e,t)||this._pointInShape(e,t)}},{key:"_handleMouseDown",value:function(e){var t=e.offsetX,i=e.offsetY;this._pointInHandlePoints(t,i)?(this.clickedHandlePoint=!0,this.clickedShapePoint=[],this.clickedShape=!1,"polygon"===this.type&&this._polygonMouseDown(e)):this._pointInShape(t,i)?(this.clickedHandlePoint=!1,this.clickedShapePoint=[t,i],this.clickedShape=!0):"polygon"===this.type&&this._polygonMouseDown(e)}},{key:"_handleMouseUp",value:function(){this.clickedShape=!1,this.clickedHandlePoint=!1,this.clickedShapePoint=[]}},{key:"_pointInShape",value:function(e,t){if(!this.shape)return!1;var i=!0,n=!1,r=void 0;try{for(var o,s=this.temporaryPointsWithoutZoomAndOffset[Symbol.iterator]();!(i=(o=s.next()).done);i=!0){var a=o.value;if(e===a[0]&&t===a[1])return!1}}catch(e){n=!0,r=e}finally{try{i||null==s.return||s.return()}finally{if(n)throw r}}return this.freeDraw.ctx.isPointInPath(this.shape,e,t)}},{key:"_pointInHandlePoints",value:function(e,t){var i=!1;if(this.edit){for(var n=null,r=0;r<this.handlePoints.length;r++)if(this.freeDraw.ctx.isPointInPath(this.handlePoints[r].obj,e,t)){i=!0,n=r;break}this.clickedHandlePointIndex=n}return i}},{key:"editShape",value:function(){return this.shapeStyle=o,this.edit=!0,this.freeDraw._updateModel("edit",this.id),this.freeDraw._refreshShapesInCanvas(),this._backupData(),this}},{key:"finish",value:function(){return this.edit=!1,this.freeDraw._updateModel("view"),this.shapeStyle=s,this._toSVGPath&&"function"==typeof this._toSVGPath&&this._toSVGPath(),this.freeDraw._refreshShapesInCanvas(),this}},{key:"cancelEdit",value:function(){return this.shapeStyle=s,this.edit=!1,this.freeDraw._updateModel("view"),this._rollbackData(),this.freeDraw._refreshShapesInCanvas(),this}}])&&h(t.prototype,i),r&&h(t,r),e}();function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function u(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var v=function(e){function t(e){var i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(i=u(this,f(t).call(this,e))).startPoint=e.startPoint||[],i.width=e.width,i.height=e.height,i.startPointBackup=[],i.widthBackup=null,i.heightBackup=null,i.pointsBackup=[],i._initRect(),i}var i,n,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,l),i=t,(n=[{key:"_initRect",value:function(){this._initShape(),this.startPoint.length>0&&this.width&&this.height&&this._draw()}},{key:"_draw",value:function(){this._generateHandlePointsByPoints(),this.shape=this._drawRect(),this.edit&&this._drawRectHandlePoints()}},{key:"_generateHandlePointsByPoints",value:function(){var e=this.getZoomAndMove(),t=e.startPoint,i=e.width,n=e.height;this.handlePoints[0]={obj:null,point:t},this.handlePoints[1]={obj:null,point:[t[0]+i,t[1]]},this.handlePoints[2]={obj:null,point:[t[0]+i,t[1]+n]},this.handlePoints[3]={obj:null,point:[t[0],t[1]+n]}}},{key:"_drawRectHandlePoints",value:function(){for(var e=0;e<this.handlePoints.length;e++)this.handlePoints[e].obj=this._drawRectPoint(this.handlePoints[e].point[0],this.handlePoints[e].point[1],this.handlePointStyle.width,{lineWidth:this.handlePointStyle.lineWidth,fillStyle:this.handlePointStyle.fillStyle,strokeStyle:this.handlePointStyle.strokeStyle})}},{key:"_drawRect",value:function(){var e=this.getZoomAndMove(),t=e.startPoint,i=e.width,n=e.height,r=new Path2D;return r.rect(t[0],t[1],i,n),this.freeDraw._updateCtxStyle(this.shapeStyle),this.freeDraw.ctx.fill(r),this.freeDraw.ctx.stroke(r),r}},{key:"_handleMouseMove",value:function(e){var t=e.offsetX,i=e.offsetY;if(this.clickedHandlePoint){var n=this.handlePoints[this.clickedHandlePointIndex].point;0===this.clickedHandlePointIndex?(this.width+=(n[0]-t)/this.freeDraw.zoomLevel,this.height+=(n[1]-i)/this.freeDraw.zoomLevel,this.startPoint=[this.startPoint[0]+(t-n[0])/this.freeDraw.zoomLevel,this.startPoint[1]+(i-n[1])/this.freeDraw.zoomLevel]):1===this.clickedHandlePointIndex?(this.width+=(t-n[0])/this.freeDraw.zoomLevel,this.height+=(n[1]-i)/this.freeDraw.zoomLevel,this.startPoint[1]+=(i-n[1])/this.freeDraw.zoomLevel):2===this.clickedHandlePointIndex?(this.width+=(t-n[0])/this.freeDraw.zoomLevel,this.height+=(i-n[1])/this.freeDraw.zoomLevel):3===this.clickedHandlePointIndex&&(this.width+=(n[0]-t)/this.freeDraw.zoomLevel,this.height+=(i-n[1])/this.freeDraw.zoomLevel,this.startPoint[0]+=(t-n[0])/this.freeDraw.zoomLevel),this.freeDraw.eventsReceive.includes("transform")&&this.freeDraw.eventsCallBack(e,this.id,"transform")}else this.clickedShape&&(this.startPoint=[this.startPoint[0]+(t-this.clickedShapePoint[0])/this.freeDraw.zoomLevel,this.startPoint[1]+(i-this.clickedShapePoint[1])/this.freeDraw.zoomLevel],this.clickedShapePoint=[t,i],this.freeDraw.eventsReceive.includes("drag")&&this.freeDraw.eventsCallBack(e,this.id,"drag"));this.freeDraw._refreshShapesInCanvas()}},{key:"getZoomAndMove",value:function(){var e=this.width,t=this.height;e=this.width*this.freeDraw.zoomLevel,t=this.height*this.freeDraw.zoomLevel;var i=(this.startPoint[0]-this.freeDraw.transformCenter[0])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[0],n=(this.startPoint[1]-this.freeDraw.transformCenter[1])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[1];return 0!==this.freeDraw.offsetLeft&&(i+=this.freeDraw.offsetLeft),0!==this.freeDraw.offsetTop&&(n+=this.freeDraw.offsetTop),{width:e,height:t,startPoint:[i,n]}}},{key:"_toSVGPath",value:function(){var e=this.freeDraw.fix;this.points[0]=[Number(this.startPoint[0]).toFixed(e),Number(this.startPoint[1]).toFixed(e)],this.points[1]=[Number(this.startPoint[0]+this.width).toFixed(e),Number(this.startPoint[1]).toFixed(e)],this.points[2]=[Number(this.startPoint[0]+this.width).toFixed(e),Number(this.startPoint[1]+this.height).toFixed(e)],this.points[3]=[Number(this.startPoint[0]).toFixed(e),Number(this.startPoint[1]+this.height).toFixed(e)],this.path="M".concat(this.points[0].join(","),"L").concat(this.points[1].join(","),"L").concat(this.points[2].join(","),"L").concat(this.points[3].join(","),"Z"),this.SVGPath='<path d="'.concat(this.path,'" />')}},{key:"_backupData",value:function(){this.startPointBackup=JSON.parse(JSON.stringify(this.startPoint)),this.widthBackup=this.width,this.heightBackup=this.height,this.pointsBackup=JSON.parse(JSON.stringify(this.points))}},{key:"_rollbackData",value:function(){this.startPoint=JSON.parse(JSON.stringify(this.startPointBackup)),this.width=this.widthBackup,this.height=this.heightBackup,this.points=JSON.parse(JSON.stringify(this.pointsBackup))}},{key:"getHandlePointCoordinate",value:function(e){return this.handlePoints[e]?this.handlePoints[e].point:null}}])&&d(i.prototype,n),r&&d(i,r),t}();function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function P(e,t){return!t||"object"!==y(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function k(e,t){return(k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var b=function(e){function t(e){var i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(i=P(this,m(t).call(this,e))).x=e.x,i.y=e.y,i.radiusX=e.radiusX,i.radiusY=e.radiusY,i.rotation=e.rotation||0,i.startAngle=e.startAngle||0,i.endAngle=e.endAngle||2*Math.PI,i.anticlockwise=e.anticlockwise||!1,i.xBackup=null,i.yBackup=null,i.radiusXBackup=null,i.radiusYBackup=null,i.rotationBackup=null,i.startAngleBackup=null,i.endAngleBackup=null,i.anticlockwiseBackup=null,i.handleLines=[],i._initEllipse(),i}var i,n,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&k(e,t)}(t,l),i=t,(n=[{key:"_initEllipse",value:function(){this._initShape(),this.x&&this.y&&this.radiusX&&this.radiusY&&this._draw()}},{key:"_generateHandlePointsByPoints",value:function(){var e=this.getZoomAndMove(),t=e.x,i=e.y,n=e.radiusX,r=e.radiusY;this.handlePoints[0]={obj:null,point:[t-n,i-r]},this.handlePoints[1]={obj:null,point:[t+n,i-r]},this.handlePoints[2]={obj:null,point:[t+n,i+r]},this.handlePoints[3]={obj:null,point:[t-n,i+r]}}},{key:"_generateHandleLinesByPoints",value:function(){var e=this.getZoomAndMove(),t=e.x,i=e.y,n=e.radiusX,r=e.radiusY;this.handleLines[0]={obj:null,startPoint:[t-n,i-r],endPoint:[t+n,i-r]},this.handleLines[1]={obj:null,startPoint:[t+n,i-r],endPoint:[t+n,i+r]},this.handleLines[2]={obj:null,startPoint:[t+n,i+r],endPoint:[t-n,i+r]},this.handleLines[3]={obj:null,startPoint:[t-n,i+r],endPoint:[t-n,i-r]}}},{key:"_draw",value:function(){this.shape=this._drawEllipse(),this._generateHandleLinesByPoints(),this._generateHandlePointsByPoints(),this.edit&&(this._drawEllipseHandleLines(),this._drawEllipseHandlePoints())}},{key:"_drawEllipse",value:function(){var e=this.getZoomAndMove(),t=e.x,i=e.y,n=e.radiusX,r=e.radiusY,o=e.startAngle,s=e.endAngle,a=e.anticlockwise,h=new Path2D;return h.ellipse(t,i,n,r,o,s,a),this.freeDraw._updateCtxStyle(this.shapeStyle),this.freeDraw.ctx.fill(h),this.freeDraw.ctx.stroke(h),h}},{key:"_handleMouseMove",value:function(e){var t=e.offsetX,i=e.offsetY;if(this.clickedHandlePoint){var n=this.handlePoints[this.clickedHandlePointIndex].point;if([0,1,2,3].includes(this.clickedHandlePointIndex)){var r=n[0]-t,o=n[1]-i;1===this.clickedHandlePointIndex&&(r=t-n[0]),2===this.clickedHandlePointIndex&&(r=t-n[0],o=i-n[1]),3===this.clickedHandlePointIndex&&(o=i-n[1]),r=this.radiusX+r/this.freeDraw.zoomLevel,o=this.radiusY+o/this.freeDraw.zoomLevel,r>0&&o>0&&(this.radiusX=r,this.radiusY=o)}this.freeDraw.eventsReceive.includes("transform")&&this.freeDraw.eventsCallBack(e,this.id,"transform")}else this.clickedShape&&(this.x+=(t-this.clickedShapePoint[0])/this.freeDraw.zoomLevel,this.y+=(i-this.clickedShapePoint[1])/this.freeDraw.zoomLevel,this.clickedShapePoint=[t,i],this.freeDraw.eventsReceive.includes("drag")&&this.freeDraw.eventsCallBack(e,this.id,"drag"));this.freeDraw._refreshShapesInCanvas()}},{key:"_drawEllipseHandlePoints",value:function(){for(var e=0;e<this.handlePoints.length;e++)this.handlePoints[e].obj=this._drawRectPoint(this.handlePoints[e].point[0],this.handlePoints[e].point[1],this.handlePointStyle.width,{lineWidth:this.handlePointStyle.lineWidth,fillStyle:this.handlePointStyle.fillStyle,strokeStyle:this.handlePointStyle.strokeStyle})}},{key:"_drawEllipseHandleLines",value:function(){for(var e=0;e<this.handleLines.length;e++)this.handleLines[e].obj=this._drawLine(this.handleLines[e].startPoint,this.handleLines[e].endPoint,a)}},{key:"getZoomAndMove",value:function(){var e=this.radiusX*this.freeDraw.zoomLevel,t=this.radiusY*this.freeDraw.zoomLevel,i=(this.x-this.freeDraw.transformCenter[0])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[0],n=(this.y-this.freeDraw.transformCenter[1])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[1];return 0!==this.freeDraw.offsetLeft&&(i+=this.freeDraw.offsetLeft),0!==this.freeDraw.offsetTop&&(n+=this.freeDraw.offsetTop),{x:i,y:n,radiusX:e,radiusY:t,rotation:this.rotation,startAngle:this.startAngle,endAngle:this.endAngle,anticlockwise:this.anticlockwise}}},{key:"_backupData",value:function(){this.xBackup=this.x,this.yBackup=this.y,this.radiusXBackup=this.radiusX,this.radiusYBackup=this.radiusY,this.rotationBackup=this.rotation,this.startAngleBackup=this.startAngle,this.endAngleBackup=this.endAngle,this.anticlockwiseBackup=this.anticlockwise}},{key:"_rollbackData",value:function(){this.x=this.xBackup,this.y=this.yBackup,this.radiusX=this.radiusXBackup,this.radiusY=this.radiusYBackup,this.rotation=this.rotationBackup,this.startAngle=this.startAngleBackup,this.endAngle=this.endAngleBackup,this.anticlockwise=this.anticlockwiseBackup}},{key:"_toSVGPath",value:function(){var e=Number(this.x).toFixed(this.freeDraw.fix),t=Number(this.x).toFixed(this.freeDraw.fix),i=Number(this.radiusX).toFixed(this.freeDraw.fix),n=Number(this.radiusY).toFixed(this.freeDraw.fix);this.SVGPath='<ellipse cx="'.concat(e,'" cy="').concat(t,'" rx="').concat(i,'" ry="').concat(n,'" />')}},{key:"getHandlePointCoordinate",value:function(e){return this.handlePoints[e]?this.handlePoints[e].point:null}}])&&w(i.prototype,n),r&&w(i,r),t}();function _(e){return(_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var i=[],n=!0,r=!1,o=void 0;try{for(var s,a=e[Symbol.iterator]();!(n=(s=a.next()).done)&&(i.push(s.value),!t||i.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==a.return||a.return()}finally{if(r)throw o}}return i}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function D(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function g(e,t){return!t||"object"!==_(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function x(e){return(x=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var O=function(e){function t(e){var i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(i=g(this,x(t).call(this,e))).temporaryPointsFollow=!0,i.pointsBackup=[],i.borderPoints=[],i._initPolygon(),i}var i,n,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(t,l),i=t,(n=[{key:"_initPolygon",value:function(){this.handlePointStyle=r,this._initShape(),this.points.length>0&&this._draw()}},{key:"_draw",value:function(){this.shape=this._drawPolygon(),this._generateHandlePointsByPoints(),this._generateBorderPoints(),this.edit&&this._drawPolygonHandlePoints()}},{key:"_generateHandlePointsByPoints",value:function(){var e=this.getZoomAndMove();this.handlePoints=[];for(var t=0;t<e.length;t++)this.handlePoints[t]={obj:null,point:e[t]}}},{key:"_generateBorderPoints",value:function(){for(var e,t,i,n,r=this.getZoomAndMove(),o=0;o<r.length;o++)e?r[o][0]<e&&(e=r[o][0]):e=r[o][0],t?r[o][0]>t&&(t=r[o][0]):t=r[o][0],i?r[o][1]<i&&(i=r[o][1]):i=r[o][1],n?r[o][1]>n&&(n=r[o][1]):n=r[o][1];this.borderPoints=[[e,i],[t,i],[t,n],[e,n]]}},{key:"_drawPolygon",value:function(){var e=this.getPath(),t=new Path2D(e);return this.freeDraw._updateCtxStyle(this.shapeStyle),this.freeDraw.ctx.fill(t),this.freeDraw.ctx.stroke(t),t}},{key:"_drawPolygonHandlePoints",value:function(){var e=!0,t=!1,i=void 0;try{for(var n,r=this.handlePoints[Symbol.iterator]();!(e=(n=r.next()).done);e=!0){var o=n.value;o.obj=this._drawCirclePoint(o.point[0],o.point[1],this.handlePointStyle.radius,{lineWidth:this.handlePointStyle.lineWidth,fillStyle:this.handlePointStyle.fillStyle,strokeStyle:this.handlePointStyle.strokeStyle})}}catch(e){t=!0,i=e}finally{try{e||null==r.return||r.return()}finally{if(t)throw i}}}},{key:"_handleKeydown",value:function(e){this.points.length>0&&8===e.keyCode&&(this.points.pop(),this.freeDraw._refreshShapesInCanvas())}},{key:"_polygonMouseDown",value:function(e){var t=e.offsetX,i=e.offsetY;this.clickedHandlePoint?(this.temporaryPointsFollow=!1,this.temporaryPoints=[],this.temporaryPointsWithoutZoomAndOffset=[]):(this.temporaryPointsFollow=!0,this.points.push(this.removePointZoomAndMove([t,i]))),this.freeDraw._refreshShapesInCanvas()}},{key:"_handleMouseMove",value:function(e){var t=e.offsetX,i=e.offsetY;if(this.clickedHandlePoint)this.points[this.clickedHandlePointIndex]=this.removePointZoomAndMove([t,i]);else if(this.clickedShape){var n=[],r=!0,o=!1,s=void 0;try{for(var a,h=this.points[Symbol.iterator]();!(r=(a=h.next()).done);r=!0){var l=a.value;n.push([l[0]+(t-this.clickedShapePoint[0])/this.freeDraw.zoomLevel,l[1]+(i-this.clickedShapePoint[1])/this.freeDraw.zoomLevel])}}catch(e){o=!0,s=e}finally{try{r||null==h.return||h.return()}finally{if(o)throw s}}this.clickedShapePoint=[t,i],this.points=n}else this.temporaryPointsFollow&&(this.temporaryPoints=[this.removePointZoomAndMove([t,i])],this.temporaryPointsWithoutZoomAndOffset=[[t,i]]);this.freeDraw._refreshShapesInCanvas()}},{key:"getZoomAndMove",value:function(e){var t=[],i=this.points;e&&(i=i.concat(this.temporaryPoints));for(var n=0;n<i.length;n++){var r=(i[n][0]-this.freeDraw.transformCenter[0])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[0],o=(i[n][1]-this.freeDraw.transformCenter[1])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[1];0!==this.freeDraw.offsetLeft&&(r+=this.freeDraw.offsetLeft),0!==this.freeDraw.offsetTop&&(o+=this.freeDraw.offsetTop),t.push([r,o])}return t}},{key:"removePointZoomAndMove",value:function(e){var t=S(e,2),i=t[0],n=t[1];return[(i-this.freeDraw.transformCenter[0]-this.freeDraw.offsetLeft)/this.freeDraw.zoomLevel+this.freeDraw.transformCenter[0],(n-this.freeDraw.transformCenter[1]-this.freeDraw.offsetTop)/this.freeDraw.zoomLevel+this.freeDraw.transformCenter[1]]}},{key:"_backupData",value:function(){this.pointsBackup=JSON.parse(JSON.stringify(this.points))}},{key:"_rollbackData",value:function(){this.points=JSON.parse(JSON.stringify(this.pointsBackup))}},{key:"getPath",value:function(){return"M"+this.getZoomAndMove(!0).map(function(e){return e.join(",")}).join("L")+"Z"}},{key:"_toSVGPath",value:function(){var e=this;this.path="M"+this.points.map(function(t){return Number(t[0]).toFixed(e.freeDraw.fix)+","+Number(t[1]).toFixed(e.freeDraw.fix)}).join("L")+"Z",this.SVGPath='<path d="'.concat(this.path,'" />')}},{key:"getBorderPoint",value:function(e){return this.borderPoints[e]}}])&&D(i.prototype,n),o&&D(i,o),t}();function j(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var I=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.ctx=null,this.canvasDOM=t.canvas,this.eventsCallBack=t.eventsCallBack,this.eventsReceive=t.eventsReceive||["mouseenter","mouseleave"],this.model="view",this.editingId=null,this.isClickedShape=!1,this.clickedShapeId=null,this.shapeInCanvas={},this.zoomLevel=1,this.offsetTop=0,this.offsetLeft=0,this.transformCenter=[0,0],this.eventsKeysMap={},this.fix=2,this._initFreeDraw()}var t,i,n;return t=e,(i=[{key:"_initFreeDraw",value:function(){this.ctx=this.canvasDOM.getContext("2d"),this.canvasDOM.addEventListener("mousedown",this._distributeEvents.bind(this)),this.canvasDOM.addEventListener("mousemove",this._distributeEvents.bind(this)),this.canvasDOM.addEventListener("mouseup",this._distributeEvents.bind(this)),window.document.addEventListener("keydown",this._distributeEvents.bind(this))}},{key:"_distributeEvents",value:function(e){var t=e.type,i=e.offsetX,n=e.offsetY;if("view"===this.model){if("keydown"===t)return;if("mousedown"===t)for(var r in this.shapeInCanvas){this.shapeInCanvas[r]._includes(i,n)&&(this.clickedShapeId=r,this.isClickedShape=!0)}else"mouseup"===t&&(this.clickedShapeId=null,this.isClickedShape=!1);if(this.eventsCallBack&&"function"==typeof this.eventsCallBack)for(var o in this.shapeInCanvas){this.shapeInCanvas[o]._includes(i,n)?this.eventsKeysMap[o]?this.eventsReceive.includes("mousemove")&&this.eventsCallBack(e,o,"mousemove"):(this.eventsKeysMap[o]="mouse-enter",this.eventsReceive.includes("mouseenter")&&this.eventsCallBack(e,o,"mouseenter")):this.eventsKeysMap[o]&&(this.eventsKeysMap[o]=void 0,this.eventsReceive.includes("mouseleave")&&this.eventsCallBack(e,o,"mouseleave"))}}else if("edit"===this.model){var s=this.shapeInCanvas[this.editingId];s&&(s._trigger(e),"mousedown"===t?s._includes(i,n)&&(this.isClickedShape=!0,this.clickedShapeId=s.id):"mouseup"===t&&(this.isClickedShape=!1,this.clickedShapeId=null))}}},{key:"_updateCtxStyle",value:function(e){e.lineWidth&&(this.ctx.lineWidth=e.lineWidth),e.fillStyle&&(this.ctx.fillStyle=e.fillStyle),e.strokeStyle&&(this.ctx.strokeStyle=e.strokeStyle)}},{key:"removeShape",value:function(e){return this.shapeInCanvas[e]&&delete this.shapeInCanvas[e],"edit"===this.model&&this.editingId===e&&(this.model="view",this.editingId=null),this._refreshShapesInCanvas(),this}},{key:"removeAllShape",value:function(){return this.shapeInCanvas={},this._refreshShapesInCanvas(),this}},{key:"_updateModel",value:function(e,t){this.model=e||"view",this.editingId=t||null}},{key:"_clearCanvas",value:function(){return this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this}},{key:"_refreshShapesInCanvas",value:function(){for(var e in this._clearCanvas(),this.shapeInCanvas)this.shapeInCanvas[e]._draw()}},{key:"zoomAndOffset",value:function(e,t,i,n){e&&(this.zoomLevel=e),n&&(this.offsetTop=n),i&&(this.offsetLeft=i),t&&(this.transformCenter=t),this._refreshShapesInCanvas()}},{key:"addShape",value:function(e){if("edit"===this.model)throw new Error("Can not add another shape in edit model");var t=e.type,i=e.id;if(!i)throw new Error("Shape id can not be empty");if(this.shapeInCanvas[i])throw new Error("Shape id must be unique, shape id '".concat(i,"' has already exist"));return this._updateModel("edit",i),"rect"===t?(this.shapeInCanvas[i]=this._addRect(e),this.shapeInCanvas[i]):"ellipse"===t?(this.shapeInCanvas[i]=new b(Object.assign({},{freeDraw:this},e)),this.shapeInCanvas[i]):"polygon"===t?(this.shapeInCanvas[i]=new O(Object.assign({},{freeDraw:this},e)),this.shapeInCanvas[i]):void 0}},{key:"_addRect",value:function(e){var t=e.id,i=e.type,n=e.shapeStyle,r=e.handlePointStyle,o=e.startPoint,s=e.width,a=e.height;if(e.transform){var h=this.removeZoomAndMoveRect(s,a,o);s=h.width,a=h.height,o=h.startPoint}return new v({id:t,type:i,width:s,height:a,startPoint:o,shapeStyle:n,handlePointStyle:r,freeDraw:this})}},{key:"removeZoomAndMoveRect",value:function(e,t,i){e/=this.zoomLevel,t/=this.zoomLevel;var n=i[0],r=i[1];return 0!==this.offsetLeft&&(n-=this.offsetLeft),0!==this.offsetTop&&(r-=this.offsetTop),{width:e,height:t,startPoint:[n=(n-this.transformCenter[0])/this.zoomLevel+this.transformCenter[0],r=(r-this.transformCenter[1])/this.zoomLevel+this.transformCenter[1]]}}}])&&j(t.prototype,i),n&&j(t,n),e}();t.default=I}])});