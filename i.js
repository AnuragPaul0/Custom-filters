// Create your own media element
const audi = new Audio()
audi.controls = true
audi.src = 'https://wavesurfer.xyz/wavesurfer-code/examples/audio/audio.wav'
// https://cdn.hnup.date/generated_audio.mp3?${queryString}'

// Create a WaveSurfer instance and pass the media element
const wavesurferr = WaveSurfer.create({
  container: document.body,
  waveColor: 'rgb(200, 0, 200)',
  progressColor: 'rgb(100, 0, 100)',
  media: audi, // <- this is the important part
})

// Optionally, add the audio to the page to see the controls
document.body.appendChild(audi)

// Now, create a Web Audio equalizer

// Create Web Audio context
const audiContext = new AudioContext()

// Create a biquad filter for each band
const filters2 = eqBands.map((band) => {
  const filter = audiContext.createBiquadFilter()
  filter.type = band <= 32 ? 'lowshelf' : band >= 16000 ? 'highshelf' : 'peaking'
  filter.gain.value = Math.random() * 40 - 20
  filter.Q.value = 1 // resonance
  filter.frequency.value = band // the cut-off frequency
  return filter
})

// Connect the audio to the equalizer
audi.addEventListener(
  'canplay',
  () => {
    // Create a MediaElementSourceNode from the audio element
    const mediaNode = audiContext.createMediaElementSource(audi)

    // Connect the filters and media node sequentially
    const equalizer = filters2.reduce((prev, curr) => {
      prev.connect(curr)
      return curr
    }, mediaNode)

    // Connect the filters to the audio output
    equalizer.connect(audiContext.destination)
  },
  { once: true },
)

// Create a vertical slider for each band
const container2 = document.createElement('p')
filters2.forEach((filter) => {
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
  container2.appendChild(slider)
})
document.body.appendChild(container2)