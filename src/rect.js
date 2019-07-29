import Shape from './shape'

class Rect extends Shape {
  constructor (options) {
    super(options)

    this.startPoint = [Number(options.startPoint[0].toFixed(this.freeDraw.fix)), Number(options.startPoint[1].toFixed(this.freeDraw.fix))]
    this.width = Number(options.width.toFixed(this.freeDraw.fix))
    this.height = Number(options.height.toFixed(this.freeDraw.fix))

    // use for roll back data when cancel editing
    this.startPointBackup = []
    this.widthBackup = null
    this.heightBackup = null
    this.pointsBackup = []

    this._initRect()
  }

  _initRect () {
    this._initShape()
    if (this.startPoint.length > 0 && this.width && this.height) {
      this._draw()
      this._backupData()
    }
  }

  _draw () {
    this._generateHandlePointsByPoints()
    this.shape = this._drawRect()
    if (this.edit) {
      this._drawRectHandlePoints()
    }
  }

  /**
   * Generate handlepoints by rect points
   *
   * @memberof Rect
   */
  _generateHandlePointsByPoints () {
    const { startPoint, width, height } = this.getZoomAndMove()
    this.handlePoints[0] = { obj: null, point: startPoint }
    this.handlePoints[1] = { obj: null, point: [startPoint[0] + width, startPoint[1]] }
    this.handlePoints[2] = { obj: null, point: [startPoint[0] + width, startPoint[1] + height] }
    this.handlePoints[3] = { obj: null, point: [startPoint[0], startPoint[1] + height] }
  }

  _drawRectHandlePoints () {
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

  _drawRect () {
    const { startPoint, width, height } = this.getZoomAndMove()
    const newRect = new Path2D()
    newRect.rect(startPoint[0], startPoint[1], width, height)
    this.freeDraw._updateCtxStyle(this.shapeStyle)
    this.freeDraw.ctx.fill(newRect)
    this.freeDraw.ctx.stroke(newRect)
    return newRect
  }

  _handleMouseMove (event) {
    const { offsetX: x, offsetY: y } = event
    if (this.clickedHandlePoint) {
      const basePoint = this.handlePoints[this.clickedHandlePointIndex].point
      if (this.clickedHandlePointIndex === 0) {
        this.width = Number((this.width + (basePoint[0] - x) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
        this.height = Number((this.height + (basePoint[1] - y) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
        this.startPoint = [
          Number((this.startPoint[0] + (x - basePoint[0]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix)),
          Number((this.startPoint[1] + (y - basePoint[1]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
        ]
      } else if (this.clickedHandlePointIndex === 1) {
        this.width = Number((this.width + (x - basePoint[0]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
        this.height = Number((this.height + (basePoint[1] - y) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
        this.startPoint[1] = Number((this.startPoint[1] + (y - basePoint[1]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
      } else if (this.clickedHandlePointIndex === 2) {
        this.width = Number((this.width + (x - basePoint[0]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
        this.height = Number((this.height + (y - basePoint[1]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
      } else if (this.clickedHandlePointIndex === 3) {
        this.width = Number((this.width + (basePoint[0] - x) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
        this.height = Number((this.height + (y - basePoint[1]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
        this.startPoint[0] = Number((this.startPoint[0] + (x - basePoint[0]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
      }
      if (this.freeDraw.eventsReceive.includes('transform')) {
        this.freeDraw.eventsCallBack(event, this.id, 'transform')
      }
      this.freeDraw._refreshShapesInCanvas()
    } else if (this.clickedShape) {
      this.startPoint = [
        Number((this.startPoint[0] + (x - this.clickedShapePoint[0]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix)),
        Number((this.startPoint[1] + (y - this.clickedShapePoint[1]) / this.freeDraw.zoomLevel).toFixed(this.freeDraw.fix))
      ]
      this.clickedShapePoint = [x, y]
      if (this.freeDraw.eventsReceive.includes('drag')) {
        this.freeDraw.eventsCallBack(event, this.id, 'drag')
      }
      this.freeDraw._refreshShapesInCanvas()
    }
  }

  getZoomAndMove () {
    let width = this.width
    let height = this.height
    width = this.width * this.freeDraw.zoomLevel
    height = this.height * this.freeDraw.zoomLevel
    let x = Number(((this.startPoint[0] - this.freeDraw.transformCenter[0]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[0]).toFixed(this.freeDraw.fix))
    let y = Number(((this.startPoint[1] - this.freeDraw.transformCenter[1]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[1]).toFixed(this.freeDraw.fix))
    if (this.freeDraw.offsetLeft !== 0) {
      x = Number((x + this.freeDraw.offsetLeft).toFixed(this.freeDraw.fix))
    }
    if (this.freeDraw.offsetTop !== 0) {
      y = Number((y + this.freeDraw.offsetTop).toFixed(this.freeDraw.fix))
    }
    return {
      width,
      height,
      startPoint: [x, y]
    }
  }
  
  _toSVGPath () {
    const fix = this.freeDraw.fix
    this.points[0] = [Number(this.startPoint[0].toFixed(fix)), Number(this.startPoint[1].toFixed(fix))]
    this.points[1] = [Number((this.startPoint[0] + this.width).toFixed(fix)), Number(this.startPoint[1].toFixed(fix))]
    this.points[2] = [Number((this.startPoint[0] + this.width).toFixed(fix)), Number((this.startPoint[1] + this.height).toFixed(fix))]
    this.points[3] = [Number((this.startPoint[0]).toFixed(fix)), Number((this.startPoint[1] + this.height).toFixed(fix))]
    this.path = `M${this.points[0].join(',')}L${this.points[1].join(',')}L${this.points[2].join(',')}L${this.points[3].join(',')}Z`
    this.SVGPath = `<path d="${this.path}" />`
  }

  _backupData () {
    this.startPointBackup = JSON.parse(JSON.stringify(this.startPoint))
    this.widthBackup = this.width
    this.heightBackup = this.height
    this.pointsBackup = JSON.parse(JSON.stringify(this.points))
  }

  _rollbackData () {
    this.startPoint = JSON.parse(JSON.stringify(this.startPointBackup))
    this.width = this.widthBackup
    this.height = this.heightBackup
    this.points = JSON.parse(JSON.stringify(this.pointsBackup))
  }

  getHandlePointCoordinate (handlePointIndex) {
    if (this.handlePoints[handlePointIndex]) {
      return this.handlePoints[handlePointIndex].point
    }
    return null
  }
}

export default Rect
