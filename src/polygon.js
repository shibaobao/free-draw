import Shape from './shape'
import { HANDLE_POINT_CIRCLE_STYLE } from './config'

const KEYCODE_BACKSPACE = 8

class Polygon extends Shape {
  constructor (options) {
    super(options)

    this.temporaryPointsFollow = true

    this.pointsBackup = []
    this.borderPoints = []
    this._initPolygon()
  }

  _initPolygon () {
    this.handlePointStyle = HANDLE_POINT_CIRCLE_STYLE
    this._initShape()
    if (this.points.length > 0) {
      this._draw()
    }
  }

  _draw () {
    this.shape = this._drawPolygon()
    this._generateHandlePointsByPoints()
    this._generateBorderPoints()
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

  _generateBorderPoints () {
    let left, right, top, bottom
    const points = this.getZoomAndMove()
    for (let i = 0; i < points.length; i++) {
      if (left) {
        if (points[i][0] < left) {
          left = points[i][0]
        }
      } else {
        left = points[i][0]
      }
      if (right) {
        if (points[i][0] > right) {
          right = points[i][0]
        }
      } else {
        right = points[i][0]
      }
      if (top) {
        if (points[i][1] < top) {
          top = points[i][1]
        }
      } else {
        top = points[i][1]
      }
      if (bottom) {
        if (points[i][1] > bottom) {
          bottom = points[i][1]
        }
      } else {
        bottom = points[i][1]
      }
    }
    this.borderPoints = [
      [left, top],
      [right, top],
      [right, bottom],
      [left, bottom]
    ]
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
        this.handlePointStyle.radius,
        {
          lineWidth: this.handlePointStyle.lineWidth,
          fillStyle: this.handlePointStyle.fillStyle,
          strokeStyle: this.handlePointStyle.strokeStyle
        }
      )
    }
  }

  _handleKeydown (event) {
    if (this.points.length > 0 && event.keyCode === KEYCODE_BACKSPACE) {
      this.points.pop()
      this.freeDraw._refreshShapesInCanvas()
    }
  }

  _polygonMouseDown (event) {
    const { offsetX: x, offsetY: y } = event
    if (this.clickedHandlePoint) {
      this.temporaryPointsFollow = false
      this.temporaryPoints = []
      this.temporaryPointsWithoutZoomAndOffset = []
    } else {
      this.temporaryPointsFollow = true
      this.points.push(this.removePointZoomAndMove([x, y]))
    }
    this.freeDraw._refreshShapesInCanvas()
  }

  _handleMouseMove (event) {
    const { offsetX: x, offsetY: y } = event
    if (this.clickedHandlePoint) {
      this.points[this.clickedHandlePointIndex] = this.removePointZoomAndMove([x, y])
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
    } else {
      if (this.temporaryPointsFollow) {
        this.temporaryPoints = [this.removePointZoomAndMove([x, y])]
        this.temporaryPointsWithoutZoomAndOffset = [[x, y]]
      }
    }
    this.freeDraw._refreshShapesInCanvas()
  }

  getZoomAndMove (withTemporaryPoints) {
    const points = []
    let allPoints = this.points
    if (withTemporaryPoints) {
      allPoints = allPoints.concat(this.temporaryPoints)
    }
    for (let i = 0; i < allPoints.length; i++) {
      let x = (allPoints[i][0] - this.freeDraw.transformCenter[0]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[0]
      let y = (allPoints[i][1] - this.freeDraw.transformCenter[1]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[1]
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

  removePointZoomAndMove ([x, y]) {
    return [
      ((x - this.freeDraw.transformCenter[0] - this.freeDraw.offsetLeft) / this.freeDraw.zoomLevel) + this.freeDraw.transformCenter[0],
      ((y - this.freeDraw.transformCenter[1] - this.freeDraw.offsetTop) / this.freeDraw.zoomLevel) + this.freeDraw.transformCenter[1]
    ]
  }

  _backupData () {
    this.pointsBackup = JSON.parse(JSON.stringify(this.points))
  }

  _rollbackData () {
    this.points = JSON.parse(JSON.stringify(this.pointsBackup))
  }

  getPath () {
    return 'M' + this.getZoomAndMove(true).map(item => item.join(',')).join('L') + 'Z'
  }

  _pointsToPath () {
    this.path = 'M' + this.points.map(item => item.join(',')).join('L') + 'Z'
  }

  getBorderPoint (index) {
    return this.borderPoints[index]
  }
}

export default Polygon
