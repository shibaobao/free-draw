const Basic = require('./basic');

class Rect extends Basic {
  constructor (options) {
    super(options);

    this.startPoint = options.startPoint || [0, 0];
    this.width = options.width || 100;
    this.height = options.height || 100;

    this.draging = false

    this.initRect();
  }

  initRect () {
  }

  handleMouseDown (event) {
    if (!this.active) {
    } else {
      const { offsetX: x, offsetY: y } = event;
      this.draging = true;
      const handlePointIndex = this._isClickHandlePoint(x, y);
      if (handlePointIndex === null ) {
        this.startPoint = [x, y];
      } else {
        this.handlePointIndex = handlePointIndex;
      }
    }
  }

  handleMouseMove (event) {
    if (!this.active) {
      
    } else {
      if (this.draging) {
        const { offsetX: x, offsetY: y } = event;
        if (this.handlePointIndex === null || this.handlePointIndex === 0) {
          // Change shape width and height
          this.width = x - this.startPoint[0];
          this.height = y - this.startPoint[1];
          this.handlePoints[0] = { obj: null, point: [x, y] };
          this.handlePoints[1] = { obj: null, point: [x - this.width / 2, y - this.height / 2] };
        } else if (this.handlePointIndex === 1) {
          // Update handlepoints and start point
          this.startPoint = [x - this.width / 2, y - this.height / 2];
          this.handlePoints[0] = { obj: null, point: [x + this.width / 2, y + this.height / 2] };
          this.handlePoints[1] = { obj: null, point: [x, y] };
        }
        // Update rect to points
        this.rectToPoints();
        this.EasyDraw.refreshShapes();
      }
    }
  }

  handleMouseUp (event) {
    if (this.draging) {
      this.draging = false;
      if (this.handlePoints[1] === undefined) {
        const { offsetX: x, offsetY: y } = event;
        this.handlePoints[1] = { obj: null, point: [x - this.width/2, y - this.height/2] };
      }
    }
  }

  refreshShape () {
    this.shapeObject = this.drawRect(this.startPoint, this.width, this.height, Object.assign({}, this.defaultStyle, this.style));
  }

  drawRect (startPoint, width, height, style) {
    const newRect = new Path2D()
    newRect.rect(startPoint[0], startPoint[1], width, height);
    this.updateStyle(style);
    this.ctx.fill(newRect);
    this.ctx.stroke(newRect);
    return newRect;
  }

  rectToPoints () {
    this.points[0] = this.startPoint;
    this.points[1] = [this.startPoint[0] + this.width, this.startPoint[1]];
    this.points[2] = [this.startPoint[0] + this.width, this.startPoint[1] + this.height];
    this.points[3] = [this.startPoint[0], this.startPoint[1] + this.height];
  }
}

module.exports = Rect;