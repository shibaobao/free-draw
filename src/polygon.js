import Shape from './shape'
import { HANDLE_POINT_CIRCLE_STYLE } from './config'

const KEYCODE_BACKSPACE = 8

class Polygon extends Shape {
  constructor (options) {
    super(options)

    this.temporaryPointsFollow = true

    this.isCreate = true

    this.pointsBackup = []
    this.borderPoints = []

    this.maxPointCount = options.maxPointCount || 50

    this.mouseInHandlePoint = false
    this._initPolygon()
  }

  _initPolygon () {
    this.handlePointStyle = HANDLE_POINT_CIRCLE_STYLE
    this._initShape()
    if (this.points.length > 0) {
      this.isCreate = false
      this.temporaryPointsFollow = false
      this._draw()
      this._backupData()
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
    console.log(this.temporaryPointsFollow)
    if (!this.temporaryPointsFollow) {
      this.freeDraw.ctx.fill(newPath)
    }
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
      if (this.isCreate && this.points.length < this.maxPointCount) {
        this.points.push(this.removePointZoomAndMove([x, y]))
        this.freeDraw.eventsCallBack(event, this.id, 'mouseEnterHandlePoint')
        if (this.points.length < this.maxPointCount) {
          this.temporaryPointsFollow = true
        } else {
          this.temporaryPointsFollow = false
        }
      }
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
          Number((point[0] + (x - this.clickedShapePoint[0]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix)),
          Number((point[1] + (y - this.clickedShapePoint[1]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
        ])
      }
      this.clickedShapePoint = [x, y]
      this.points = points
      if (this.freeDraw.eventsReceive.includes('drag')) {
        this.freeDraw.eventsCallBack(event, this.id, 'drag')
      }
    } else {
      if (this.temporaryPointsFollow) {
        this.temporaryPoints = [this.removePointZoomAndMove([x, y])]
        this.temporaryPointsWithoutZoomAndOffset = [[x, y]]
      }
    }
    this.freeDraw._refreshShapesInCanvas()
    if (this._pointInHandlePoints(x, y)) {
      if (!this.mouseInHandlePoint) {
        this.freeDraw.eventsCallBack(event, this.id, 'mouseEnterHandlePoint')
        this.mouseInHandlePoint = true
      }
    } else {
      if (this.mouseInHandlePoint) {
        this.freeDraw.eventsCallBack(event, this.id, 'mouseLeaveHandlePoint')
      }
      this.mouseInHandlePoint = false
    }
  }

  getZoomAndMove (withTemporaryPoints) {
    const points = []
    let allPoints = this.points
    if (withTemporaryPoints) {
      allPoints = allPoints.concat(this.temporaryPoints)
    }
    for (let i = 0; i < allPoints.length; i++) {
      let x = Number(((allPoints[i][0] - this.freeDraw.transformCenter[0]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[0]).toFixed(this.freeDraw.fix))
      let y = Number(((allPoints[i][1] - this.freeDraw.transformCenter[1]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[1]).toFixed(this.freeDraw.fix))
      if (this.freeDraw.offsetLeft !== 0) {
        x = Number((x + this.freeDraw.offsetLeft).toFixed(this.freeDraw.fix))
      }
      if (this.freeDraw.offsetTop !== 0) {
        y = Number((y + this.freeDraw.offsetTop).toFixed(this.freeDraw.fix))
      }
      points.push([x, y])
    }
    return points
  }

  removePointZoomAndMove ([x, y]) {
    return [
      Number((((x - this.freeDraw.transformCenter[0] - this.freeDraw.offsetLeft) / this.freeDraw.zoomLevel) + this.freeDraw.transformCenter[0]).toFixed(this.freeDraw.fix)),
      Number((((y - this.freeDraw.transformCenter[1] - this.freeDraw.offsetTop) / this.freeDraw.zoomLevel) + this.freeDraw.transformCenter[1]).toFixed(this.freeDraw.fix))
    ]
  }

  _backupData () {
    this.pointsBackup = JSON.parse(JSON.stringify(this.points))
  }

  _rollbackData () {
    this.points = JSON.parse(JSON.stringify(this.pointsBackup))
  }

  getPath () {
    let path = 'M' + this.getZoomAndMove(this.edit === true).map(item => item.join(',')).join('L')
    if (!this.temporaryPointsFollow) {
      path += 'Z'
    }
    return path
  }

  _toSVGPath () {
    this.path = 'M' + this.points.map(item => {
      const x = Number(item[0].toFixed(this.freeDraw.fix))
      const y = Number(item[1].toFixed(this.freeDraw.fix))
      return x + ',' + y
    }).join('L') + 'Z'
    this.SVGPath = `<path d="${this.path}" />`
  }

  getBorderPoint (index) {
    return this.borderPoints[index]
  }
}

export default Polygon
