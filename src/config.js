const lineColor = '#0E71EB'
const shapeFillColor = 'rgba(14, 113, 235, 0.25)'
const handlePointFillColor = '#FFFFFF'
const lineWidth = 2
const handlePointWidth = 8
const handlePointRadio = 4

export const HANDLE_POINT_STYLE = {
  lineWidth,
  fillStyle: handlePointFillColor,
  strokeStyle: lineColor,
  width: handlePointWidth
}

export const HANDLE_POINT_CIRCLE_STYLE = {
  lineWidth,
  fillStyle: handlePointFillColor,
  strokeStyle: lineColor,
  radius: handlePointRadio
}

export const EDIT_SHAPE_STYLE = {
  lineWidth,
  fillStyle: shapeFillColor,
  strokeStyle: lineColor
}

export const SHAPE_STYLE = {
  lineWidth,
  fillStyle: 'rgba(14, 113, 235, 0.8)',
  strokeStyle: 'rgba(14, 113, 235, 0.8)'
}

export const HANDLE_LINE_STYLE = {
  lineWidth: 1,
  strokeStyle: lineColor
}
