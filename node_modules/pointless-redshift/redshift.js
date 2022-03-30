const redshift = ( maxOpacity ) => {
  let filterNode = document.createElement("div")
  filterNode.style = `
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #ff0000;
    opacity: 0;
    pointer-events: none;
  `

  window.onload = () => {
    document.body.appendChild(filterNode);
  }
  
  let delta = 0;
  let oldPos = 0;
  

  // listen to "scroll" event
  window.onscroll = () => {
    
    let newPos = window.scrollY;
    if (oldPos !== null) {
      delta = newPos - oldPos;
    }
    oldPos = window.scrollY;

    let rotate = "50"
    let velocity = Math.abs(delta) / 100
    if (velocity > maxOpacity) {
      velocity = maxOpacity;
    }
    delta > 0 ? rotate = "0" : rotate = "240"
    filterNode.style.filter = "hue-rotate(" + rotate + "deg)"
    filterNode.style.opacity = velocity;
  };
}

module.exports = redshift;