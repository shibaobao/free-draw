const Polygon = require('./polygon');

class EasyDraw {
  constructor (options) {
    this.canvasDOM = options.canvas;
    this.ctx = this.canvasDOM.getContext("2d");

    this.shapeInCanvas = {};
    this._initCanvasEvent();
    // Current model view/edit
    this.model = 'view';
  }

  _initCanvasEvent () {
    this.canvasDOM.addEventListener('mousedown', this._distributeCanvasEvent.bind(this));
    this.canvasDOM.addEventListener('mousemove', this._distributeCanvasEvent.bind(this));
    this.canvasDOM.addEventListener('mouseup', this._distributeCanvasEvent.bind(this));
  }

  _distributeCanvasEvent (event) {
    const { type } = event;
    // trigger all events when in edit model
    if (this.model === 'edit') {
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
   * Remove shape by unique id
   * @param {*} uniqueId
   */
  removeShape (id) {
    if (this.shapeObjects[id]) {
      delete this.shapeObjects[id]
    }
  }

  refreshShapes () {
    this.removeAll();
    for (let shape in this.shapeInCanvas) {
      this.shapeInCanvas[shape].refresh();
    }
  }

  addShape (params) {
    const { id, type } = params;
    if (!id) {
      throw new Error(`Shape id can not be empty`);
    }
    if (this.shapeInCanvas[id]) {
      throw new Error(`Shape id must be unique, shape id '${id}' has already exit`);
    }
    this.model = 'edit';
    if (type === 'path') {
    } else if (type === 'polygon') {
      return this._addPolygon(params);
    } else if (type === 'rect') {

    }
  }

  _addPolygon (params) {
    const { id, style } = params;
    this.shapeInCanvas[id] = new Polygon({ id, ctx: this.ctx, style, EasyDraw: this });
    return this.shapeInCanvas[id];
  }
}

window.EasyDraw = EasyDraw;