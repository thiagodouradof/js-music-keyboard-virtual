const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

let mapedKeys = [];
let audio = new Audio("src/tunes/a.wav");

const playTune = (key) => {
  audio.src = `src/tunes/${key}.wav`;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
  mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
  if (mapedKeys.includes(e.key)) {
    playTune(e.key);
  }
});

const handleVolume = (e) => {
  audio.volume = e.target.value;
};

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

volumeSlider.addEventListener("input", handleVolume);

keysCheck.addEventListener("click", showHideKeys);

let metronomeInterval;
const metronomeBPMInput = document.querySelector('.metronome input');
const toggleMetronomeButton = document.getElementById('toggle-metronome');
let metronomeActive = false;

const startMetronome = () => {
  if (metronomeActive) return;
  
  const bpm = metronomeBPMInput.value;
  const interval = 60000 / bpm;

  metronomeActive = true;
  metronomeInterval = setInterval(() => {
    audio.src = 'src/tunes/click.wav'; // Suponha que você tenha um arquivo de clique
    audio.play();
  }, interval);
  toggleMetronomeButton.textContent = 'Parar';
};

const stopMetronome = () => {
  clearInterval(metronomeInterval);
  metronomeActive = false;
  toggleMetronomeButton.textContent = 'Iniciar';
};

toggleMetronomeButton.addEventListener('click', () => {
  if (metronomeActive) {
    stopMetronome();
  } else {
    startMetronome();
  }
});
