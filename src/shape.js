class Shape {
  constructor (options) {
    this.EasyDraw = options.EasyDraw;
    this.id = options.id;
    this.ctx = options.ctx;
    this.path = options.path;
    this.pathObj = null;
    this.style = options.style;
    this.defaultStyle = {
      lineWidth: 2,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
      strokeStyle: '#409EFF'
    };
    this.initShape();
  }

  initShape () {
    this.pathObj = this.drawPath(this.path, Object.assign({}, this.style, this.defaultStyle));
  }

  drawPath (path, style = {}) {
    const newPath = new Path2D(path);
    this.updateCtxStyle(style);
    this.ctx.fill(newPath);
    this.ctx.stroke(newPath);
    return newPath;
  }

  update ({ style }) {
    if (style) {
      this.style = style;
    }
    this.EasyDraw.refreshShapes();
  }

  updateCtxStyle (style = {}) {
    this.ctx.lineWidth = style.lineWidth;
    this.ctx.fillStyle = style.fillStyle;
    this.ctx.strokeStyle = style.strokeStyle;
  }
}

module.exports = Shape;