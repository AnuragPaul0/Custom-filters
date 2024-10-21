// console.log(1)
const now = new Date();
const day = String(now.getUTCDate()).padStart(2, "0");
const month = String(now.getUTCMonth() + 1).padStart(2, "0");
const year = String(now.getUTCFullYear()).slice(-2);
const hour = String(now.getUTCHours()).padStart(2, "0");

const queryString = `cachebuster=${day}${month}${year}${hour}`;

fetch(`https://cdn.hnup.date/generated_audio.mp3?${queryString}`, {
  method: "HEAD",
})
  .then((response) => {
    const lastModified = response.headers.get("Last-Modified");
    if (lastModified) {
      const lastModifiedDate = new Date(lastModified);

      const localTime = lastModifiedDate.toLocaleString();

      document.getElementById("file-age").textContent =
        "Updated every hour, last update " + localTime;
    }
  })
  .catch((error) => {
    console.error("Error fetching file headers:", error);
  });

const options = {
  container: "#waveform",
  height: 128,
  waveColor: "#ccc4af",
  progressColor: "#f5c542",
  url: `https://cdn.hnup.date/generated_audio.mp3?${queryString}`,
  barWidth: 4,
  cursorWidth: 4,
  dragToSeek: false,
  audioRate: 1,
  hideScrollbar: false,
  mediaControls: false,
};

const wavesurfer = WaveSurfer.create(options);

wavesurfer.on("ready", (duration) => {
  const loader = document.getElementById("loader");
  if (loader) loader.remove();

  const button = document.getElementById("playPauseBtn");
  if (button) button.focus();
});

document
  .getElementById("playPauseBtn")
  .addEventListener("click", function () {
    wavesurfer.playPause();
  });

const speeds = [0.5, 1, 1.5, 2, 3];
// Set the playback rate
document.getElementById("speedRange").addEventListener("input", (e) => {
  const speed = speeds[e.target.valueAsNumber];
  document.querySelector("#rate").textContent = speed.toFixed(1);
  wavesurfer.setPlaybackRate(speed, true);
  wavesurfer.play();
});

const volumeSlider = document.getElementById("volume-slider");
const outputContainer = document.getElementById("volume-output");

volumeSlider.addEventListener("input", (e) => {
  const value = e.target.value;

  outputContainer.textContent = value;
  wavesurfer.media.volume = value / 100;
})
