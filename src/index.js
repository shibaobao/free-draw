import Rect from './rect'

class FreeDraw {
  constructor (options) {
    this.canvasDOM = options.canvas
    this.eventsCallBack = options.eventsCallBack
    this.ctx = null

    // FreeDraw model view/edit
    this.model = 'view'
    this.editingId = null

    // Record whether the last click clicked on the shape
    this.isClickedShape = false
    this.clickedShapeId = null

    // key -> shapeId       value -> shape object
    this.shapeInCanvas = {}

    // Offset data
    this.zoomLevel = 1.0
    this.offsetTop = 0
    this.offsetLeft = 0
    this.transformCenter = [0, 0]

    this._initFreeDraw()
  }

  /**
   * Init FreeDraw Object
   *
   * @memberof FreeDraw
   */
  _initFreeDraw () {
    this.ctx = this.canvasDOM.getContext('2d')

    // Handle canvas events
    this.canvasDOM.addEventListener('mousedown', this._distributeEvents.bind(this))
    this.canvasDOM.addEventListener('mousemove', this._distributeEvents.bind(this))
    this.canvasDOM.addEventListener('mouseup', this._distributeEvents.bind(this))
    this.canvasDOM.addEventListener('click', this._distributeEvents.bind(this))
  }

  /**
   * Distribute events to shapes
   *
   * @param {*} event
   * @memberof FreeDraw
   */
  _distributeEvents (event) {
    const { type, offsetX: x, offsetY: y } = event
    if (this.model === 'view') {
      // Only check if user clicked shape
      if (type === 'mousedown') {
        for (let shapeKey in this.shapeInCanvas) {
          const shapeObj = this.shapeInCanvas[shapeKey]
          if (shapeObj._includes(x, y)) {
            this.clickedShapeId = shapeKey
            this.isClickedShape = true
          }
        }
      } else if (type === 'mouseup') {
        this.clickedShapeId = null
        this.isClickedShape = false
      }
      if (this.eventsCallBack && typeof this.eventsCallBack === 'function') {
        for (let key in this.shapeInCanvas) {
          const shapeObj = this.shapeInCanvas[key]
          if (shapeObj._includes(x, y)) {
            this.eventsCallBack(event, key)
          }
        }
      }
    } else if (this.model === 'edit') {
      // Only trigger event for editing shape
      const editingShape = this.shapeInCanvas[this.editingId]
      if (editingShape) {
        editingShape._trigger(event)
        if (type === 'mousedown') {
          if (editingShape._includes(x, y)) {
            this.isClickedShape = true
            this.clickedShapeId = editingShape.id
          }
        } else if (type === 'mouseup') {
          this.isClickedShape = false
          this.clickedShapeId = null
        }
      }
    }
  }

  /**
   * Update CTX style
   *
   * @param {Object} style
   * @memberof FreeDraw
   */
  _updateCtxStyle (style) {
    this.ctx.lineWidth = style.lineWidth
    this.ctx.fillStyle = style.fillStyle
    this.ctx.strokeStyle = style.strokeStyle
  }

  /**
   * Remove Shape by shapeId
   *
   * @param {String} shapeId
   * @returns {FreeDraw}
   * @memberof FreeDraw
   */
  removeShape (shapeId) {
    if (this.shapeInCanvas[shapeId]) {
      delete this.shapeInCanvas[shapeId]
    }
    this._refreshShapesInCanvas()
    return this
  }

  /**
   * Remove all shapes
   *
   * @returns
   * @memberof FreeDraw
   */
  removeAllShape () {
    this.shapeInCanvas = {}
    this._refreshShapesInCanvas()
    return this
  }

  /**
   * Update FreeDraw model
   * @param {Sting} model
   * @param {Sting} editingId
   */
  _updateModel (model, editingId) {
    this.model = model || 'view'
    this.editingId = editingId || null
  }

  _clearCanvas () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    return this
  }

  _refreshShapesInCanvas () {
    this._clearCanvas()
    for (let key in this.shapeInCanvas) {
      this.shapeInCanvas[key]._draw()
    }
  }

  zoomAndOffset (zoomLevel, transformCenter, offsetLeft, offsetTop) {
    this.zoomLevel = zoomLevel
    this.offsetTop = offsetTop
    this.offsetLeft = offsetLeft
    this.transformCenter = transformCenter
    this._refreshShapesInCanvas()
  }

  addShape (options) {
    const { type, id } = options
    if (!id) {
      throw new Error(`Shape id can not be empty`)
    }
    if (this.shapeInCanvas[id]) {
      throw new Error(`Shape id must be unique, shape id '${id}' has already exist`)
    }
    this._updateModel('edit', id)
    if (type === 'rect') {
      this.shapeInCanvas[id] = this._addRect(options)
      return this.shapeInCanvas[id]
    }
  }

  _addRect (options) {
    const { id, type, shapeStyle, handlePointStyle, startPoint, width, height } = options
    console.log(id, type, shapeStyle, handlePointStyle, startPoint, width, height)
    const points = []
    if (startPoint && width && height) {
      points.push(startPoint)
      points.push([startPoint[0] + width, startPoint[1]])
      points.push([startPoint[0] + width, startPoint[1] + height])
      points.push([startPoint[0], startPoint[1] + height])
    }
    return new Rect({
      id,
      type,
      width,
      height,
      points,
      startPoint,
      shapeStyle,
      handlePointStyle,
      freeDraw: this
    })
  }
}

export default FreeDraw
