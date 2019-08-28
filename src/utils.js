export default {
  distance(x1, y1, x2 = 0, y2 = 0) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
  },

  /**
   * Calculate the distance between point(x0, y0) and the line formed by (x1, y1) and (x2, y2)
   * @param {Number} x0
   * @param {Number} y0
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @returns The distance
   */
  distanceToSegment(x0, y0, x1, y1, x2, y2) {
    const v1 = [x2 - x1, y2 - y1]
    const v2 = [x0 - x1, y0 - y1]
    const v3 = [x0 - x2, y0 - y2]

    const v1DotV2 = v1[0] * v2[0] + v1[1] * v2[1]
    const v1DotV3 = v1[0] * v3[0] + v1[1] * v3[1]

    if (v1DotV2 < 0 && v1DotV3 < 0) {
      return this.distance(x0, y0, x1, y1)
    }
    if (v1DotV2 > 0 && v1DotV3 > 0) {
      return this.distance(x0, y0, x2, y2)
    }
    const a = y2 - y1
    const b = x1 - x2
    const c = x2 * y1 - x1 * y2
    return Math.abs(a * x0 + b * y0 + c) / Math.sqrt(a * a + b * b)
  },

  /**
   * Calculate the angle between two segments
   * @param {Array} p1 Line1
   * @param {Array} p2 Line1
   * @param {Array} p3 Line2
   * @param {Array} p4 Line2
   */
  arcBetweenSegment(p1, p2, p3, p4) {
    const v1 = [p2[0] - p1[0], p2[1] - p1[1]]
    const v2 = [p4[0] - p3[0], p4[1] - p3[1]]

    const v1DotV2 = v1[0] * v2[0] + v1[1] * v2[1]

    const cos =
      v1DotV2 /
      (Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]) * Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]))
    const arc = Math.acos(cos)

    return arc
  },

  toArc(angle) {
    return (angle / 360) * Math.PI * 2
  },

  toAngle(arc) {
    return (arc / (Math.PI * 2)) * 360
  },

  greatestCommonDivisor(a, b) {
    return b === 0 ? a : greatestCommonDivisor(b, a % b)
  }
}
