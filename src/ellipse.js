import Shape from './shape'

import { HANDLE_LINE_STYLE } from './config'

class Ellipse extends Shape {
  constructor (options) {
    super(options)

    this.x = Number(options.x.toFixed(this.freeDraw.fix))
    this.y = Number(options.y.toFixed(this.freeDraw.fix))
    this.radiusX = Number(options.radiusX.toFixed(this.freeDraw.fix))
    this.radiusY = Number(options.radiusY.toFixed(this.freeDraw.fix))
    this.rotation = options.rotation || 0
    this.startAngle = options.startAngle || 0
    this.endAngle = options.endAngle || 2 * Math.PI
    this.anticlockwise = options.anticlockwise || false

    this.xBackup = null
    this.yBackup = null
    this.radiusXBackup = null
    this.radiusYBackup = null
    this.rotateAngleBackup = null
    this.startAngleBackup = null
    this.endAngleBackup = null
    this.anticlockwiseBackup = null

    this.handleLines = []
    this.rotationHandleLine = null

    this._initEllipse()
  }

  _initEllipse () {
    this._initShape()
    if (this.x && this.y && this.radiusX && this.radiusY) {
      this._draw()
      this._backupData()
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


  _generateRotationHandlePointsAndLine () {
    const center = [
      (this.handlePoints[0].point[0] + this.handlePoints[2].point[0]) / 2,
      (this.handlePoints[0].point[1] + this.handlePoints[2].point[1]) / 2,
    ]
    const shapeHeight = this._distance(
      this.handlePoints[0].point[0],
      this.handlePoints[0].point[1],
      this.handlePoints[3].point[0],
      this.handlePoints[3].point[1],
    )
    this.rotationHandlePoint = {
      obj: null,
      point: [
        center[0] - (shapeHeight / 2 + 20) * Math.cos(this._toArc(this.rotateAngle)),
        center[1] - (shapeHeight / 2 + 20) * Math.sin(this._toArc (this.rotateAngle)),
      ],
    }
    this.rotationHandleLine = {
      obj: null,
      startPoint: center,
      endPoint: [
        center[0] - (shapeHeight / 2 + 20) * Math.cos(this._toArc(this.rotateAngle)),
        center[1] - (shapeHeight / 2 + 20) * Math.sin(this._toArc (this.rotateAngle)),
      ],
    }
  }

  _draw () {
    this.shape = this._drawEllipse()
    this._generateHandleLinesByPoints()
    this._generateHandlePointsByPoints()
    this._generateRotationHandlePointsAndLine()
    if (this.edit) {
      this._drawEllipseHandleLines()
      this._drawEllipseHandlePoints()
      this._drawEllipseRotationHandleLine()
      this._drawEllipseRotationHandlePoint()
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
      const ratio = this.radiusY / this.radiusX
      const basePoint = this.handlePoints[this.clickedHandlePointIndex].point
      if ([0, 1, 2, 3].includes(this.clickedHandlePointIndex)) {
        let radiusX, radiusY, centerX, centerY

        if (this.clickedHandlePointIndex === 0) {
          radiusX = basePoint[0] - x
          radiusY = ratio * radiusX
          // radiusY = basePoint[1] - y
          radiusX = this.radiusX + parseInt(radiusX / this.freeDraw.zoomLevel)
          radiusY = this.radiusY + parseInt(radiusY / this.freeDraw.zoomLevel)
          centerX = this.x - (radiusX - this.radiusX)
          centerY = this.y - (radiusY - this.radiusY)
        }
        if (this.clickedHandlePointIndex === 1) {
          radiusX = x - basePoint[0]
          radiusY = ratio * radiusX
          // radiusY = basePoint[1] - y
          radiusX = this.radiusX + parseInt(radiusX / this.freeDraw.zoomLevel)
          radiusY = this.radiusY + parseInt(radiusY / this.freeDraw.zoomLevel)
          centerX = this.x + (radiusX - this.radiusX)
          centerY = this.y - (radiusY - this.radiusY)
        }
        if (this.clickedHandlePointIndex === 2) {
          radiusX = x - basePoint[0]
          radiusY = ratio * radiusX
          // radiusY = y - basePoint[1]
          radiusX = this.radiusX + parseInt(radiusX / this.freeDraw.zoomLevel)
          radiusY = this.radiusY + parseInt(radiusY / this.freeDraw.zoomLevel)
          centerX = this.x + (radiusX - this.radiusX)
          centerY = this.y + (radiusY - this.radiusY)
        }
        if (this.clickedHandlePointIndex === 3) {
          radiusX = basePoint[0] - x
          radiusY = ratio * radiusX
          // radiusY = y - basePoint[1]
          radiusX = this.radiusX + parseInt(radiusX / this.freeDraw.zoomLevel)
          radiusY = this.radiusY + parseInt(radiusY / this.freeDraw.zoomLevel)
          centerX = this.x - (radiusX - this.radiusX)
          centerY = this.y + (radiusY - this.radiusY)
        }
        if (radiusX > 0 && radiusY > 0) {
          this.radiusX = Number(radiusX.toFixed(this.freeDraw.fix))
          this.radiusY = Number(radiusY.toFixed(this.freeDraw.fix))
          this.x = centerX;
          this.y = centerY;
        }
      }
      if (this.freeDraw.eventsReceive.includes('transform')) {
        this.freeDraw.eventsCallBack(event, this.id, 'transform')
      }
    } else if (this.clickedShape) {
      this.x = Number((this.x + (x - this.clickedShapePoint[0]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
      this.y = Number((this.y + (y - this.clickedShapePoint[1]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
      this.clickedShapePoint = [Number(x.toFixed(this.freeDraw.fix)), Number(y.toFixed(this.freeDraw.fix))]
      if (this.freeDraw.eventsReceive.includes('drag')) {
        this.freeDraw.eventsCallBack(event, this.id, 'drag')
      }
    }
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

  _drawEllipseRotationHandlePoint() {
    this.rotationHandlePoint.obj = this._drawCirclePoint(
      this.rotationHandlePoint.point[0],
      this.rotationHandlePoint.point[1],      
      this.rotationHandlePointStyle.radius,
      {
        fillStyle: this.rotationHandlePointStyle.fillStyle,
      }
    )
  }

  _drawEllipseHandleLines () {
    for (let i = 0; i < this.handleLines.length; i++) {
      this.handleLines[i].obj = this._drawLine(this.handleLines[i].startPoint, this.handleLines[i].endPoint, HANDLE_LINE_STYLE)
    }
  }

  _drawEllipseRotationHandleLine() {
    this.rotationHandleLine.obj = this._drawLine(
      this.rotationHandleLine.startPoint, this.rotationHandleLine.endPoint, 
      HANDLE_LINE_STYLE
    )
  }

  getZoomAndMove () {
    let radiusX = Number((this.radiusX * this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
    let radiusY = Number((this.radiusY * this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
    let x = (this.x - this.freeDraw.transformCenter[0]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[0]
    let y = (this.y - this.freeDraw.transformCenter[1]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[1]
    if (this.freeDraw.offsetLeft !== 0) {
      x += this.freeDraw.offsetLeft
    }
    if (this.freeDraw.offsetTop !== 0) {
      y += this.freeDraw.offsetTop
    }
    return {
      x: Number(x.toFixed(this.freeDraw.fix)),
      y: Number(y.toFixed(this.freeDraw.fix)),
      radiusX,
      radiusY,
      rotateAngle: this.rotateAngle,
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
    this.rotateAngleBackup = this.rotateAngle
    this.startAngleBackup = this.startAngle
    this.endAngleBackup = this.endAngle
    this.anticlockwiseBackup = this.anticlockwise
  }

  _rollbackData () {
    this.x = this.xBackup
    this.y = this.yBackup
    this.radiusX = this.radiusXBackup
    this.radiusY = this.radiusYBackup
    this.rotateAngle = this.rotateAngleBackup
    this.startAngle = this.startAngleBackup
    this.endAngle = this.endAngleBackup
    this.anticlockwise = this.anticlockwiseBackup
  }

  _toSVGPath () {
    const x = Number(this.x.toFixed(this.freeDraw.fix))
    const y = Number(this.y.toFixed(this.freeDraw.fix))
    const radiusX = Number(this.radiusX.toFixed(this.freeDraw.fix))
    const radiusY = Number(this.radiusY.toFixed(this.freeDraw.fix))
    this.SVGPath = `<ellipse cx="${x}" cy="${y}" rx="${radiusX}" ry="${radiusY}" />`
  }

  _toJSONString () {
    this.JSONString = JSON.stringify({
      x: Number(this.x.toFixed(this.freeDraw.fix)),
      y: Number(this.y.toFixed(this.freeDraw.fix)),
      radiusX: Number(this.radiusX.toFixed(this.freeDraw.fix)),
      radiusY: Number(this.radiusY.toFixed(this.freeDraw.fix))
    })
  }

  getHandlePointCoordinate (handlePointIndex) {
    if (this.handlePoints[handlePointIndex]) {
      return this.handlePoints[handlePointIndex].point
    }
    return null
  }
}

export default Ellipse
