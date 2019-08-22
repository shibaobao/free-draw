import Rect from './rect'
import Ellipse from './ellipse'
import Polygon from './polygon'

class FreeDraw {
  constructor (options) {
    this.ctx = null
    this.canvasDOM = options.canvas

    // Shape events callback
    this.eventsCallBack = options.eventsCallBack

    // ['mouseenter', 'mouseleave', 'drag', 'transform']
    this.eventsReceive = options.eventsReceive || ['mouseenter', 'mouseleave']

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

    // events keys map
    this.eventsKeysMap = {}

    this.fix = 2

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
    window.document.addEventListener('keydown', this._distributeEvents.bind(this))
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
      // ignore keydown event when in view model
      if (type === 'keydown') {
        return
      }
      // Only check if user clicked shape
      if (type === 'mousedown') {
        for (let shapeKey in this.shapeInCanvas) {
          const shapeObj = this.shapeInCanvas[shapeKey]
          if (shapeObj._includes(x, y)) {
            this.clickedShapeId = shapeKey
            this.isClickedShape = true
            if (shapeObj.clickTimer === null) {
              shapeObj.clickTime = new Date().getTime()
            } else {
              const maxInterval = 500
              const currentClickTime = new Date().getTime()
              if (currentClickTime - shapeObj.clickTime <= maxInterval) {
                if (this.eventsReceive.includes('doubleclick')) {
                  this.eventsCallBack(event, shapeObj.id, 'doubleclick')
                }
              } else {
                shapeObj.clickTime = new Date().getTime()
              }
            }
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
            if (!this.eventsKeysMap[key]) {
              this.eventsKeysMap[key] = 'mouse-enter'
              if (this.eventsReceive.includes('mouseenter')) {
                this.eventsCallBack(event, key, 'mouseenter')
              }
            } else {
              if (this.eventsReceive.includes('mousemove')) {
                this.eventsCallBack(event, key, 'mousemove')
              }
            }
          } else {
            if (this.eventsKeysMap[key]) {
              this.eventsKeysMap[key] = undefined
              if (this.eventsReceive.includes('mouseleave')) {
                this.eventsCallBack(event, key, 'mouseleave')
              }
            }
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
   * Update ctx style
   *
   * @param {Object} style
   * @memberof FreeDraw
   */
  _updateCtxStyle (style) {
    if (style.lineWidth) {
      this.ctx.lineWidth = style.lineWidth
    }
    if (style.fillStyle) {
      this.ctx.fillStyle = style.fillStyle
    }
    if (style.strokeStyle) {
      this.ctx.strokeStyle = style.strokeStyle
    }
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
    if (this.model === 'edit' && this.editingId === shapeId) {
      this.model = 'view'
      this.editingId = null
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

  /**
   * Remove all shapes in canvas
   */
  _clearCanvas () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    return this
  }

  /**
   * Refresh canvas shape by { shapeInCanvas } Object
   */
  _refreshShapesInCanvas () {
    this._clearCanvas()
    for (let key in this.shapeInCanvas) {
      this.shapeInCanvas[key]._draw()
    }
  }

  zoomAndOffset (zoomLevel, transformCenter, offsetLeft, offsetTop) {
    if (zoomLevel) {
      this.zoomLevel = zoomLevel
    }
    if (offsetTop !== undefined) {
      this.offsetTop = offsetTop
    }
    if (offsetLeft !== undefined) {
      this.offsetLeft = offsetLeft
    }
    if (transformCenter) {
      this.transformCenter = transformCenter
    }
    this._refreshShapesInCanvas()
  }

  addShape (options) {
    if (this.model === 'edit') {
      throw new Error(`Can not add another shape in edit model`)
    }
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
    if (type === 'ellipse') {
      this.shapeInCanvas[id] = this._addEllipse(options)
      return this.shapeInCanvas[id]
    }
    if (type === 'polygon') {
      this.shapeInCanvas[id] = new Polygon(Object.assign({}, { freeDraw: this }, options))
      return this.shapeInCanvas[id]
    }
  }

  _addRect (options) {
    let { id, type, shapeStyle, handlePointStyle, startPoint, width, height, transform } = options
    if (transform) {
      const result = this.removeZoomAndMoveRect(width, height, startPoint)
      width = result.width
      height = result.height
      startPoint = result.startPoint
    }
    
    return new Rect({
      id,
      type,
      width,
      height,
      startPoint,
      shapeStyle,
      handlePointStyle,
      freeDraw: this
    })
  }

  _addEllipse (options) {
    let { id, type, shapeStyle, handlePointStyle, x, y, radiusX, radiusY, transform } = options
    if (transform) {
      const result = this.removeZoomAndMoveEllipse(x, y, radiusX, radiusY)
      x = result.x
      y = result.y
      radiusX = result.radiusX
      radiusY = result.radiusY
    }
    return new Ellipse({
      id,
      type,
      x,
      y,
      radiusX,
      radiusY,
      shapeStyle,
      handlePointStyle,
      freeDraw: this
    })
  }

  removeZoomAndMoveRect (width, height, startPoint) {
    width = width / this.zoomLevel
    height = height / this.zoomLevel
    let x = startPoint[0]
    let y = startPoint[1]
    if (this.offsetLeft !== 0) {
      x -= this.offsetLeft
    }
    if (this.offsetTop !== 0) {
      y -= this.offsetTop
    }
    x = ((x - this.transformCenter[0]) / this.zoomLevel) + this.transformCenter[0]
    y = ((y - this.transformCenter[1]) / this.zoomLevel) + this.transformCenter[1]
    return {
      width,
      height,
      startPoint: [x, y]
    }
  }

  removeZoomAndMoveEllipse (x, y, radiusX, radiusY) {
    radiusX = radiusX / this.zoomLevel
    radiusY = radiusY / this.zoomLevel
    if (this.offsetLeft !== 0) {
      x -= this.offsetLeft
    }
    if (this.offsetTop !== 0) {
      y -= this.offsetTop
    }
    x = ((x - this.transformCenter[0]) / this.zoomLevel) + this.transformCenter[0]
    y = ((y - this.transformCenter[1]) / this.zoomLevel) + this.transformCenter[1]
    return {
      x,
      y,
      radiusX,
      radiusY
    }
  }
}

export default FreeDraw
