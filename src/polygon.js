const Tool = require('./tool');
const Basic = require('./basic');

class Polygon extends Basic {
  constructor (options) {
    super(options);
    this.EasyDraw = options.EasyDraw;
    this.id = options.id;
    this.ctx = options.ctx;
    // If current polycon is active
    this.active = true;
    this.handlePointIndex = null;
    // Shape points 
    this.points = options.points || [];
    // Shape handle points
    this.handlePoints = [];
    // Shape Object
    this.shapeObject = null;
  
    this.style = options.style;
    this.handlePointStyle = options.handlePointStyle;
    this.defaultStyle = {
      lineWidth: 2,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
      strokeStyle: '#409EFF'
    };
    this.defaultHandlePointStyle = {
      lineWidth: 2,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
      strokeStyle: '#F56C6C',
      radius: 8
    };
    this.initPolygon();
  }

  initPolygon () {
    if (this.points.length > 0) {
      // TODO generate handle points with points
    }
  }

  update (params) {
    if (!params) {
      return
    }
    const { style, active } = params;
    if (style !== undefined) {
      this.style = Object.assign({}, this.style, style);
    }
    if (active !== undefined) {
      this.active = active;
    }
    // TODO Add refresh shape logic
  }

  refresh () {
    this.refreshShape()
    this.refreshHandlePoints()
  }

  refreshShape () {
    const path = Tool.pointsToSVGPath(this.points);
    this.shapeObject = this.drawPath(path, Object.assign({}, this.defaultStyle, this.style));
  }

  refreshHandlePoints () {
    for (let handlePoint of this.handlePoints) {
      handlePoint.obj = this._drawHandlePoint(handlePoint.point[0], handlePoint.point[1], handlePoint.style);
    }
  }
  
  handleMouseDown (event) {
    if (!this.active) {
      
    } else {
      const { offsetX: x, offsetY: y } = event;
      const handlePointIndex = this._isClickHandlePoint(x, y);
      if (handlePointIndex === null ) {
        this.handlePointIndex = null;
        this.points.push([x, y]);
        this.handlePoints.push({
          obj: null,
          point: [x, y]
        });
        this.EasyDraw.refreshShapes();
      } else {
        this.handlePointIndex = handlePointIndex;
      }
    }
  }

  handleMouseMove (event) {
    if (!this.active) {
      
    } else {
      if (this.handlePointIndex !== null) {
        const { offsetX: x, offsetY: y } = event;
        this.points[this.handlePointIndex] = [x, y];
        this.handlePoints[this.handlePointIndex].point = [x, y];
        this.EasyDraw.refreshShapes();
      }
    }
  }

  handleMouseUp () {
    if (this.handlePointIndex !== null) {
      this.handlePointIndex = null;
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

  /**
   * Draw Handle Point
   * @param {Number} x 
   * @param {Number} y 
   * @param {Object} style 
   */
  _drawHandlePoint (x, y, style = this.defaultHandlePointStyle) {
    const handlePoint = new Path2D();
    handlePoint.arc(x, y, style.radius, 0, 2 * Math.PI);
    this.updateStyle(style);
    this.ctx.fill(handlePoint);
    this.ctx.stroke(handlePoint);
    return handlePoint;
  }

  _getHandlePointStyle () {
    return Object.assign({}, this.handlePointStyle, this.defaultHandlePointStyle);
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

module.exports = Polygon;