const Tool = require('./tool');
const Basic = require('./basic');

class Polygon extends Basic {
  constructor (options) {
    super(options);
    this.initPolygon();
  }

  initPolygon () {
    if (this.points.length > 0) {
      // TODO generate handle points with points
    }
  }

  refreshShape () {
    const path = Tool.pointsToSVGPath(this.points);
    this.shapeObject = this.drawPath(path, Object.assign({}, this.defaultStyle, this.style));
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

  _getHandlePointStyle () {
    return Object.assign({}, this.handlePointStyle, this.defaultHandlePointStyle);
  }
}

module.exports = Polygon;