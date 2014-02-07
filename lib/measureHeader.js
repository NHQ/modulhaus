var jtype = require('jtype')

var w = window.innerWidth
console.log(w)
module.exports = function(){
  var styles = {
    fontFamily: 'Georgia',
    fontSize:12 
  }

  var dict, length = 0;
  while(styles.fontSize < 30){
    styles.fontSize++
    dict = jtype('modulhaus', styles)
    length = dict.total[0]
    console.log(styles.fontSize, dict, length, w)
  }
  return --styles.fontSize

}
