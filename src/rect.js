import Shape from './shape'
import {
  EDIT_SHAPE_STYLE,
  SHAPE_STYLE
} from './config'

class Rect extends Shape {
  constructor (options) {
    super(options)
    this.handlePointsLength = 4

    this.startPoint = options.startPoint || []
    this.width = options.width
    this.height = options.height
    this.points = []
    this.path = ''

    this.clickedShape = false
    this.clickedShapePoint = []
    this.clickedHandlePoint = false

    // use for roll back data when cancel editing
    this.startPointBackup = []
    this.widthBackup = null
    this.heightBackup = null
    this.pointsBackup = []
    this.pathBackup = ''

    this._initRect()
  }

  _initRect () {
    this._initShape()
    if (this.startPoint.length > 0 && this.width && this.height) {
      this._generateHandlePointsByPoints()
      this._draw()
    }
  }

  /**
   * Generate handlepoints by rect points
   *
   * @memberof Rect
   */
  _generateHandlePointsByPoints () {
    const { startPoint, width, height } = this.getZoomAndMoveRect()
    this.handlePoints[0] = { obj: null, point: startPoint }
    this.handlePoints[1] = { obj: null, point: [startPoint[0] + width, startPoint[1]] }
    this.handlePoints[2] = { obj: null, point: [startPoint[0] + width, startPoint[1] + height] }
    this.handlePoints[3] = { obj: null, point: [startPoint[0], startPoint[1] + height] }
  }

  _draw () {
    this._generateHandlePointsByPoints()
    this.shape = this._drawRect()
    if (this.edit) {
      this._drawRectHandlePoints()
    }
  }

  _drawRectHandlePoints () {
    for (let i = 0; i < this.handlePointsLength; i++) {
      this.handlePoints[i].obj = this._drawHandlePoint(
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
    const { startPoint, width, height } = this.getZoomAndMoveRect()
    const newRect = new Path2D()
    newRect.rect(startPoint[0], startPoint[1], width, height)
    this.freeDraw._updateCtxStyle(this.shapeStyle)
    this.freeDraw.ctx.fill(newRect)
    this.freeDraw.ctx.stroke(newRect)
    return newRect
  }

  _handleMouseDown (event) {
    const { offsetX: x, offsetY: y } = event
    if (this._pointInHandlePoints(x, y)) {
      this.clickedHandlePoint = true
      this.clickedShape = false
      this.clickedShapePoint = []
    } else if (this._pointInShape(x, y)) {
      this.clickedShape = true
      this.clickedShapePoint = [x, y]
      this.clickedHandlePoint = false
    }
  }

  _handleMouseMove (event) {
    const { offsetX: x, offsetY: y } = event
    if (this.clickedHandlePoint) {
      const basePoint = this.handlePoints[this.clickedHandlePointIndex].point
      if (this.clickedHandlePointIndex === 0) {
        this.width += (basePoint[0] - x) / this.freeDraw.zoomLevel
        this.height += (basePoint[1] - y) / this.freeDraw.zoomLevel
        this.startPoint = [
          this.startPoint[0] + (x - basePoint[0]) / this.freeDraw.zoomLevel,
          this.startPoint[1] + (y - basePoint[1]) / this.freeDraw.zoomLevel
        ]
      } else if (this.clickedHandlePointIndex === 1) {
        this.width += (x - basePoint[0]) / this.freeDraw.zoomLevel
        this.height += (basePoint[1] - y) / this.freeDraw.zoomLevel
        this.startPoint[1] += (y - basePoint[1]) / this.freeDraw.zoomLevel
      } else if (this.clickedHandlePointIndex === 2) {
        this.width += x - basePoint[0]
        this.height += y - basePoint[1]
      } else if (this.clickedHandlePointIndex === 3) {
        this.width += (basePoint[0] - x) / this.freeDraw.zoomLevel
        this.height += (y - basePoint[1]) / this.freeDraw.zoomLevel
        this.startPoint[0] += (x - basePoint[0]) / this.freeDraw.zoomLevel
      }
    } else if (this.clickedShape) {
      this.startPoint = [
        this.startPoint[0] + (x - this.clickedShapePoint[0]) / this.freeDraw.zoomLevel,
        this.startPoint[1] + (y - this.clickedShapePoint[1]) / this.freeDraw.zoomLevel
      ]
      this.clickedShapePoint = [x, y]
    }
    this._generateHandlePointsByPoints()
    this.freeDraw._refreshShapesInCanvas()
  }

  _handleMouseUp () {
    this.clickedShape = false
    this.clickedHandlePoint = false
    this.clickedShapePoint = []
  }

  _handleClick () {}

  getZoomAndMoveRect () {
    let width = this.width
    let height = this.height
    let x = this.startPoint[0]
    let y = this.startPoint[1]
    width = this.width * this.freeDraw.zoomLevel
    height = this.height * this.freeDraw.zoomLevel
    x = (this.startPoint[0] - this.freeDraw.transformCenter[0]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[0]
    y = (this.startPoint[1] - this.freeDraw.transformCenter[1]) * this.freeDraw.zoomLevel + this.freeDraw.transformCenter[1]
    if (this.freeDraw.offsetLeft !== 0) {
      x += this.freeDraw.offsetLeft
    }
    if (this.freeDraw.offsetTop !== 0) {
      y += this.freeDraw.offsetTop
    }
    return {
      width,
      height,
      startPoint: [x, y]
    }
  }

  pointsToPath () {
    this.points[0] = this.startPoint
    this.points[1] = [this.startPoint[0] + this.width, this.startPoint[1]]
    this.points[2] = [this.startPoint[0] + this.width, this.startPoint[1] + this.height]
    this.points[3] = [this.startPoint[0], this.startPoint[1] + this.height]
    this.path = `M${this.points[0].join(',')}L${this.points[1].join(',')}L${this.points[2].join(',')}L${this.points[3].join(',')}Z`
  }

  /**
   * Use for active shape edit model
   *
   * @returns
   * @memberof Shape
   */
  editShape () {
    this.shapeStyle = EDIT_SHAPE_STYLE
    this.edit = true
    this.active = true
    this.freeDraw._updateModel('edit', this.id)
    this.freeDraw._refreshShapesInCanvas()
    this.backupData()
    return this
  }

  backupData () {
    this.startPointBackup = JSON.parse(JSON.stringify(this.startPoint))
    this.widthBackup = this.width
    this.heightBackup = this.height
    this.pointsBackup = JSON.parse(JSON.stringify(this.points))
    this.pathBackup = this.path
  }

  rollbackData () {
    this.startPoint = JSON.parse(JSON.stringify(this.startPointBackup))
    this.width = this.widthBackup
    this.height = this.heightBackup
    this.points = JSON.parse(JSON.stringify(this.pointsBackup))
    this.path = this.pathBackup
  }

  cancelEdit () {
    // TODO add limit -> can only be called after calling editShape method
    this.shapeStyle = SHAPE_STYLE
    this.edit = false
    this.active = true
    this.freeDraw._updateModel('view')
    this.rollbackData()
    this.freeDraw._refreshShapesInCanvas()
    return this
  }
}

export default Rect
