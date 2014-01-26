var n = 0;
var o = [0,0];
var hues = [] 
var hue, sat;
module.exports = function(nda, ctx, size, offset){
  for(var i = 0; i < nda.shape[0]; i++){
    for(var j = 0; j < nda.shape[1]; j++){
      n = nda.get(i, j)
      gen(ctx, size, i * size, j * size, n, offset)
    }
  }
}

function gen(draw, lifeSize, x, y, z, offset){
  x -= x % lifeSize
  y -= y % lifeSize
  offset = offset || o 
  sat = Math.floor(z % 255)// Math.floor(z % 8)
  draw.fillStyle = 'hsla('+260+', '+z/255*100+'%, 70%, '+(1.3-z/255)+')'
  draw.strokeStyle = rgba(255,255,255,1) 
  draw.fillRect(x + offset[0], y + offset[1], lifeSize, lifeSize)
//  draw.strokeRect(x + offset[0], y + offset[1], lifeSize, lifeSize)
}

function rgba(r,g,b,a){
  return 'rgba('+Array.prototype.join.call(arguments, ',') +')'
}
