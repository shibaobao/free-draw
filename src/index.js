const Polygon = require('./polygon');
const Rect = require('./rect');

class FreeDraw {
  constructor (options) {

    this.canvasDOM = options.canvas;
    this.ctx = this.canvasDOM.getContext("2d");

    // Current model view/draw
    this.model = 'view';
    this.editingShapeId = null;
    
    this.shapeInCanvas = {};
    this.viewShapeInCanvas = {};

    this._initCanvasEvent();
  }

  _initCanvasEvent () {
    this.canvasDOM.addEventListener('mousedown', this._distributeCanvasEvent.bind(this));
    this.canvasDOM.addEventListener('mousemove', this._distributeCanvasEvent.bind(this));
    this.canvasDOM.addEventListener('mouseup', this._distributeCanvasEvent.bind(this));

    if (document) {
      document.addEventListener('keydown', this._distributeCanvasEvent.bind(this));
    }
  }

  _distributeCanvasEvent (event) {
    const { type } = event;
    // trigger all events when in edit model
    if (this.model === 'draw') {
      for (let shape in this.shapeInCanvas) {
        // should only one shape in active status
        if (this.shapeInCanvas[shape].active) {
          this.shapeInCanvas[shape].trigger(event);
          break;
        }
      }
    } else if (this.model === 'view' && type === 'mousedown') {
      for (let shape in this.shapeInCanvas) {
        this.shapeInCanvas[shape].trigger(event);
      }
    }
  }

  removeAll () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    return this
  }

  /**
   * Finish current drawing
   */
  _finishDrawing () {
    this.model = 'view';
    this.editingShapeId = null;
  }

  /**
   * Remove shape by unique id
   * @param {*} uniqueId
   */
  removeShape (id) {
    if (this.shapeInCanvas[id]) {
      delete this.shapeInCanvas[id];
      this.refreshShapes();
    } else {
      console.warn('Shape not exist')
    }
  }

  refreshShapes () {
    this.removeAll();
    for (let shape in this.shapeInCanvas) {
      this.shapeInCanvas[shape].refresh();
    }
  }

  drawShape (params) {
    const { id, type } = params;
    if (!id) {
      throw new Error(`Shape id can not be empty`);
    }
    if (this.shapeInCanvas[id]) {
      throw new Error(`Shape id must be unique, shape id '${id}' has already exist`);
    }
    this.model = 'draw';
    this.editingShapeId = id;
    if (type === 'path') {
    } else if (type === 'polygon') {
      return this._drawPolygon(params);
    } else if (type === 'rect') {
      return this._drawRect(params);
    }
  }

  _drawPolygon (params) {
    const { id, style } = params;
    this.shapeInCanvas[id] = new Polygon({ id, ctx: this.ctx, style, EasyDraw: this });
    return this.shapeInCanvas[id];
  }

  _drawRect (params) {
    const { id, style } = params;
    this.shapeInCanvas[id] = new Rect({ id, ctx: this.ctx, style, EasyDraw: this });
    return this.shapeInCanvas[id];
  }
}

module.exports = FreeDraw;