const Polygon = require('./polygon');
const Rect = require('./rect');
const Path = require('./path');
const Shape = require('./shape');

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
  
  addShape (params) {
    const { id, path, style } = params;
    if (!id) {
      throw new Error(`Shape id can not be empty`);
    }
    if (!path) {
      throw new Error(`Path can not be empty`);
    }
    if (this.viewShapeInCanvas[id]) {
      throw new Error(`Shape id must be unique, shape id '${id}' has already exist`);
    }
    this.viewShapeInCanvas[id] = new Shape({ id, ctx: this.ctx, style, EasyDraw: this, path });
    return this.viewShapeInCanvas[id];
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
    } else if (type === 'path') {
      return this._drawPath(params);
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

  _drawPath (params) {
    const { id, style } = params;
    this.shapeInCanvas[id] = new Path({ id, ctx: this.ctx, style, EasyDraw: this });
    return this.shapeInCanvas[id];
  }
}

module.exports = FreeDraw;

window.FreeDraw = FreeDraw;