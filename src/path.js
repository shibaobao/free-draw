const Basic = require('./basic');

class Path extends Basic {
  constructor (options) {
    super(options);
    // line or arc or circle
    this.currentPathType = 'line';
    this.initPath();
  }
  initPath () {}

  handleMouseDown (event) {
    const { offsetX: x, offsetY: y } = event;
    if (this.points.length === 0) {
    }
    this.handlePoints.push({
      obj: null,
      point: [x, y]
    });
  }

  handleMouseMove (event) {}

  handleMouseUp (event) {}
}

module.exports = Path;