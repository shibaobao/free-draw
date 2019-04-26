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

    this.defaultStyle = {
      lineWidth: 2,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
      strokeStyle: '#409EFF'
    };
  }

  updateStyle (style = {}) {
    this.ctx.lineWidth = style.lineWidth;
    this.ctx.fillStyle = style.fillStyle;
    this.ctx.strokeStyle = style.strokeStyle;
  }

  drawPath (path, style = {}) {
    const newPath = new Path2D(path);
    this.updateStyle(style);
    this.ctx.fill(newPath);
    this.ctx.stroke(newPath);
    return newPath;
  }

  drawRect (params) {
    const { x, y, width, height, style = {} } = params;
    const newRect = new Path2D();
    newRect.rect(x, y, width, height);
    this.updateStyle(style);
    this.ctx.fill(newRect);
    this.ctx.stroke(newRect);
    return this
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
    }
  }

  finish () {
    this.active = false;
    this.handlePoints = [];
    this.EasyDraw.refreshShapes();
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
}

module.exports = Basic;