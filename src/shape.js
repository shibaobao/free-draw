import {
  HANDLE_POINT_STYLE,
  EDIT_SHAPE_STYLE,
  HANDLE_POINT_CIRCLE_STYLE,
  SHAPE_STYLE
} from './config'

class Shape {
  constructor (options) {
    // Shape id
    this.id = options.id

    // Shape type rect/polygon
    this.type = options.type

    // Shape edit status, if current shape is editing
    this.edit = options.edit || true

    // Shape points
    this.points = options.points || []
    this.temporaryPoints = []
    this.temporaryPointsWithoutZoomAndOffset = []

    // Rotate Angle
    this.rotateAngle = options.rotateAngle || 90

    // Shape path
    this.path = options.path || ''

    this.SVGPath = ''

    // Shape handle points
    this.handlePoints = []

    // Shape rotation handle point
    this.rotationHandlePoint = {}

    // Record index if handlepoint clicked
    this.clickedHandlePointIndex = null

    this.clickedShape = false
    this.clickedShapePoint = []
    this.clickedHandlePoint = false

    // Record index if handleLine clicked
    this.clickedHandleLineIndex = null

    // FreeDraw instance reference
    this.freeDraw = options.freeDraw

    // Handle points style
    this.handlePointStyle = options.handlePointStyle

    this.rotationHandlePointStyle = options.rotationHandlePointStyle

    // Shape style
    this.shapeStyle = options.shapeStyle

    // Shape Object, Path/Rect
    this.shape = null

    this.clickTime = null

    // Transform mode: free / ratio
    this.transformMode = 'free'
  }

  /**
   * Initialize the shape configuration
   *
   * @memberof Shape
   */
  _initShape () {
    // Set default style for shaape
    if (!this.handlePointStyle) {
      this.handlePointStyle = HANDLE_POINT_STYLE
    }
    if (!this.shapeStyle) {
      this.shapeStyle = EDIT_SHAPE_STYLE
    }
    if (!this.rotationHandlePointStyle) {
      this.rotationHandlePointStyle = HANDLE_POINT_CIRCLE_STYLE
    }
  }

  /**
   * Handle events
   *
   * @param {Object} event
   * @memberof Shape
   */
  _trigger (event) {
    const { type } = event
    switch (type) {
      case 'mousedown':
        if (this._handleMouseDown && typeof this._handleMouseDown === 'function') {
          this._handleMouseDown(event)
        }
        break
      case 'mousemove':
        if (this._handleMouseMove && typeof this._handleMouseMove === 'function') {
          this._handleMouseMove(event)
        }
        break
      case 'mouseup':
        if (this._handleMouseUp && typeof this._handleMouseUp === 'function') {
          this._handleMouseUp(event)
        }
        break
      case 'keydown':
        if (this._handleKeydown && typeof this._handleKeydown === 'function') {
          this._handleKeydown(event)
        }
        break
    }
  }

  /**
   * Draw Rect Point
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} length
   * @param {Object} style
   * @returns
   * @memberof Shape
   */
  _drawRectPoint (x, y, length, style) {
    const handlePoint = new Path2D()
    handlePoint.rect(x - length / 2, y - length / 2, length, length)
    this.freeDraw._updateCtxStyle(style)
    this.freeDraw.ctx.fill(handlePoint)
    this.freeDraw.ctx.stroke(handlePoint)
    return handlePoint
  }

  /**
   * Draw line
   * @param {*} startPoint 
   * @param {*} endPoint 
   */
  _drawLine (startPoint, endPoint, style) {
    const path = `M${startPoint[0]},${startPoint[1]}L${endPoint[0]},${endPoint[1]}`
    const newPath = new Path2D(path)
    this.freeDraw._updateCtxStyle(style)
    this.freeDraw.ctx.fill(newPath)
    this.freeDraw.ctx.stroke(newPath)
    this.freeDraw.ctx.closePath()
    return newPath
  }

  /**
   * Draw Circle Point
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   * @param {Object} style
   * @returns
   * @memberof Shape
   */
  _drawCirclePoint (x, y, radius, style) {
    const handlePoint = new Path2D()
    handlePoint.arc(x, y, radius, 0, 2 * Math.PI, false)
    this.freeDraw._updateCtxStyle(style)
    this.freeDraw.ctx.fill(handlePoint)
    this.freeDraw.ctx.stroke(handlePoint)
    return handlePoint
  }

