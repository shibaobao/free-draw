class Basic {
  constructor (options) {
    this.ctx = options.ctx;
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

  isPointInShape (point, shape) {
    const { x, y } = point;
    return this.ctx.isPointInPath(shape, x, y);
  }
}

module.exports = Basic;