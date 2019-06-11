const lineColor = '#0E71EB'
const shapeFillColor = 'rgba(14, 113, 235, 0.25)'
const handlePointFillColor = '#FFFFFF'
const lineWidth = 2
const handlePointRadius = 5

module.exports.HANDLE_POINT_STYLE = {
  lineWidth,
  fillStyle: handlePointFillColor,
  strokeStyle: lineColor,
  radius: handlePointRadius
}

module.exports.EDIT_SHAPE_STYLE = {
  lineWidth,
  fillStyle: shapeFillColor,
  strokeStyle: lineColor
}

module.exports.SHAPE_STYLE = {
  lineWidth,
  fillStyle: 'rgba(14, 113, 235, 0.8)',
  strokeStyle: 'rgba(14, 113, 235, 0.8)'
}