  _includes (x, y) {
    return this._pointInHandlePoints(x, y) || this._pointInShape(x, y)
  }

  _distance (x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
  }

  _toArc (angle) {
    return (angle / 360) * Math.PI * 2
  }

  
  _handleMouseDown (event) {
    const { offsetX: x, offsetY: y } = event
    if (this._pointInHandlePoints(x, y)) {
      this.clickedHandlePoint = true
      this.clickedHandleLine = false
      this.clickedShapePoint = []
      this.clickedShape = false
      if (this.type === 'polygon') {
        this._polygonMouseDown(event)
      }
    } else if (this.type === 'ellipse' && this._pointInHandleLines(x, y)) {
      this.clickedHandleLine = true
      this.clickedHandlePoint = false
      this.clickedShapePoint = []
      this.clickedShape = false
    } else if (this._pointInShape(x, y)) {
      this.clickedHandlePoint = false
      this.clickedHandleLine = false
      this.clickedShapePoint = [x, y]
      this.clickedShape = true
    } else if (this.type === 'polygon') {
      this._polygonMouseDown(event)
    }
  }

  _handleMouseUp () {
    this.clickedShape = false
    this.clickedHandlePoint = false
    this.clickedHandleLine = false
    this.clickedShapePoint = []
  }

  /**
   * Point(x, y) is in shape
   * @param {Number} x
   * @param {Number} y
   * @returns {Boolean}
   * @memberof Shape
   */
  _pointInShape (x, y) {
    if (!this.shape) {
      return false
    }
    for (let point of this.temporaryPointsWithoutZoomAndOffset) {
      if (x === point[0] && y === point[1]) {
        return false
      }
    }
    return this.freeDraw.ctx.isPointInPath(this.shape, x, y)
  }

  /**
   * Point(x, y) is in handlePoints
   *
   * @param {*} x
   * @param {*} y
   * @returns {Boolean}
   * @memberof Shape
   */
  _pointInHandlePoints (x, y) {
    let result = false
    if (this.edit) {
      let clickedHandlePointIndex = null
      for (let i = 0; i < this.handlePoints.length; i++) {
        if (this.freeDraw.ctx.isPointInPath(this.handlePoints[i].obj, x, y)) {
          result = true
          clickedHandlePointIndex = i
          break
        }
      }
      this.clickedHandlePointIndex = clickedHandlePointIndex
    }
    return result
  }

  /**
   * Point(x, y) is in handleLines
   *
   * @param {*} x
   * @param {*} y
   * @returns {Boolean}
   * @memberof Shape
   */
  _pointInHandleLines (x, y) {
    let result = false
    if (this.edit) {
      let clickedHandleLineIndex = null
      for (let i = 0; i < this.handleLines.length; i++) {
        if (this.freeDraw.ctx.isPointInPath(this.handleLines[i].obj, x, y)) {
          result = true
          clickedHandleLineIndex = i
          break
        }
      }
      this.clickedHandleLineIndex = clickedHandleLineIndex
    }
    console.log(result)
    return result;
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
    this.freeDraw._updateModel('edit', this.id)
    this.freeDraw._refreshShapesInCanvas()
    this._backupData()
    return this
  }

  /**
   * Finish Shape editing model and save
   *
   * @returns
   * @memberof Shape
   */
  finish () {
    this.edit = false
    this.isCreate = false
    this.freeDraw._updateModel('view')
    this.shapeStyle = SHAPE_STYLE
    if (this._toSVGPath && typeof this._toSVGPath === 'function') {
      this._toSVGPath()
    }
    if (this._toJSONString && typeof this._toJSONString === 'function') {
      this._toJSONString()
    }
    this.freeDraw._refreshShapesInCanvas()
    return this
  }

  /**
   * Cancel Shape editing
   */
  cancelEdit () {
    this.shapeStyle = SHAPE_STYLE
    this.edit = false
    this.freeDraw._updateModel('view')
    this._rollbackData()
    this.freeDraw._refreshShapesInCanvas()
    return this
  }
}

export default Shape
