const Tool = require('./tool');

class Basic {
  constructor (options) {
    this.EasyDraw = options.EasyDraw;

    this.id = options.id;
    this.ctx = options.ctx;
    // If current polycon is active
    this.active = true;

    // Shape style
    this.style = options.style;

    // Shape Object
    this.shapeObject = null;

    // Shape points 
    this.points = options.points || [];
    // Shape handle points
    this.handlePoints = [];
    this.handlePointIndex = null;

    this.defaultStyle = {
      lineWidth: 2,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
      strokeStyle: '#409EFF'
    };

    this.handlePointStyle = options.handlePointStyle;

    this.defaultHandlePointStyle = {
      lineWidth: 2,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
      strokeStyle: '#F56C6C',
      radius: 8
    };
  }

  update ({ style }) {
    // Update shape style
    if (style) {
      this.style = style;
    }
    this.EasyDraw.refreshShapes();
  }

  _updateCtxStyle (style = {}) {
    this.ctx.lineWidth = style.lineWidth;
    this.ctx.fillStyle = style.fillStyle;
    this.ctx.strokeStyle = style.strokeStyle;
  }

  refresh () {
    this.refreshShape();
    this.refreshHandlePoints();
  }

  drawPath (path, style = {}) {
    const newPath = new Path2D(path);
    this._updateCtxStyle(style);
    this.ctx.fill(newPath);
    this.ctx.stroke(newPath);
    return newPath;
  }

  /**
   * Draw Handle Point
   * @param {Number} x 
   * @param {Number} y 
   * @param {Object} style 
   */
  _drawHandlePoint (x, y, style = this.defaultHandlePointStyle) {
    const handlePoint = new Path2D();
    handlePoint.arc(x, y, style.radius, 0, 2 * Math.PI);
    this._updateCtxStyle(style);
    this.ctx.fill(handlePoint);
    this.ctx.stroke(handlePoint);
    return handlePoint;
  }

  refreshHandlePoints () {
    for (let handlePoint of this.handlePoints) {
      handlePoint.obj = this._drawHandlePoint(handlePoint.point[0], handlePoint.point[1], handlePoint.style);
    }
  }

  trigger (event) {
    const { type } = event;
    switch (type) {
      case 'mousedown':
        if (this.handleMouseDown && typeof this.handleMouseDown === 'function') {
          this.handleMouseDown(event);
        }
        break;
      case 'mousemove':
        if (this.handleMouseMove && typeof this.handleMouseDown === 'function') {
          this.handleMouseMove(event);
        }
        break;
      case 'mouseup':
        if (this.handleMouseUp && typeof this.handleMouseDown === 'function') {
          this.handleMouseUp(event);
        }
        break;
      case 'keydown':
        console.log(event)
        switch (event) {
        }
        break;
    }
  }

  finish () {
    this.active = false;
    this.handlePoints = [];
    this.EasyDraw.refreshShapes();
    this.EasyDraw._finishDrawing();
    return {
      id: this.id,
      points: this.points,
      path: Tool.pointsToSVGPath(this.points)
    }
  }

  isPointInShape (point, shape) {
    const { x, y } = point;
    return this.ctx.isPointInPath(shape, x, y);
  }

  _isClickHandlePoint (x, y) {
    let handlePointIndex = null;
    for (let i = 0; i < this.handlePoints.length; i++) {
      if (this.isPointInShape({x, y}, this.handlePoints[i].obj)) {
        handlePointIndex = i;
        break;
      }
    }
    return handlePointIndex;
  }
}

module.exports = Basic;