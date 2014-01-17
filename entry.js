var body = document.body
var ui = require('getids')(document.body)
var fs = require('fullscreen');
var touchdown = require('touchdown');
var Time = require('../since-when')
var ndarray = require('ndarray')
var rol = require('./lib/rol.js')
require('./lib/reqFrame')()
var getCSS = require('./lib/getCSS')

var time = Time()
var w = window.innerWidth
var h = window.innerHeight
var draw = ui.board.getContext('2d')
var lifeSize = 20;
var zoom = 1;
ui.board.width = w
ui.board.height = h

draw.fillStyle = rgba(0,0,0,1) 
draw.fillRect(0,0,w,h)
var data = new Uint8ClampedArray(Math.ceil(w / lifeSize) * Math.ceil(h / lifeSize))
var data2 = new Uint8ClampedArray(Math.ceil(w / lifeSize) * Math.ceil(h / lifeSize))

for(var x = 0; x < data.length; x++){
  data[x] = 0;
  data2[x] = 0
}
var bits = ndarray(data, [Math.ceil(w / lifeSize), Math.ceil(h / lifeSize)]);
var next = ndarray(data2, [Math.ceil(w / lifeSize), Math.ceil(h / lifeSize)]);

var pixel = draw.getImageData(0,0,100,100)
//window.requestAnimationFrame(draw)
function draw(t){

  window.requestAnimationFrame(draw)
  
}

time.every(1e9, function(tock, interva){
  
})

touchdown.start(ui.board);
touchdown.start(ui.step)

ui.step.addEventListener('click', function(evt){

  rule(bits, next)

})

draw.strokeStyle = '#fff';
for(var x = 0; x < w; x+=lifeSize * zoom){
  draw.moveTo(x, 0)
  draw.lineTo(x, h)
}

for(var y = 0; y < h; y+= lifeSize * zoom){
  draw.moveTo(0, y)
  draw.lineTo(w, y)
}
draw.stroke()

ui.board.addEventListener('touchdown', springLife)
//ui.board.addEventListener('deltavector', springLife)

function rule(prev, next){
  var nx = prev.shape[0];
  var ny = prev.shape[1];

  for(var i=1;i<nx-1;i++){
    for(var j=1; j<ny-1; j++){
      var n = 0;
      for(var dx=-1; dx<=1; ++dx){
        for(var dy=-1; dy<=1; ++dy) {
          if(dx === 0 && dy === 0) {
            continue
          }
          n += prev.get(i+dx, j+dy)
        }
        if(n === 3 || n === 3 + prev.get(i, j)){
          next.set(i,j, 10 + n)
        }
        else {
          next.set(i,j, n)
        }
        gen(i * lifeSize,j * lifeSize, n > 9 ? 1 : 0)
      }
    }
  }
}


function gen(x, y, z){
  x -= x % lifeSize
  y -= y % lifeSize
  draw.strokeStyle = (z > 0) ? rgba(0,0,0,1) : rgba(255,255,255,1)
  draw.fillStyle = (z > 0) ? rgba(255,255,255,1) : rgba(0,0,0,1)
  draw.fillRect(x, y, lifeSize, lifeSize)
  draw.strokeRect(x, y, lifeSize, lifeSize)
}
function springLife(e){
  var x = e.detail.x, y = e.detail.y;
  x -= x % lifeSize
  y -= y % lifeSize
  x /= lifeSize
  y /= lifeSize
  var s = bits.get(x, y)
  if(s < 1) s = 1
  else s = 0
  bits.set(x, y, s)
  gen(e.detail.x, e.detail.y, s)
}
function springxLife(e){
  bits.set(e.detail.x, e.detail.y, 1)
  pixel = draw.getImageData(e.detail.x - (e.detail.x % lifeSize), e.detail.y - (e.detail.y % lifeSize), lifeSize, lifeSize)
  for(var x = 0; x < pixel.data.length; x++){
    pixel.data[x] = 255
  }
  draw.putImageData(pixel, e.detail.x - (e.detail.x % lifeSize), e.detail.y - (e.detail.y % lifeSize))
  console.log(e, e.detail.x, e.detail.y)
}
var screen = fs(document.body);

screen.on('attain', function(){
})

screen.on('error', function(e){console.log(e)})

document.body.addEventListener('click', function(){
  screen.request()
})

function rgba(){
  return 'rgba('+Array.prototype.join.call(arguments, ',')+')'
}
