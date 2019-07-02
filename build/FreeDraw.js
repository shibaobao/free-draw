!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.FreeDraw=t():e.FreeDraw=t()}(window,function(){return function(e){var t=window.webpackHotUpdateFreeDraw;window.webpackHotUpdateFreeDraw=function(e,i){!function(e,t){if(!_[e]||!m[e])return;for(var i in m[e]=!1,t)Object.prototype.hasOwnProperty.call(t,i)&&(y[i]=t[i]);0==--w&&0===k&&D()}(e,i),t&&t(e,i)};var i,n=!0,r="ed645a5a83c37f776478",s=1e4,o={},a=[],h=[];function l(e){var t=O[e];if(!t)return C;var n=function(n){return t.hot.active?(O[n]?-1===O[n].parents.indexOf(e)&&O[n].parents.push(e):(a=[e],i=n),-1===t.children.indexOf(n)&&t.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),a=[]),C(n)},r=function(e){return{configurable:!0,enumerable:!0,get:function(){return C[e]},set:function(t){C[e]=t}}};for(var s in C)Object.prototype.hasOwnProperty.call(C,s)&&"e"!==s&&"t"!==s&&Object.defineProperty(n,s,r(s));return n.e=function(e){return"ready"===u&&f("prepare"),k++,C.e(e).then(t,function(e){throw t(),e});function t(){k--,"prepare"===u&&(P[e]||S(e),0===k&&0===w&&D())}},n.t=function(e,t){return 1&t&&(e=n(e)),C.t(e,-2&t)},n}function c(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:i!==e,active:!0,accept:function(e,i){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var n=0;n<e.length;n++)t._acceptedDependencies[e[n]]=i||function(){};else t._acceptedDependencies[e]=i||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var i=0;i<e.length;i++)t._declinedDependencies[e[i]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var i=t._disposeHandlers.indexOf(e);i>=0&&t._disposeHandlers.splice(i,1)},check:g,apply:x,status:function(e){if(!e)return u;d.push(e)},addStatusHandler:function(e){d.push(e)},removeStatusHandler:function(e){var t=d.indexOf(e);t>=0&&d.splice(t,1)},data:o[e]};return i=void 0,t}var d=[],u="idle";function f(e){u=e;for(var t=0;t<d.length;t++)d[t].call(null,e)}var p,y,v,w=0,k=0,P={},m={},_={};function b(e){return+e+""===e?+e:e}function g(e){if("idle"!==u)throw new Error("check() is only allowed in idle status");return n=e,f("check"),(t=s,t=t||1e4,new Promise(function(e,i){if("undefined"==typeof XMLHttpRequest)return i(new Error("No browser support"));try{var n=new XMLHttpRequest,s=C.p+""+r+".hot-update.json";n.open("GET",s,!0),n.timeout=t,n.send(null)}catch(e){return i(e)}n.onreadystatechange=function(){if(4===n.readyState)if(0===n.status)i(new Error("Manifest request to "+s+" timed out."));else if(404===n.status)e();else if(200!==n.status&&304!==n.status)i(new Error("Manifest request to "+s+" failed."));else{try{var t=JSON.parse(n.responseText)}catch(e){return void i(e)}e(t)}}})).then(function(e){if(!e)return f("idle"),null;m={},P={},_=e.c,v=e.h,f("prepare");var t=new Promise(function(e,t){p={resolve:e,reject:t}});y={};return S(0),"prepare"===u&&0===k&&0===w&&D(),t});var t}function S(e){_[e]?(m[e]=!0,w++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=C.p+""+e+"."+r+".hot-update.js",document.head.appendChild(t)}(e)):P[e]=!0}function D(){f("ready");var e=p;if(p=null,e)if(n)Promise.resolve().then(function(){return x(n)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var i in y)Object.prototype.hasOwnProperty.call(y,i)&&t.push(b(i));e.resolve(t)}}function x(t){if("ready"!==u)throw new Error("apply() is only allowed in ready status");var i,n,s,h,l;function c(e){for(var t=[e],i={},n=t.map(function(e){return{chain:[e],id:e}});n.length>0;){var r=n.pop(),s=r.id,o=r.chain;if((h=O[s])&&!h.hot._selfAccepted){if(h.hot._selfDeclined)return{type:"self-declined",chain:o,moduleId:s};if(h.hot._main)return{type:"unaccepted",chain:o,moduleId:s};for(var a=0;a<h.parents.length;a++){var l=h.parents[a],c=O[l];if(c){if(c.hot._declinedDependencies[s])return{type:"declined",chain:o.concat([l]),moduleId:s,parentId:l};-1===t.indexOf(l)&&(c.hot._acceptedDependencies[s]?(i[l]||(i[l]=[]),d(i[l],[s])):(delete i[l],t.push(l),n.push({chain:o.concat([l]),id:l})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:i}}function d(e,t){for(var i=0;i<t.length;i++){var n=t[i];-1===e.indexOf(n)&&e.push(n)}}t=t||{};var p={},w=[],k={},P=function(){console.warn("[HMR] unexpected require("+g.moduleId+") to disposed module")};for(var m in y)if(Object.prototype.hasOwnProperty.call(y,m)){var g;l=b(m);var S=!1,D=!1,x=!1,j="";switch((g=y[m]?c(l):{type:"disposed",moduleId:m}).chain&&(j="\nUpdate propagation: "+g.chain.join(" -> ")),g.type){case"self-declined":t.onDeclined&&t.onDeclined(g),t.ignoreDeclined||(S=new Error("Aborted because of self decline: "+g.moduleId+j));break;case"declined":t.onDeclined&&t.onDeclined(g),t.ignoreDeclined||(S=new Error("Aborted because of declined dependency: "+g.moduleId+" in "+g.parentId+j));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(g),t.ignoreUnaccepted||(S=new Error("Aborted because "+l+" is not accepted"+j));break;case"accepted":t.onAccepted&&t.onAccepted(g),D=!0;break;case"disposed":t.onDisposed&&t.onDisposed(g),x=!0;break;default:throw new Error("Unexception type "+g.type)}if(S)return f("abort"),Promise.reject(S);if(D)for(l in k[l]=y[l],d(w,g.outdatedModules),g.outdatedDependencies)Object.prototype.hasOwnProperty.call(g.outdatedDependencies,l)&&(p[l]||(p[l]=[]),d(p[l],g.outdatedDependencies[l]));x&&(d(w,[g.moduleId]),k[l]=P)}var L,I=[];for(n=0;n<w.length;n++)l=w[n],O[l]&&O[l].hot._selfAccepted&&k[l]!==P&&I.push({module:l,errorHandler:O[l].hot._selfAccepted});f("dispose"),Object.keys(_).forEach(function(e){!1===_[e]&&function(e){delete installedChunks[e]}(e)});for(var M,B,E=w.slice();E.length>0;)if(l=E.pop(),h=O[l]){var H={},A=h.hot._disposeHandlers;for(s=0;s<A.length;s++)(i=A[s])(H);for(o[l]=H,h.hot.active=!1,delete O[l],delete p[l],s=0;s<h.children.length;s++){var z=O[h.children[s]];z&&((L=z.parents.indexOf(l))>=0&&z.parents.splice(L,1))}}for(l in p)if(Object.prototype.hasOwnProperty.call(p,l)&&(h=O[l]))for(B=p[l],s=0;s<B.length;s++)M=B[s],(L=h.children.indexOf(M))>=0&&h.children.splice(L,1);for(l in f("apply"),r=v,k)Object.prototype.hasOwnProperty.call(k,l)&&(e[l]=k[l]);var R=null;for(l in p)if(Object.prototype.hasOwnProperty.call(p,l)&&(h=O[l])){B=p[l];var T=[];for(n=0;n<B.length;n++)if(M=B[n],i=h.hot._acceptedDependencies[M]){if(-1!==T.indexOf(i))continue;T.push(i)}for(n=0;n<T.length;n++){i=T[n];try{i(B)}catch(e){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:l,dependencyId:B[n],error:e}),t.ignoreErrored||R||(R=e)}}}for(n=0;n<I.length;n++){var X=I[n];l=X.module,a=[l];try{C(l)}catch(e){if("function"==typeof X.errorHandler)try{X.errorHandler(e)}catch(i){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:l,error:i,originalError:e}),t.ignoreErrored||R||(R=i),R||(R=e)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:l,error:e}),t.ignoreErrored||R||(R=e)}}return R?(f("fail"),Promise.reject(R)):(f("idle"),new Promise(function(e){e(w)}))}var O={};function C(t){if(O[t])return O[t].exports;var i=O[t]={i:t,l:!1,exports:{},hot:c(t),parents:(h=a,a=[],h),children:[]};return e[t].call(i.exports,i,i.exports,l(t)),i.l=!0,i.exports}return C.m=e,C.c=O,C.d=function(e,t,i){C.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},C.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},C.t=function(e,t){if(1&t&&(e=C(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(C.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)C.d(i,n,function(t){return e[t]}.bind(null,n));return i},C.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return C.d(t,"a",t),t},C.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},C.p="/build/",C.h=function(){return r},l(0)(C.s=0)}([function(e,t,i){e.exports=i(1)},function(e,t,i){"use strict";i.r(t);var n={lineWidth:2,fillStyle:"#FFFFFF",strokeStyle:"#0E71EB",width:8},r={lineWidth:2,fillStyle:"#FFFFFF",strokeStyle:"#0E71EB",radius:4},s={lineWidth:2,fillStyle:"rgba(14, 113, 235, 0.25)",strokeStyle:"#0E71EB"},o={lineWidth:2,fillStyle:"rgba(14, 113, 235, 0.8)",strokeStyle:"rgba(14, 113, 235, 0.8)"},a={lineWidth:1,strokeStyle:"#0E71EB"};function h(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.id=t.id,this.type=t.type,this.edit=t.edit||!0,this.points=t.points||[],this.temporaryPoints=[],this.path=t.path||"",this.handlePoints=[],this.clickedHandlePointIndex=null,this.clickedShape=!1,this.clickedShapePoint=[],this.clickedHandlePoint=!1,this.freeDraw=t.freeDraw,this.handlePointStyle=t.handlePointStyle,this.shapeStyle=t.shapeStyle,this.shape=null}var t,i,r;return t=e,(i=[{key:"_initShape",value:function(){this.handlePointStyle||(this.handlePointStyle=n),this.shapeStyle||(this.shapeStyle=s)}},{key:"_trigger",value:function(e){switch(e.type){case"mousedown":this._handleMouseDown&&"function"==typeof this._handleMouseDown&&this._handleMouseDown(e);break;case"mousemove":this._handleMouseMove&&"function"==typeof this._handleMouseMove&&this._handleMouseMove(e);break;case"mouseup":this._handleMouseUp&&"function"==typeof this._handleMouseUp&&this._handleMouseUp(e);break;case"keydown":this._handleKeydown&&"function"==typeof this._handleKeydown&&this._handleKeydown(e)}}},{key:"_drawRectPoint",value:function(e,t,i,n){var r=new Path2D;return r.rect(e-i/2,t-i/2,i,i),this.freeDraw._updateCtxStyle(n),this.freeDraw.ctx.fill(r),this.freeDraw.ctx.stroke(r),r}},{key:"_drawLine",value:function(e,t,i){var n="M".concat(e[0],",").concat(e[1],"L").concat(t[0],",").concat(t[1]),r=new Path2D(n);return this.freeDraw._updateCtxStyle(i),this.freeDraw.ctx.fill(r),this.freeDraw.ctx.stroke(r),r}},{key:"_drawCirclePoint",value:function(e,t,i,n){var r=new Path2D;return r.arc(e,t,i,0,2*Math.PI,!1),this.freeDraw._updateCtxStyle(n),this.freeDraw.ctx.fill(r),this.freeDraw.ctx.stroke(r),r}},{key:"_includes",value:function(e,t){return this._pointInHandlePoints(e,t)||this._pointInShape(e,t)}},{key:"_handleMouseDown",value:function(e){var t=e.offsetX,i=e.offsetY;this._pointInHandlePoints(t,i)?(this.clickedHandlePoint=!0,this.clickedShapePoint=[],this.clickedShape=!1,"polygon"===this.type&&this._polygonMouseDown(e)):this._pointInShape(t,i)?(this.clickedHandlePoint=!1,this.clickedShapePoint=[t,i],this.clickedShape=!0):"polygon"===this.type&&this._polygonMouseDown(e)}},{key:"_handleMouseUp",value:function(){this.clickedShape=!1,this.clickedHandlePoint=!1,this.clickedShapePoint=[]}},{key:"_pointInShape",value:function(e,t){if(!this.shape)return!1;var i=!0,n=!1,r=void 0;try{for(var s,o=this.temporaryPoints[Symbol.iterator]();!(i=(s=o.next()).done);i=!0){var a=s.value;if(e===a[0]&&t===a[1])return!1}}catch(e){n=!0,r=e}finally{try{i||null==o.return||o.return()}finally{if(n)throw r}}return this.freeDraw.ctx.isPointInPath(this.shape,e,t)}},{key:"_pointInHandlePoints",value:function(e,t){var i=!1;if(this.edit){for(var n=null,r=0;r<this.handlePoints.length;r++)if(this.freeDraw.ctx.isPointInPath(this.handlePoints[r].obj,e,t)){i=!0,n=r;break}this.clickedHandlePointIndex=n}return i}},{key:"editShape",value:function(){return this.shapeStyle=s,this.edit=!0,this.freeDraw._updateModel("edit",this.id),this.freeDraw._refreshShapesInCanvas(),this._backupData(),this}},{key:"finish",value:function(){return this.edit=!1,this.freeDraw._updateModel("view"),this.shapeStyle=o,this._pointsToPath&&"function"==typeof this._pointsToPath&&this._pointsToPath(),this.freeDraw._refreshShapesInCanvas(),this}},{key:"cancelEdit",value:function(){return this.shapeStyle=o,this.edit=!1,this.freeDraw._updateModel("view"),this._rollbackData(),this.freeDraw._refreshShapesInCanvas(),this}},{key:"getHandlePointCoordinate",value:function(e){return this.handlePoints[e]?this.handlePoints[e].point:null}}])&&h(t.prototype,i),r&&h(t,r),e}();function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function u(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(e){function t(e){var i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(i=u(this,f(t).call(this,e))).startPoint=e.startPoint||[],i.width=e.width,i.height=e.height,i.startPointBackup=[],i.widthBackup=null,i.heightBackup=null,i.pointsBackup=[],i.pathBackup="",i._initRect(),i}var i,n,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,l),i=t,(n=[{key:"_initRect",value:function(){this._initShape(),this.startPoint.length>0&&this.width&&this.height&&this._draw()}},{key:"_draw",value:function(){this._generateHandlePointsByPoints(),this.shape=this._drawRect(),this.edit&&this._drawRectHandlePoints()}},{key:"_generateHandlePointsByPoints",value:function(){var e=this.getZoomAndMove(),t=e.startPoint,i=e.width,n=e.height;this.handlePoints[0]={obj:null,point:t},this.handlePoints[1]={obj:null,point:[t[0]+i,t[1]]},this.handlePoints[2]={obj:null,point:[t[0]+i,t[1]+n]},this.handlePoints[3]={obj:null,point:[t[0],t[1]+n]}}},{key:"_drawRectHandlePoints",value:function(){for(var e=0;e<this.handlePoints.length;e++)this.handlePoints[e].obj=this._drawRectPoint(this.handlePoints[e].point[0],this.handlePoints[e].point[1],this.handlePointStyle.width,{lineWidth:this.handlePointStyle.lineWidth,fillStyle:this.handlePointStyle.fillStyle,strokeStyle:this.handlePointStyle.strokeStyle})}},{key:"_drawRect",value:function(){var e=this.getZoomAndMove(),t=e.startPoint,i=e.width,n=e.height,r=new Path2D;return r.rect(t[0],t[1],i,n),this.freeDraw._updateCtxStyle(this.shapeStyle),this.freeDraw.ctx.fill(r),this.freeDraw.ctx.stroke(r),r}},{key:"_handleMouseMove",value:function(e){var t=e.offsetX,i=e.offsetY;if(this.clickedHandlePoint){var n=this.handlePoints[this.clickedHandlePointIndex].point;0===this.clickedHandlePointIndex?(this.width+=(n[0]-t)/this.freeDraw.zoomLevel,this.height+=(n[1]-i)/this.freeDraw.zoomLevel,this.startPoint=[this.startPoint[0]+(t-n[0])/this.freeDraw.zoomLevel,this.startPoint[1]+(i-n[1])/this.freeDraw.zoomLevel]):1===this.clickedHandlePointIndex?(this.width+=(t-n[0])/this.freeDraw.zoomLevel,this.height+=(n[1]-i)/this.freeDraw.zoomLevel,this.startPoint[1]+=(i-n[1])/this.freeDraw.zoomLevel):2===this.clickedHandlePointIndex?(this.width+=t-n[0],this.height+=i-n[1]):3===this.clickedHandlePointIndex&&(this.width+=(n[0]-t)/this.freeDraw.zoomLevel,this.height+=(i-n[1])/this.freeDraw.zoomLevel,this.startPoint[0]+=(t-n[0])/this.freeDraw.zoomLevel),this.freeDraw.eventsReceive.includes("transform")&&this.freeDraw.eventsCallBack(e,this.id,"transform")}else this.clickedShape&&(this.startPoint=[this.startPoint[0]+(t-this.clickedShapePoint[0])/this.freeDraw.zoomLevel,this.startPoint[1]+(i-this.clickedShapePoint[1])/this.freeDraw.zoomLevel],this.clickedShapePoint=[t,i],this.freeDraw.eventsReceive.includes("drag")&&this.freeDraw.eventsCallBack(e,this.id,"drag"));this._generateHandlePointsByPoints(),this.freeDraw._refreshShapesInCanvas()}},{key:"getZoomAndMove",value:function(){var e=this.width,t=this.height;e=this.width*this.freeDraw.zoomLevel,t=this.height*this.freeDraw.zoomLevel;var i=(this.startPoint[0]-this.freeDraw.transformCenter[0])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[0],n=(this.startPoint[1]-this.freeDraw.transformCenter[1])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[1];return 0!==this.freeDraw.offsetLeft&&(i+=this.freeDraw.offsetLeft),0!==this.freeDraw.offsetTop&&(n+=this.freeDraw.offsetTop),{width:e,height:t,startPoint:[i,n]}}},{key:"_pointsToPath",value:function(){this.points[0]=this.startPoint,this.points[1]=[this.startPoint[0]+this.width,this.startPoint[1]],this.points[2]=[this.startPoint[0]+this.width,this.startPoint[1]+this.height],this.points[3]=[this.startPoint[0],this.startPoint[1]+this.height],this.path="M".concat(this.points[0].join(","),"L").concat(this.points[1].join(","),"L").concat(this.points[2].join(","),"L").concat(this.points[3].join(","),"Z")}},{key:"_backupData",value:function(){this.startPointBackup=JSON.parse(JSON.stringify(this.startPoint)),this.widthBackup=this.width,this.heightBackup=this.height,this.pointsBackup=JSON.parse(JSON.stringify(this.points)),this.pathBackup=this.path}},{key:"_rollbackData",value:function(){this.startPoint=JSON.parse(JSON.stringify(this.startPointBackup)),this.width=this.widthBackup,this.height=this.heightBackup,this.points=JSON.parse(JSON.stringify(this.pointsBackup)),this.path=this.pathBackup}}])&&d(i.prototype,n),r&&d(i,r),t}();function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function k(e,t){return!t||"object"!==v(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var _=function(e){function t(e){var i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(i=k(this,P(t).call(this,e))).x=e.x,i.y=e.y,i.radiusX=e.radiusX,i.radiusY=e.radiusY,i.rotation=e.rotation||0,i.startAngle=e.startAngle||0,i.endAngle=e.endAngle||2*Math.PI,i.anticlockwise=e.anticlockwise||!1,i.xBackup=null,i.yBackup=null,i.radiusXBackup=null,i.radiusYBackup=null,i.rotationBackup=null,i.startAngleBackup=null,i.endAngleBackup=null,i.anticlockwiseBackup=null,i.handleLines=[],i._initEllipse(),i}var i,n,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,l),i=t,(n=[{key:"_initEllipse",value:function(){this._initShape(),this.x&&this.y&&this.radiusX&&this.radiusY&&this._draw()}},{key:"_generateHandlePointsByPoints",value:function(){var e=this.getZoomAndMove(),t=e.x,i=e.y,n=e.radiusX,r=e.radiusY;this.handlePoints[0]={obj:null,point:[t-n,i-r]},this.handlePoints[1]={obj:null,point:[t+n,i-r]},this.handlePoints[2]={obj:null,point:[t+n,i+r]},this.handlePoints[3]={obj:null,point:[t-n,i+r]}}},{key:"_generateHandleLinesByPoints",value:function(){var e=this.getZoomAndMove(),t=e.x,i=e.y,n=e.radiusX,r=e.radiusY;this.handleLines[0]={obj:null,startPoint:[t-n,i-r],endPoint:[t+n,i-r]},this.handleLines[1]={obj:null,startPoint:[t+n,i-r],endPoint:[t+n,i+r]},this.handleLines[2]={obj:null,startPoint:[t+n,i+r],endPoint:[t-n,i+r]},this.handleLines[3]={obj:null,startPoint:[t-n,i+r],endPoint:[t-n,i-r]}}},{key:"_draw",value:function(){this.shape=this._drawEllipse(),this._generateHandleLinesByPoints(),this._generateHandlePointsByPoints(),this.edit&&(this._drawEllipseHandleLines(),this._drawEllipseHandlePoints())}},{key:"_drawEllipse",value:function(){var e=this.getZoomAndMove(),t=e.x,i=e.y,n=e.radiusX,r=e.radiusY,s=e.startAngle,o=e.endAngle,a=e.anticlockwise,h=new Path2D;return h.ellipse(t,i,n,r,s,o,a),this.freeDraw._updateCtxStyle(this.shapeStyle),this.freeDraw.ctx.fill(h),this.freeDraw.ctx.stroke(h),h}},{key:"_handleMouseMove",value:function(e){var t=e.offsetX,i=e.offsetY;if(this.clickedHandlePoint){var n=this.handlePoints[this.clickedHandlePointIndex].point;this.x+=(t-n[0])/2*this.freeDraw.zoomLevel,this.y+=(i-n[1])/2*this.freeDraw.zoomLevel,0===this.clickedHandlePointIndex?(this.radiusX+=(n[0]-t)/2*this.freeDraw.zoomLevel,this.radiusY+=(n[1]-i)/2*this.freeDraw.zoomLevel):1===this.clickedHandlePointIndex?(this.radiusX+=(t-n[0])/2*this.freeDraw.zoomLevel,this.radiusY+=(n[1]-i)/2*this.freeDraw.zoomLevel):2===this.clickedHandlePointIndex?(this.radiusX+=(t-n[0])/2*this.freeDraw.zoomLevel,this.radiusY+=(i-n[1])/2*this.freeDraw.zoomLevel):3===this.clickedHandlePointIndex&&(this.radiusX+=(n[0]-t)/2*this.freeDraw.zoomLevel,this.radiusY+=(i-n[1])/2*this.freeDraw.zoomLevel),this.freeDraw.eventsReceive.includes("transform")&&this.freeDraw.eventsCallBack(e,this.id,"transform")}else this.clickedShape&&(this.x+=(t-this.clickedShapePoint[0])/this.freeDraw.zoomLevel,this.y+=(i-this.clickedShapePoint[1])/this.freeDraw.zoomLevel,this.clickedShapePoint=[t,i],this.freeDraw.eventsReceive.includes("drag")&&this.freeDraw.eventsCallBack(e,this.id,"drag"));this._generateHandlePointsByPoints(),this.freeDraw._refreshShapesInCanvas()}},{key:"_drawEllipseHandlePoints",value:function(){for(var e=0;e<this.handlePoints.length;e++)this.handlePoints[e].obj=this._drawRectPoint(this.handlePoints[e].point[0],this.handlePoints[e].point[1],this.handlePointStyle.width,{lineWidth:this.handlePointStyle.lineWidth,fillStyle:this.handlePointStyle.fillStyle,strokeStyle:this.handlePointStyle.strokeStyle})}},{key:"_drawEllipseHandleLines",value:function(){for(var e=0;e<this.handleLines.length;e++)this.handleLines[e].obj=this._drawLine(this.handleLines[e].startPoint,this.handleLines[e].endPoint,a)}},{key:"getZoomAndMove",value:function(){var e=this.radiusX*this.freeDraw.zoomLevel,t=this.radiusY*this.freeDraw.zoomLevel,i=(this.x-this.freeDraw.transformCenter[0])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[0],n=(this.y-this.freeDraw.transformCenter[1])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[1];return 0!==this.freeDraw.offsetLeft&&(i+=this.freeDraw.offsetLeft),0!==this.freeDraw.offsetTop&&(n+=this.freeDraw.offsetTop),{x:i,y:n,radiusX:e,radiusY:t,rotation:this.rotation,startAngle:this.startAngle,endAngle:this.endAngle,anticlockwise:this.anticlockwise}}},{key:"_backupData",value:function(){this.xBackup=this.x,this.yBackup=this.y,this.radiusXBackup=this.radiusX,this.radiusYBackup=this.radiusY,this.rotationBackup=this.rotation,this.startAngleBackup=this.startAngle,this.endAngleBackup=this.endAngle,this.anticlockwiseBackup=this.anticlockwise}},{key:"_rollbackData",value:function(){this.x=this.xBackup,this.y=this.yBackup,this.radiusX=this.radiusXBackup,this.radiusY=this.radiusYBackup,this.rotation=this.rotationBackup,this.startAngle=this.startAngleBackup,this.endAngle=this.endAngleBackup,this.anticlockwise=this.anticlockwiseBackup}},{key:"_pointsToPath",value:function(){this.path=JSON.stringify({x:this.x,y:this.y,radiusX:this.radiusX,radiusY:this.radiusY,rotation:this.rotation,startAngle:this.startAngle,endAngle:this.startAngle,anticlockwise:this.anticlockwise})}}])&&w(i.prototype,n),r&&w(i,r),t}();function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function S(e,t){return!t||"object"!==b(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function D(e){return(D=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function x(e,t){return(x=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var O=function(e){function t(e){var i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(i=S(this,D(t).call(this,e))).temporaryPointsFollow=!0,i.pointsBackup=[],i._initPolygon(),i}var i,n,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&x(e,t)}(t,l),i=t,(n=[{key:"_initPolygon",value:function(){this.handlePointStyle=r,this._initShape(),this.points.length>0&&this._draw()}},{key:"_draw",value:function(){this.shape=this._drawPolygon(),this._generateHandlePointsByPoints(),this.edit&&this._drawPolygonHandlePoints()}},{key:"_generateHandlePointsByPoints",value:function(){var e=this.getZoomAndMove();this.handlePoints=[];for(var t=0;t<e.length;t++)this.handlePoints[t]={obj:null,point:e[t]}}},{key:"_drawPolygon",value:function(){var e=this.getPath(),t=new Path2D(e);return this.freeDraw._updateCtxStyle(this.shapeStyle),this.freeDraw.ctx.fill(t),this.freeDraw.ctx.stroke(t),t}},{key:"_drawPolygonHandlePoints",value:function(){var e=!0,t=!1,i=void 0;try{for(var n,r=this.handlePoints[Symbol.iterator]();!(e=(n=r.next()).done);e=!0){var s=n.value;s.obj=this._drawCirclePoint(s.point[0],s.point[1],this.handlePointStyle.radius,{lineWidth:this.handlePointStyle.lineWidth,fillStyle:this.handlePointStyle.fillStyle,strokeStyle:this.handlePointStyle.strokeStyle})}}catch(e){t=!0,i=e}finally{try{e||null==r.return||r.return()}finally{if(t)throw i}}}},{key:"_handleKeydown",value:function(e){this.points.length>0&&8===e.keyCode&&(this.points.pop(),this.freeDraw._refreshShapesInCanvas())}},{key:"_polygonMouseDown",value:function(e){var t=e.offsetX,i=e.offsetY;this.clickedHandlePoint?(this.temporaryPointsFollow=!1,this.temporaryPoints=[]):(this.temporaryPointsFollow=!0,this.points.push([t,i])),this.freeDraw._refreshShapesInCanvas()}},{key:"_handleMouseMove",value:function(e){var t=e.offsetX,i=e.offsetY;if(this.clickedHandlePoint)this.points[this.clickedHandlePointIndex]=[t,i];else if(this.clickedShape){var n=[],r=!0,s=!1,o=void 0;try{for(var a,h=this.points[Symbol.iterator]();!(r=(a=h.next()).done);r=!0){var l=a.value;n.push([l[0]+(t-this.clickedShapePoint[0])/this.freeDraw.zoomLevel,l[1]+(i-this.clickedShapePoint[1])/this.freeDraw.zoomLevel])}}catch(e){s=!0,o=e}finally{try{r||null==h.return||h.return()}finally{if(s)throw o}}this.clickedShapePoint=[t,i],this.points=n}else this.temporaryPointsFollow&&(this.temporaryPoints=[[t,i]]);this.freeDraw._refreshShapesInCanvas()}},{key:"getZoomAndMove",value:function(e){var t=[],i=this.points;e&&(i=i.concat(this.temporaryPoints));for(var n=0;n<i.length;n++){var r=(i[n][0]-this.freeDraw.transformCenter[0])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[0],s=(i[n][1]-this.freeDraw.transformCenter[1])*this.freeDraw.zoomLevel+this.freeDraw.transformCenter[1];0!==this.freeDraw.offsetLeft&&(r+=this.freeDraw.offsetLeft),0!==this.freeDraw.offsetTop&&(s+=this.freeDraw.offsetTop),t.push([r,s])}return t}},{key:"_backupData",value:function(){this.pointsBackup=JSON.parse(JSON.stringify(this.points))}},{key:"_rollbackData",value:function(){this.points=JSON.parse(JSON.stringify(this.pointsBackup))}},{key:"getPath",value:function(){return"M"+this.getZoomAndMove(!0).map(function(e){return e.join(",")}).join("L")+"Z"}},{key:"_pointsToPath",value:function(){this.path="M"+this.points.map(function(e){return e.join(",")}).join("L")+"Z"}}])&&g(i.prototype,n),s&&g(i,s),t}();function C(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var j=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.ctx=null,this.canvasDOM=t.canvas,this.eventsCallBack=t.eventsCallBack,this.eventsReceive=t.eventsReceive||["mouseenter","mouseleave"],this.model="view",this.editingId=null,this.isClickedShape=!1,this.clickedShapeId=null,this.shapeInCanvas={},this.zoomLevel=1,this.offsetTop=0,this.offsetLeft=0,this.transformCenter=[0,0],this.eventsKeysMap={},this._initFreeDraw()}var t,i,n;return t=e,(i=[{key:"_initFreeDraw",value:function(){this.ctx=this.canvasDOM.getContext("2d"),this.canvasDOM.addEventListener("mousedown",this._distributeEvents.bind(this)),this.canvasDOM.addEventListener("mousemove",this._distributeEvents.bind(this)),this.canvasDOM.addEventListener("mouseup",this._distributeEvents.bind(this)),window.document.addEventListener("keydown",this._distributeEvents.bind(this))}},{key:"_distributeEvents",value:function(e){var t=e.type,i=e.offsetX,n=e.offsetY;if("view"===this.model){if("keydown"===t)return;if("mousedown"===t)for(var r in this.shapeInCanvas){this.shapeInCanvas[r]._includes(i,n)&&(this.clickedShapeId=r,this.isClickedShape=!0)}else"mouseup"===t&&(this.clickedShapeId=null,this.isClickedShape=!1);if(this.eventsCallBack&&"function"==typeof this.eventsCallBack)for(var s in this.shapeInCanvas){this.shapeInCanvas[s]._includes(i,n)?this.eventsKeysMap[s]?this.eventsReceive.includes("mousemove")&&this.eventsCallBack(e,s,"mousemove"):(this.eventsKeysMap[s]="mouse-enter",this.eventsReceive.includes("mouseenter")&&this.eventsCallBack(e,s,"mouseenter")):this.eventsKeysMap[s]&&(this.eventsKeysMap[s]=void 0,this.eventsReceive.includes("mouseleave")&&this.eventsCallBack(e,s,"mouseleave"))}}else if("edit"===this.model){var o=this.shapeInCanvas[this.editingId];o&&(o._trigger(e),"mousedown"===t?o._includes(i,n)&&(this.isClickedShape=!0,this.clickedShapeId=o.id):"mouseup"===t&&(this.isClickedShape=!1,this.clickedShapeId=null))}}},{key:"_updateCtxStyle",value:function(e){e.lineWidth&&(this.ctx.lineWidth=e.lineWidth),e.fillStyle&&(this.ctx.fillStyle=e.fillStyle),e.strokeStyle&&(this.ctx.strokeStyle=e.strokeStyle)}},{key:"removeShape",value:function(e){return this.shapeInCanvas[e]&&delete this.shapeInCanvas[e],"edit"===this.model&&this.editingId===e&&(this.model="view",this.editingId=null),this._refreshShapesInCanvas(),this}},{key:"removeAllShape",value:function(){return this.shapeInCanvas={},this._refreshShapesInCanvas(),this}},{key:"_updateModel",value:function(e,t){this.model=e||"view",this.editingId=t||null}},{key:"_clearCanvas",value:function(){return this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this}},{key:"_refreshShapesInCanvas",value:function(){for(var e in this._clearCanvas(),this.shapeInCanvas)this.shapeInCanvas[e]._draw()}},{key:"zoomAndOffset",value:function(e,t,i,n){e&&(this.zoomLevel=e),n&&(this.offsetTop=n),i&&(this.offsetLeft=i),t&&(this.transformCenter=t),this._refreshShapesInCanvas()}},{key:"addShape",value:function(e){if("edit"===this.model)throw new Error("Can not add another shape in edit model");var t=e.type,i=e.id;if(!i)throw new Error("Shape id can not be empty");if(this.shapeInCanvas[i])throw new Error("Shape id must be unique, shape id '".concat(i,"' has already exist"));return this._updateModel("edit",i),"rect"===t?(this.shapeInCanvas[i]=this._addRect(e),this.shapeInCanvas[i]):"ellipse"===t?(this.shapeInCanvas[i]=new _(Object.assign({},{freeDraw:this},e)),this.shapeInCanvas[i]):"polygon"===t?(this.shapeInCanvas[i]=new O(Object.assign({},{freeDraw:this},e)),this.shapeInCanvas[i]):void 0}},{key:"_addRect",value:function(e){var t=e.id,i=e.type,n=e.shapeStyle,r=e.handlePointStyle,s=e.startPoint,o=e.width,a=e.height,h=this.removeZoomAndMoveRect(o,a,s);return new y({id:t,type:i,width:h.width,height:h.height,startPoint:h.startPoint,shapeStyle:n,handlePointStyle:r,freeDraw:this})}},{key:"removeZoomAndMoveRect",value:function(e,t,i){e/=this.zoomLevel,t/=this.zoomLevel;var n=i[0],r=i[1];return 0!==this.offsetLeft&&(n-=this.offsetLeft),0!==this.offsetTop&&(r-=this.offsetTop),{width:e,height:t,startPoint:[n=(n-this.transformCenter[0])/this.zoomLevel+this.transformCenter[0],r=(r-this.transformCenter[1])/this.zoomLevel+this.transformCenter[1]]}}}])&&C(t.prototype,i),n&&C(t,n),e}();t.default=j}])});