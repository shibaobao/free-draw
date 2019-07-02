import Shape from './shape'

import { HANDLE_LINE_STYLE } from './config'

class Ellipse extends Shape {
  constructor (options) {
    super(options)

    this.x = options.x
    this.y = options.y
    this.radiusX = options.radiusX
    this.radiusY = options.radiusY
    this.rotation = options.rotation || 0
    this.startAngle = options.startAngle || 0
    this.endAngle = options.endAngle || 2 * Math.PI
    this.anticlockwise = options.anticlockwise || false

    this.xBackup = null
    this.yBackup = null
    this.radiusXBackup = null
    this.radiusYBackup = null
    this.rotationBackup = null
    this.startAngleBackup = null
    this.endAngleBackup = null
    this.anticlockwiseBackup = null

    this.handleLines = []

    this._initEllipse()
  }

  _initEllipse () {
    this._initShape()
    if (this.x && this.y && this.radiusX && this.radiusY) {
      this._draw()
    }
  }

  _generateHandlePointsByPoints () {
    const { x, y, radiusX, radiusY } = this.getZoomAndMove()
    this.handlePoints[0] = { obj: null, point: [x - radiusX, y - radiusY] }
    this.handlePoints[1] = { obj: null, point: [x + radiusX, y - radiusY] }
    this.handlePoints[2] = { obj: null, point: [x + radiusX, y + radiusY] }
    this.handlePoints[3] = { obj: null, point: [x - radiusX, y + radiusY] }
  }

  _generateHandleLinesByPoints () {
    const { x, y, radiusX, radiusY } = this.getZoomAndMove()
    this.handleLines[0] = { obj: null, startPoint: [x - radiusX, y - radiusY], endPoint: [x + radiusX, y - radiusY] }
    this.handleLines[1] = { obj: null, startPoint: [x + radiusX, y - radiusY], endPoint: [x + radiusX, y + radiusY] }
    this.handleLines[2] = { obj: null, startPoint: [x + radiusX, y + radiusY], endPoint: [x - radiusX, y + radiusY] }
    this.handleLines[3] = { obj: null, startPoint: [x - radiusX, y + radiusY], endPoint: [x - radiusX, y - radiusY] }
  }

  _draw () {
    this.shape = this._drawEllipse()
    this._generateHandleLinesByPoints()
    this._generateHandlePointsByPoints()
    if (this.edit) {
      this._drawEllipseHandleLines()
      this._drawEllipseHandlePoints()
    }
  }

  _drawEllipse () {
    const { x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise } = this.getZoomAndMove()
    const newEllipse = new Path2D()
    newEllipse.ellipse(x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise)
    this.freeDraw._updateCtxStyle(this.shapeStyle)
    this.freeDraw.ctx.fill(newEllipse)
    this.freeDraw.ctx.stroke(newEllipse)
    return newEllipse
  }

  _handleMouseMove (event) {
    let { offsetX: x, offsetY: y } = event
    if (this.clickedHandlePoint) {
      // if (Math.abs(x) > Math.abs(y)) {
      //   y = x
      // } else {
      //   x = y
      // }
      const basePoint = this.handlePoints[this.clickedHandlePointIndex].point
      this.x += (x - basePoint[0]) / 2 * this.freeDraw.zoomLevel
      this.y += (y - basePoint[1]) / 2 * this.freeDraw.zoomLevel
      if (this.clickedHandlePointIndex === 0) {
        this.radiusX += (basePoint[0] - x) / 2 * this.freeDraw.zoomLevel
        this.radiusY += (basePoint[1] - y) / 2 * this.freeDraw.zoomLevel
      } else if (this.clickedHandlePointIndex === 1) {
        this.radiusX += (x - basePoint[0]) / 2 * this.freeDraw.zoomLevel
        this.radiusY += (basePoint[1] - y) / 2 * this.freeDraw.zoomLevel
      } else if (this.clickedHandlePointIndex === 2) {
        this.radiusX += (x - basePoint[0]) / 2 * this.freeDraw.zoomLevel
        this.radiusY += (y - basePoint[1]) / 2 * this.freeDraw.zoomLevel
      } else if (this.clickedHandlePointIndex === 3) {
        this.radiusX += (basePoint[0] - x) / 2 * this.freeDraw.zoomLevel
        this.radiusY += (y - basePoint[1]) / 2 * this.freeDraw.zoomLevel
      }
      if (this.freeDraw.eventsReceive.includes('transform')) {
        this.freeDraw.eventsCallBack(event, this.id, 'transform')
      }
    } else if (this.clickedShape) {
      this.x += (x - this.clickedShapePoint[0]) / this.freeDraw.zoomLevel
      this.y += (y - this.clickedShapePoint[1]) / this.freeDraw.zoomLevel
      this.clickedShapePoint = [x, y]
      if (this.freeDraw.eventsReceive.includes('drag')) {
        this.freeDraw.eventsCallBack(event, this.id, 'drag')
      }
    }
    this._generateHandlePointsByPoints()
    this.freeDraw._refreshShapesInCanvas()
  }

  _drawEllipseHandlePoints () {
    for (let i = 0; i < this.handlePoints.length; i++) {
      this.handlePoints[i].obj = this._drawRectPoint(
        this.handlePoints[i].point[0],
        this.handlePoints[i].point[1],
        this.handlePointStyle.width,
        {
          lineWidth: this.handlePointStyle.lineWidth,
          fillStyle: this.handlePointStyle.fillStyle,
          strokeStyle: this.handlePointStyle.strokeStyle
        }
      )
    }
  }

  _drawEllipseHandleLines () {
    for (let i = 0; i < this.handleLines.length; i++) {
      this.handleLines[i].obj = this._drawLine(this.handleLines[i].startPoint, this.handleLines[i].endPoint, HANDLE_LINE_STYLE)
    }
  }

  getZoomAndMove () {
    let radiusX = this.radiusX * this.freeDraw.zoomLevel
    let radiusY = this.radiusY * this.freeDraw.zoomLevel
    let x = (this.x - this.freeDraw.transformCenter[0]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[0]
    let y = (this.y - this.freeDraw.transformCenter[1]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[1]
    if (this.freeDraw.offsetLeft !== 0) {
      x += this.freeDraw.offsetLeft
    }
    if (this.freeDraw.offsetTop !== 0) {
      y += this.freeDraw.offsetTop
    }
    return {
      x,
      y,
      radiusX,
      radiusY,
      rotation: this.rotation,
      startAngle: this.startAngle,
      endAngle: this.endAngle,
      anticlockwise: this.anticlockwise
    }
  }

  _backupData () {
    this.xBackup = this.x
    this.yBackup = this.y
    this.radiusXBackup = this.radiusX
    this.radiusYBackup = this.radiusY
    this.rotationBackup = this.rotation
    this.startAngleBackup = this.startAngle
    this.endAngleBackup = this.endAngle
    this.anticlockwiseBackup = this.anticlockwise
  }

  _rollbackData () {
    this.x = this.xBackup
    this.y = this.yBackup
    this.radiusX = this.radiusXBackup
    this.radiusY = this.radiusYBackup
    this.rotation = this.rotationBackup
    this.startAngle = this.startAngleBackup
    this.endAngle = this.endAngleBackup
    this.anticlockwise = this.anticlockwiseBackup
  }

  _pointsToPath () {
    this.path = JSON.stringify({
      x: this.x,
      y: this.y,
      radiusX: this.radiusX,
      radiusY: this.radiusY,
      rotation: this.rotation,
      startAngle: this.startAngle,
      endAngle: this.startAngle,
      anticlockwise: this.anticlockwise
    })
  }
}

export default Ellipse
