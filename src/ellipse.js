import Shape from './shape'

import { HANDLE_LINE_STYLE } from './config'
import utils from './utils'

class Ellipse extends Shape {
  constructor(options) {
    super(options)

    this.x = Number(options.x.toFixed(this.freeDraw.fix))
    this.y = Number(options.y.toFixed(this.freeDraw.fix))
    this.radiusX = Number(options.radiusX.toFixed(this.freeDraw.fix))
    this.radiusY = Number(options.radiusY.toFixed(this.freeDraw.fix))

    this.arcBetweenRadius = Math.atan(this.radiusY / this.radiusX)
    this.distanceBetweenPointAndCenter = Math.sqrt(this.radiusX ** 2 + this.radiusY ** 2)

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

  _initEllipse() {
    this._initShape()
    if (this.x && this.y && this.radiusX && this.radiusY) {
      this._draw()
      this._backupData()
    }
  }

  _generateHandlePointsByPoints() {
    const { x, y, radiusX, radiusY } = this.getZoomAndMove()
    const d = this.distanceBetweenPointAndCenter * this.freeDraw.zoomLevel
    const deltaArc02 = Math.abs(this.rotation - this.arcBetweenRadius)
    const deltaArc13 = Math.abs(this.rotation + this.arcBetweenRadius)
    this.handlePoints[0] = {
      obj: null,
      point: [x - d * Math.cos(deltaArc02), y - d * Math.sin(deltaArc02)]
    }
    this.handlePoints[1] = {
      obj: null,
      point: [x + d * Math.cos(deltaArc13), y - d * Math.sin(deltaArc13)]
    }
    this.handlePoints[2] = {
      obj: null,
      point: [x + d * Math.cos(deltaArc02), y + d * Math.sin(deltaArc02)]
    }
    this.handlePoints[3] = {
      obj: null,
      point: [x - d * Math.cos(deltaArc13), y + d * Math.sin(deltaArc13)]
    }
    // this.handlePoints[0] = {
    //   obj: null,
    //   point: [x - radiusX, y - radiusY]
    // }
    // this.handlePoints[1] = {
    //   obj: null,
    //   point: [x + radiusX, y - radiusY]
    // }
    // this.handlePoints[2] = {
    //   obj: null,
    //   point: [x + radiusX, y + radiusY]
    // }
    // this.handlePoints[3] = {
    //   obj: null,
    //   point: [x - radiusX, y + radiusY]
    // }
  }

  _generateHandleLinesByPoints() {
    const { x, y, radiusX, radiusY } = this.getZoomAndMove()
    const d = this.distanceBetweenPointAndCenter * this.freeDraw.zoomLevel
    const deltaArc02 = Math.abs(this.rotation - this.arcBetweenRadius)
    const deltaArc13 = Math.abs(this.rotation + this.arcBetweenRadius)
    this.handleLines[0] = {
      obj: null,
      startPoint: [x - d * Math.cos(deltaArc02), y - d * Math.sin(deltaArc02)],
      endPoint: [x + d * Math.cos(deltaArc13), y - d * Math.sin(deltaArc13)]
    }
    this.handleLines[1] = {
      obj: null,
      startPoint: [x + d * Math.cos(deltaArc13), y - d * Math.sin(deltaArc13)],
      endPoint: [x + d * Math.cos(deltaArc02), y + d * Math.sin(deltaArc02)]
    }
    this.handleLines[2] = {
      obj: null,
      startPoint: [x + d * Math.cos(deltaArc02), y + d * Math.sin(deltaArc02)],
      endPoint: [x - d * Math.cos(deltaArc13), y + d * Math.sin(deltaArc13)]
    }
    this.handleLines[3] = {
      obj: null,
      startPoint: [x - d * Math.cos(deltaArc13), y + d * Math.sin(deltaArc13)],
      endPoint: [x - d * Math.cos(deltaArc02), y - d * Math.sin(deltaArc02)]
    }
    // this.handleLines[0] = {
    //   obj: null,
    //   startPoint: [x - radiusX, y - radiusY],
    //   endPoint: [x + radiusX, y - radiusY]
    // }
    // this.handleLines[1] = {
    //   obj: null,
    //   startPoint: [x + radiusX, y - radiusY],
    //   endPoint: [x + radiusX, y + radiusY]
    // }
    // this.handleLines[2] = {
    //   obj: null,
    //   startPoint: [x + radiusX, y + radiusY],
    //   endPoint: [x - radiusX, y + radiusY]
    // }
    // this.handleLines[3] = {
    //   obj: null,
    //   startPoint: [x - radiusX, y + radiusY],
    //   endPoint: [x - radiusX, y - radiusY]
    // }
  }

  _draw() {
    this._generateHandleLinesByPoints()
    this._generateHandlePointsByPoints()

    this.shape = this._drawEllipse()
    if (this.edit) {
      this._drawEllipseHandleLines()
      this._drawEllipseHandlePoints()
    }
  }

  _drawEllipse() {
    const {
      x,
      y,
      radiusX,
      radiusY,
      startAngle,
      rotation,
      endAngle,
      anticlockwise
    } = this.getZoomAndMove()
    const newEllipse = new Path2D()
    newEllipse.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
    this.freeDraw._updateCtxStyle(this.shapeStyle)
    this.freeDraw.ctx.fill(newEllipse)
    this.freeDraw.ctx.stroke(newEllipse)

    return newEllipse
  }

  _drawEllipseHandlePoints() {
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

  _drawEllipseHandleLines() {
    for (let i = 0; i < this.handleLines.length; i++) {
      this.handleLines[i].obj = this._drawLine(
        this.handleLines[i].startPoint,
        this.handleLines[i].endPoint,
        HANDLE_LINE_STYLE
      )
    }
  }

  getZoomAndMove() {
    let radiusX = Number((this.radiusX * this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
    let radiusY = Number((this.radiusY * this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
    let x =
      (this.x - this.freeDraw.transformCenter[0]) * this.freeDraw.zoomLevel +
      this.freeDraw.transformCenter[0]
    let y =
      (this.y - this.freeDraw.transformCenter[1]) * this.freeDraw.zoomLevel +
      this.freeDraw.transformCenter[1]
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
      rotation: this.rotation,
      startAngle: this.startAngle,
      endAngle: this.endAngle,
      anticlockwise: this.anticlockwise
    }
  }

  getRealCenterPoint() {
    return [
      (this.handlePoints[0].point[0] + this.handlePoints[2].point[0]) / 2,
      (this.handlePoints[0].point[1] + this.handlePoints[2].point[1]) / 2
    ]
  }

  _handleMouseMove(event) {
    this._changeCursorStyle(event)

    let { offsetX: x, offsetY: y } = event
    if (this.clickedHandlePoint) {
      if (!this.freeDraw.inRotation) {
        const basePoint = this.handlePoints[this.clickedHandlePointIndex].point
        const direction = [[-1, -1], [1, -1], [1, 1], [-1, 1]]
        if ([0, 1, 2, 3].includes(this.clickedHandlePointIndex)) {
          const offsetX = (x - basePoint[0]) / this.freeDraw.zoomLevel
          const centerX = this.x + offsetX / 2
          let offsetY, centerY
          let radiusX, radiusY

          if (this.transformMode === 'ratio') {
            const ratio = this.radiusY / this.radiusX
            offsetY = offsetX * ratio
            if (this.clickedHandlePointIndex === 1 || this.clickedHandlePointIndex === 3) {
              offsetY = -offsetY
            }
          } else if (this.transformMode === 'free') {
            offsetY = (y - basePoint[1]) / this.freeDraw.zoomLevel
          }

          centerY = this.y + offsetY / 2
          radiusX = this.radiusX + (direction[this.clickedHandlePointIndex][0] * offsetX) / 2
          radiusY = this.radiusY + (direction[this.clickedHandlePointIndex][1] * offsetY) / 2

          if (radiusX > 0 && radiusY > 0) {
            this.radiusX = Number(radiusX.toFixed(this.freeDraw.fix))
            this.radiusY = Number(radiusY.toFixed(this.freeDraw.fix))
            this.x = centerX
            this.y = centerY
            this.arcBetweenRadius = Math.atan(this.radiusY / this.radiusX)
            this.distanceBetweenPointAndCenter = Math.sqrt(this.radiusX ** 2 + this.radiusY ** 2)
          }
        }
      } else {
        const realCenterPoint = this.getRealCenterPoint()
        const angle = utils.arcBetweenSegment(
          realCenterPoint,
          this.handlePoints[this.clickedHandlePointIndex].point,
          realCenterPoint,
          [x, y]
        )
        this.rotation = angle
      }

      if (this.freeDraw.eventsReceive.includes('transform')) {
        this.freeDraw.eventsCallBack(event, this.id, 'transform')
      }
    } else if (this.clickedHandleLine) {
      const baseLine = this.handleLines[this.clickedHandleLineIndex]
      if ([0, 1, 2, 3].includes(this.clickedHandleLineIndex)) {
        let offsetX = (x - baseLine.startPoint[0]) / this.freeDraw.zoomLevel
        let offsetY = (y - baseLine.startPoint[1]) / this.freeDraw.zoomLevel
        let centerX = this.x
        let centerY = this.y
        let { radiusX, radiusY } = this

        if (this.clickedHandleLineIndex === 0) {
          offsetX = 0
          centerY = this.y + offsetY / 2
          radiusY = this.radiusY - offsetY / 2
        }

        if (this.clickedHandleLineIndex === 1) {
          offsetY = 0
          centerX = this.x + offsetX / 2
          radiusX = this.radiusX + offsetX / 2
        }

        if (this.clickedHandleLineIndex === 2) {
          offsetX = 0
          centerY = this.y + offsetY / 2
          radiusY = this.radiusY + offsetY / 2
        }

        if (this.clickedHandleLineIndex === 3) {
          offsetY = 0
          centerX = this.x + offsetX / 2
          radiusX = this.radiusX - offsetX / 2
        }

        if (radiusX > 0 && radiusY > 0) {
          this.radiusX = Number(radiusX.toFixed(this.freeDraw.fix))
          this.radiusY = Number(radiusY.toFixed(this.freeDraw.fix))
          this.x = centerX
          this.y = centerY
          this.arcBetweenRadius = Math.atan(this.radiusY / this.radiusX)
          this.distanceBetweenPointAndCenter = Math.sqrt(this.radiusX ** 2 + this.radiusY ** 2)
        }
      }
      if (this.freeDraw.eventsReceive.includes('transform')) {
        this.freeDraw.eventsCallBack(event, this.id, 'transform')
      }
    } else if (this.clickedShape) {
      this.x = Number(
        (this.x + (x - this.clickedShapePoint[0]) / this.freeDraw.zoomLevel).toFixed(
          this.freeDraw.fix
        )
      )
      this.y = Number(
        (this.y + (y - this.clickedShapePoint[1]) / this.freeDraw.zoomLevel).toFixed(
          this.freeDraw.fix
        )
      )
      this.clickedShapePoint = [
        Number(x.toFixed(this.freeDraw.fix)),
        Number(y.toFixed(this.freeDraw.fix))
      ]
      if (this.freeDraw.eventsReceive.includes('drag')) {
        this.freeDraw.eventsCallBack(event, this.id, 'drag')
      }
    }
    this.freeDraw._refreshShapesInCanvas()
  }

  _backupData() {
    this.xBackup = this.x
    this.yBackup = this.y
    this.radiusXBackup = this.radiusX
    this.radiusYBackup = this.radiusY
    this.rotationBackup = this.rotation
    this.startAngleBackup = this.startAngle
    this.endAngleBackup = this.endAngle
    this.anticlockwiseBackup = this.anticlockwise
  }

  _rollbackData() {
    this.x = this.xBackup
    this.y = this.yBackup
    this.radiusX = this.radiusXBackup
    this.radiusY = this.radiusYBackup
    this.rotation = this.rotationBackup
    this.startAngle = this.startAngleBackup
    this.endAngle = this.endAngleBackup
    this.anticlockwise = this.anticlockwiseBackup
  }

  _toSVGPath() {
    const x = Number(this.x.toFixed(this.freeDraw.fix))
    const y = Number(this.y.toFixed(this.freeDraw.fix))
    const radiusX = Number(this.radiusX.toFixed(this.freeDraw.fix))
    const radiusY = Number(this.radiusY.toFixed(this.freeDraw.fix))
    this.SVGPath = `<ellipse cx="${x}" cy="${y}" rx="${radiusX}" ry="${radiusY}" />`
  }

  _toJSONString() {
    this.JSONString = JSON.stringify({
      x: Number(this.x.toFixed(this.freeDraw.fix)),
      y: Number(this.y.toFixed(this.freeDraw.fix)),
      radiusX: Number(this.radiusX.toFixed(this.freeDraw.fix)),
      radiusY: Number(this.radiusY.toFixed(this.freeDraw.fix))
    })
  }

  getHandlePointCoordinate(handlePointIndex) {
    if (this.handlePoints[handlePointIndex]) {
      return this.handlePoints[handlePointIndex].point
    }
    return null
  }
}

export default Ellipse
