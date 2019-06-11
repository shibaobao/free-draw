const {
  HANDLE_POINT_STYLE,
  EDIT_SHAPE_STYLE,
  SHAPE_STYLE
} = require('./config')

class Shape {
  constructor (options) {
    // Shape id
    this.id = options.id

    // Shape type rect/polygon
    this.type = options.type

    // Shape edit status, if current shape is editing
    this.edit = options.edit || true

    // Shape active status, if current shape is active
    this.active = options.active || true

    // Shape points
    this.points = options.points || []

    // Shape handle points
    this.handlePoints = []

    // Record index if handlepoint clicked
    this.clickedHandlePointIndex = null

    // FreeDraw instance reference
    this.freeDraw = options.freeDraw

    // Handle points style
    this.handlePointStyle = options.handlePointStyle

    // Shape style
    this.shapeStyle = options.shapeStyle

    // Shape Object, Path/Rect
    this.shape = null
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
      case 'click':
        if (this._handleClick && typeof this._handleClick === 'function') {
          this._handleClick(event)
        }
        break
    }
  }

  /**
   * Draw handlepoint
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   * @param {Object} style
   * @returns
   * @memberof Shape
   */
  _drawHandlePoint (x, y, radius, style) {
    const handlePoint = new Path2D()
    handlePoint.arc(x, y, radius, 0, 2 * Math.PI)
    this.freeDraw._updateCtxStyle(style)
    this.freeDraw.ctx.fill(handlePoint)
    this.freeDraw.ctx.stroke(handlePoint)
    return handlePoint
  }

  _includes (x, y) {
    return this._pointInHandlePoints(x, y) || this._pointInShape(x, y)
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
      for (let i = 0; i < this.handlePointsLength; i++) {
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

  saveEdit () {
    this.edit = false
    this.active = true
    this.freeDraw._updateModel('view')
    this.shapeStyle = SHAPE_STYLE
    this.pointsToPath()
    this.freeDraw._refreshShapesInCanvas()
    return this
  }
}

module.exports = Shape
