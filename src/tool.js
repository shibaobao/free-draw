class Tool {
  /**
   * Covert points[x, y] to svg path
   * @param {Array[number, number]} points 
   */
  static pointsToSVGPath (points) {
    return 'M' + points.join('L') + 'Z'
  }

  /**
   * Get distance between two points
   * @param {Array[x, y]} pointA 
   * @param {Array[x, y]} pointB 
   */
  static getDistanceBetweenTwoPoints (pointA, pointB) {
    const xDistance = pointA[0] - pointB[0];
    const yDistance = pointA[1] - pointB[1];
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance).toFixed(2);
  }
}

module.exports = Tool;