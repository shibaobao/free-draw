[English](README.md) | 简体中文

# Free-Draw

[![Progress](http://progressed.io/bar/60?title=Progress)](https://github.com/shibaobao/free-draw)
[![Build Status](https://travis-ci.org/shibaobao/free-draw.svg?branch=master)](https://travis-ci.org/shibaobao/free-draw)
[![npm](https://img.shields.io/npm/v/free-draw.svg)](https://www.npmjs.com/package/free-draw)
[![npm](https://img.shields.io/npm/dt/free-draw.svg)](https://www.npmjs.com/package/free-draw)
[![npm](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/shibaobao/free-draw/blob/master/LICENSE)

# 安装

使用 npm:

```shell
$ npm i -g npm
$ npm i free-draw
```

# 快速上手

HTML:
```html
<canvas id="canvas" width="800" height="600"></canvas>
```

JS
```html
<script>
import FreeDraw from 'free-draw'

const freeDraw = new FreeDraw({ canvas: document.getElementById('canvas') })
const rect = freeDraw.addShape({ id: 'rect-1', type: 'rect', startPoint: [50, 50], width: 100, height: 200 });

</script>
```