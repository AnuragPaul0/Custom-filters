// kat = 0
d = document, dq = (x) => { k = d.querySelector(x)
  // , console.log(k)
  return k }

fetch(`https://cdn.hnup.date/generated_audio.mp3?${queryString}`, {
  method: "HEAD",
})
  .then((response) => {
    const lastModified = response.headers.get("Last-Modified");
    if (lastModified) {
      const lastModifiedDate = new Date(lastModified);

      const localTime = lastModifiedDate.toLocaleString();
      s = localTime.split(', '), c = s[1].split(':')
      if ( +c[0] >= 12) { c[0]-= 12 } c[0] = s[0] + ', '+ c[0]
      document.getElementById("file-age").textContent =
        "Updated every hour, last update " + c.join(":")
    }
  })
  .catch((error) => {
    console.error("Error fetching file headers:", error);
  })

// options = {
//   container: "#waveform",
//   height: 128,
//   waveColor: "#ccc4af",
//   progressColor: "#f5c542",
//   url: `https://cdn.hnup.date/generated_audio.mp3?${queryString}`,
//   barWidth: 4,
//   cursorWidth: 4,
//   dragToSeek: false,
//   audioRate: 1,
//   hideScrollbar: false,
//   mediaControls: false,
// }Plugin
max = 40
let wavesurfere = WaveSurfer.create({...options, plugins: [ WaveSurfer.Hover.create({
    lineColor: '#ff0000',
    lineWidth: 2,
    labelBackground: '#555',
    labelColor: '#fff',
    labelSize: '11px' }), WaveSurfer.Timeline.create({
  height: 20, timeInterval: max/2,
  primaryLabelInterval: max,
  secondaryLabelInterval: 5,
  style: { fontSize: '20px',
    color: '#6A3274',
  } }) ]})
// console.log(1)
// now = new Date();
// day = String(now.getUTCDate()).padStart(2, "0");
// month = String(now.getUTCMonth() + 1).padStart(2, "0");
// year = String(now.getUTCFullYear()).slice(-2);
// hour = String(now.getUTCHours()).padStart(2, "0");

// queryString = `cachebuster=${day}${month}${year}${hour}`;

wavesurfer.on("ready", () => { dq('#waveform > div').remove()
  old_element = document.getElementById("playPauseBtn")
  var new_element = old_element.cloneNode(true)
  new_element.addEventListener("click", function () {
    wavesurfere.playPause()
   })
old_element.parentNode.replaceChild(new_element, old_element) } )

// d.getElementById("playPauseBtn")
// const speeds = [0.5, 1, 1.5, 2, 3];
// // Set the playback rate
// document.getElementById("speedRange").addEventListener("input", (e) => {
//   const speed = speeds[e.target.valueAsNumber];
//   document.querySelector("#rate").textContent = speed.toFixed(1);
//   wavesurfer.setPlaybackRate(speed, true);
//   wavesurfer.play();
// });

// const volumeSlider = document.getElementById("volume-slider");
// const outputContainer = document.getElementById("volume-output");

// volumeSlider.addEventListener("input", (e) => {
//   const value = e.target.value;

//   outputContainer.textContent = value;
//   wavesurfer.media.volume = value / 100;
// })