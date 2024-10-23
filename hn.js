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

// Create your own media element
const audio = new Audio()
audio.controls = true
audio.src = options.url

delete options.url; Object.assign(options, {media: audio})
// options2 = options; options2['url'] = 
// Create a WaveSurfer instance and pass the media element
max = 20
let wavesurfere = WaveSurfer.create({...options, plugins: [ WaveSurfer.Hover.create({
    lineColor: '#ff0000', lineWidth: 2,
    labelBackground: '#555',
    labelColor: '#fff',
    labelSize: '11px' }), WaveSurfer.Timeline.create({ height: 20, timeInterval: 5,
  primaryLabelInterval: max,
  secondaryLabelInterval: max,
  style: { fontSize: '20px', color: '#6A3274',
  } }) ]})
// Now, create a Web Audio equalizer

// Create Web Audio context
const audioContext = new AudioContext()

// Define the equalizer bands
const eqBands = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]

// Create a biquad filter for each band
const filters = eqBands.map((band) => {
  const filter = audioContext.createBiquadFilter()
  filter.type = band <= 32 ? 'lowshelf' : band >= 16000 ? 'highshelf' : 'peaking'
  filter.gain.value = Math.random() * 40 - 20
  filter.Q.value = 1 // resonance
  filter.frequency.value = band // the cut-off frequency
  return filter
})

// Connect the audio to the equalizer
audio.addEventListener(
  'canplay',
  () => {
    // Create a MediaElementSourceNode from the audio element
    const mediaNode = audioContext.createMediaElementSource(audio)

    // Connect the filters and media node sequentially
    const equalizer = filters.reduce((prev, curr) => {
      prev.connect(curr)
      return curr
    }, mediaNode)

    // Connect the filters to the audio output
    equalizer.connect(audioContext.destination)
  },
  { once: true },
)

// Create a vertical slider for each band
const container = document.createElement('p')
filters.forEach((filter, i) => {
  const slider = document.createElement('input')
  slider.type = 'range'
  slider.orient = 'vertical'
  slider.style.appearance = 'slider-vertical'
  slider.style.width = '8%'
  slider.min = -40
  slider.max = 40
  slider.value = filter.gain.value
  slider.step = 0.1
  slider.oninput = (e) => (filter.gain.value = e.target.value)
  // container
  // and give it some content
  const newContent = document.createTextNode(eqBands[i])
div = document.createElement('div')
div.appendChild(newContent)
div.appendChild(slider);
  // add the text node to the newly created div
  container.appendChild(div)
})
document.body.appendChild(container)
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
    wavesurfere.playPause() })
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