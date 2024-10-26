// kat = 0
d = document, dq = (x) => { k = d.querySelector(x)
  // , console.log(k)
  return k }

fetch(`https://cdn.hnup.date/generated_audio.mp3?${queryString}`, {
  method: "HEAD",
}).then((response) => {
    const lastModified = response.headers.get("Last-Modified");
    if (lastModified) {
      const lastModifiedDate = new Date(lastModified);

      const localTime = lastModifiedDate.toLocaleString();
      s = localTime.split(', '), c = s[1].split(':')
      if ( +c[0] >= 12) { c[0]-= 12 } c[0] = s[0] + ', '+ c[0]
      document.getElementById("file-age").textContent =
        "Updated every hour, last update " + c.join(":")
    }
  }).catch((error) => {
    console.error("Error fetching file headers:", error);
})

// Create your own media element
// const audio = new Audio(); audio.controls = true; audio.src = options.url

delete options.barWidth
Object.assign(options, { dragToSeek: !0,
  /** Render each audio channel as a separate waveform */
  splitChannels: false
  // , barWidth: 2
})
// options2 = options; options2['url'] = media: audio
// Create a WaveSurfer instance and pass the media element
max = 20
let wavesurfere = WaveSurfer.create({...options, plugins: [ WaveSurfer.Hover.create({
      lineColor: '#ff0000', lineWidth: 2, labelBackground: '#555', labelColor: '#fff',
    labelSize: '11px' }),
    WaveSurfer.Timeline.create({ height: 20, timeInterval: 5,
      primaryLabelInterval: max, secondaryLabelInterval: max, secondaryLabelOpacity: .5,
    style: { fontSize: '20px', color: '#6A3274'} }),
    WaveSurfer.Spectrogram.create({ labels: true, height: 200, splitChannels: true
    }) ], sampleRate: 22050, /**
   * Render a waveform as a squiggly line
   * @see https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/
   */
  renderFunction: (channels, ctx) => {
    const { width, height } = ctx.canvas
    const scale = channels[0].length / width
    const step = 10

    ctx.translate(0, height / 2)
    ctx.strokeStyle = ctx.fillStyle
    ctx.beginPath()

    for (let i = 0; i < width; i += step * 2) {
      const index = Math.floor(i * scale)
      const value = Math.abs(channels[0][index])
      let x = i
      let y = value * height

      ctx.moveTo(x, 0)
      ctx.lineTo(x, y)
      ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, true)
      ctx.lineTo(x + step, 0)

      x = x + step
      y = -y
      ctx.moveTo(x, 0)
      ctx.lineTo(x, y)
      ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, false)
      ctx.lineTo(x + step, 0)
    }

    ctx.stroke()
    ctx.closePath()
} })

// wavesurfere.on('click', () => { wavesurfer.play() })
// Now, create a Web Audio equalizer

// Create Web Audio context
// const audioContext = new AudioContext()

// Define the equalizer bands
// const eqBands = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]

// Create a biquad filter for each band
// const filters = eqBands.map((band) => {
//   const filter = audioContext.createBiquadFilter()
//   filter.type = band <= 32 ? 'lowshelf' : band >= 16000 ? 'highshelf' : 'peaking'
//   filter.gain.value = Math.random() * 40 - 20
//   filter.Q.value = 1 // resonance
//   filter.frequency.value = band // the cut-off frequency
//   return filter
// })

// Connect the audio to the equalizer
// audio.addEventListener(
//   'canplay',
//   () => {
//     // Create a MediaElementSourceNode from the audio element
//     const mediaNode = audioContext.createMediaElementSource(audio)

//     // Connect the filters and media node sequentially
//     const equalizer = filters.reduce((prev, curr) => {
//       prev.connect(curr)
//       return curr
//     }, mediaNode)

//     // Connect the filters to the audio output
//     equalizer.connect(audioContext.destination)
// }, { once: true } )

// Create a vertical slider for each band.idequalizer
// const container = document.createElement('p');
// container

// filters.forEach((filter, i) => {
//   const slider = document.createElement('input')
//   slider.type = 'range'
//   slider.orient = 'vertical'
//   slider.style.writingMode = 'vertical-lr'
//   slider.style.direction = 'rtl'
//   // slider.style.appearance = 'slider-vertical'
//   slider.style.width = 'auto'
//   slider.min = -40
//   slider.max = 40
//   slider.value = filter.gain.value
//   slider.step = 0.1
//   slider.oninput = (e) => (filter.gain.value = e.target.value)
//   // container
//   // and give it some content
//   const newContent = document.createTextNode(eqBands[i])
// div = document.createElement('div'); div.className = 'flex'
// div.appendChild(newContent)
// div.appendChild(slider);
//   // add the text node to the newly created div
//   container.appendChild(div)
// })
// dq('.container.mt-sm').appendChild(container)
// console.log(1)ocument.body
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

const form = document.createElement('form')
Object.assign(form.style, {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',
})

document.body.appendChild(form)

for (const key in options) {
  if (options[key] === undefined) continue
  const isColor = key.includes('Color')

  const label = document.createElement('label')
  Object.assign(label.style, {
    display: 'flex',
    alignItems: 'center',
  })

  const span = document.createElement('span')
  Object.assign(span.style, {
    textTransform: 'capitalize',
    width: '7em',
  })
  span.textContent = `${key.replace(/[a-z0-9](?=[A-Z])/g, '$& ')}: `
  label.appendChild(span)

  const input = document.createElement('input')
  const type = typeof options[key]
  Object.assign(input, {
    type: isColor ? 'color' : type === 'number' ? 'range' : type === 'boolean' ? 'checkbox' : 'text',
    name: key,
    value: options[key],
    checked: options[key] === true,
  })
  if (input.type === 'text') input.style.flex = 1
  if (options[key] instanceof HTMLElement) input.disabled = true

  if (schema[key]) {
    Object.assign(input, schema[key])
  }

  label.appendChild(input)
  form.appendChild(label)

  input.oninput = () => {
    if (type === 'number') {
      options[key] = input.valueAsNumber
    } else if (type === 'boolean') {
      options[key] = input.checked
    } else if (schema[key] && schema[key].type === 'json') {
      options[key] = JSON.parse(input.value)
    } else {
      options[key] = input.value
    }
    wavesurfer.setOptions(options)
    textarea.value = JSON.stringify(options, null, 2)
  }
}
const waveform = document.querySelector('#waveform');
// Hover effect
{ hover = d.createElement('div')
  Object.assign(hover, { id: 'hover' }); waveform.appendChild(hover)
  // const hover = document.querySelector('#hover')
  waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))
}

// Current time & duration
{
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secondsRemainder = Math.round(seconds) % 60
    const paddedSeconds = `0${secondsRemainder}`.slice(-2)
    return `${minutes}:${paddedSeconds}`
  }

  const timeEl = document.createElement('div')
  Object.assign(timeEl, { id: 'time' })
  // querySelector('#time')
  const durationEl = document.createElement('div')
  Object.assign(durationEl, { id: 'duration' })
  // querySelector('#duration')
  waveform.appendChild(timeEl); waveform.appendChild(durationEl)
  wavesurfer.on('decode', (duration) =>
    (durationEl.textContent = formatTime(duration)))
  wavesurfer.on('timeupdate', (currentTime) =>
    (timeEl.textContent = formatTime(currentTime)))
}
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