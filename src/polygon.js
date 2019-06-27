import Shape from './shape'

class Polygon extends Shape {
  constructor (options) {
    super(options)

    this.pointsBackup = []
    this._initPolygon()
  }

  _initPolygon () {
    this._initShape()
    if (this.points.length > 0) {
      this._draw()
    }
  }

  _draw () {
    this.shape = this._drawPolygon()
    this._generateHandlePointsByPoints()
    if (this.edit) {
      this._drawPolygonHandlePoints()
    }
  }

  /**
   * Generate handlepoints by polygon points
   *
   * @memberof Rect
   */
  _generateHandlePointsByPoints () {
    const points = this.getZoomAndMove()
    this.handlePoints = []
    for (let i = 0; i < points.length; i++) {
      this.handlePoints[i] = { obj: null, point: points[i] }
    }
  }

  _drawPolygon () {
    const path = this.getPath()
    const newPath = new Path2D(path)
    this.freeDraw._updateCtxStyle(this.shapeStyle)
    this.freeDraw.ctx.fill(newPath)
    this.freeDraw.ctx.stroke(newPath)
    return newPath
  }

  _drawPolygonHandlePoints () {
    for (let point of this.handlePoints) {
      point.obj = this._drawCirclePoint(
        point.point[0],
        point.point[1],
        this.handlePointStyle.width,
        {
          lineWidth: this.handlePointStyle.lineWidth,
          fillStyle: this.handlePointStyle.fillStyle,
          strokeStyle: this.handlePointStyle.strokeStyle
        }
      )
    }
  }

  _polygonMouseDown (event) {
    const { offsetX: x, offsetY: y } = event
    this.points.push([x, y])
    this.freeDraw._refreshShapesInCanvas()
  }

  _handleKeydown (event) {
    if (this.points.length > 0) {
      this.points.pop()
      this.freeDraw._refreshShapesInCanvas()
    }
  }

  _handleMouseMove (event) {
    const { offsetX: x, offsetY: y } = event
    if (this.clickedHandlePoint) {
      this.points[this.clickedHandlePointIndex] = [x, y]
    } else if (this.clickedShape) {
      const points = []
      for (let point of this.points) {
        points.push([
          point[0] + (x - this.clickedShapePoint[0]) / this.freeDraw.zoomLevel,
          point[1] + (y - this.clickedShapePoint[1]) / this.freeDraw.zoomLevel
        ])
      }
      this.clickedShapePoint = [x, y]
      this.points = points
    }
    this.freeDraw._refreshShapesInCanvas()
  }

  _polygonMouseUp () {}

  getZoomAndMove () {
    const points = []
    for (let i = 0; i < this.points.length; i++) {
      let x = (this.points[i][0] - this.freeDraw.transformCenter[0]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[0]
      let y = (this.points[i][1] - this.freeDraw.transformCenter[1]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[1]
      if (this.freeDraw.offsetLeft !== 0) {
        x += this.freeDraw.offsetLeft
      }
      if (this.freeDraw.offsetTop !== 0) {
        y += this.freeDraw.offsetTop
      }
      points.push([x, y])
    }
    return points
  }

  _backupData () {
    this.pointsBackup = JSON.parse(JSON.stringify(this.points))
  }

  _rollbackData () {
    this.points = JSON.parse(JSON.stringify(this.pointsBackup))
  }

  getPath () {
    return 'M' + this.getZoomAndMove().map(item => item.join(',')).join('L') + 'Z'
  }
}

export default Polygon
