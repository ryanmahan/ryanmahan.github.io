

const watchLastRound = (thisRound, lastRound) => {  
  document.getElementById(thisRound).addEventListener("focus", (event) => {
    let lastRoundElements = document.querySelectorAll(`*[id^="${lastRound}"]`);
    let html = [...lastRoundElements].map((el) => `<option>${el.value}</option>`);
    document.getElementById(thisRound).innerHTML = html;
  })
}

document.querySelectorAll("select").forEach(el => {
  el.addEventListener("click", (event) => {
    document.querySelector(`img[select=${event.target.id}]`).src = `images/${event.target.value}.jpg`
  })
})

document.querySelectorAll("select").forEach(el => {
  el.addEventListener("change", (event) => {
    document.querySelector(`img[select=${event.target.id}]`).src = `images/${event.target.value}.jpg`
  })
})

watchLastRound('quarter-1-1', 'conference-1');
watchLastRound('quarter-1-2', 'conference-2');
watchLastRound('quarter-2-1', 'conference-3');
watchLastRound('quarter-2-2', 'conference-4');
watchLastRound('semi-1', 'quarter-1');
watchLastRound('semi-2', 'quarter-2');
watchLastRound('final', 'semi');

const downloadImage = () => {
  let node = document.getElementById('bracket');
  domtoimage.toBlob(node)
    .then((blob) => {
      let url = URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.download = "bracket.png";
      a.href = url;
      a.click();
    })
    .catch((error) => {
      alert("Fill out the bracket completely before downloading!")
    });
}