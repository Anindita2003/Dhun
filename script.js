const uploadInput = document.getElementById("file-upload");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");
const muteButton = document.getElementById("mute-button");
const bluetoothButton = document.getElementById("bluetooth-button");
const volumeUpButton = document.getElementById("volume-up-button");
const volumeDownButton = document.getElementById("volume-down-button");
const audioPlayer = document.getElementById("audio-player");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const volumeDisplay = document.getElementById("volume-display");
const currentVolumeDisplay = document.getElementById("current-volume");

let isPlaying = false;
let isMuted = false;
let currentTrackIndex = 0;
let currentVolume = 100;

const playlist = [
  "path/to/track1.mp3",
  "path/to/track2.mp3",
  "path/to/track3.mp3",
  // Add more tracks as needed
];

uploadInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const audioURL = URL.createObjectURL(file);
    audioPlayer.src = audioURL;
    playButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
    prevButton.disabled = true;
    nextButton.disabled = true;
  }
});

function loadTrack(index) {
  audioPlayer.src = playlist[index];
  audioPlayer.load();
}

function playCurrentTrack() {
  audioPlayer.play();
  isPlaying = true;
  playButton.disabled = true;
  pauseButton.disabled = false;
  stopButton.disabled = false;
  prevButton.disabled = false;
  nextButton.disabled = false;
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  playCurrentTrack();
}

function prevTrack() {
  currentTrackIndex =
    (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  playCurrentTrack();
}

async function connectBluetooth() {
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
    });

    const server = await device.gatt.connect();

    // Access Bluetooth service and characteristic
    // Replace 'some-service-uuid' and 'some-characteristic-uuid' with actual UUIDs
    const service = await server.getPrimaryService("some-service-uuid");
    const characteristic = await service.getCharacteristic(
      "some-characteristic-uuid"
    );

    // Perform Bluetooth operations
    // For example, read or write values to the characteristic

    alert("Bluetooth connection successful!");
  } catch (error) {
    console.error("Bluetooth connection error:", error);
    alert("Bluetooth connection failed. Check console for details.");
  }
}

playButton.addEventListener("click", function () {
  if (!isPlaying) {
    playCurrentTrack();
  }
});

pauseButton.addEventListener("click", function () {
  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
    playButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = false;
  }
});

stopButton.addEventListener("click", function () {
  if (isPlaying) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    playButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
  }
});

muteButton.addEventListener("click", function () {
  isMuted = !isMuted;
  audioPlayer.muted = isMuted;
  muteButton.innerHTML = isMuted ? "Unmute" : "Mute";
});

volumeUpButton.addEventListener("click", function () {
  if (currentVolume < 100) {
    currentVolume += 5;
    updateVolume();
  }
});

volumeDownButton.addEventListener("click", function () {
  if (currentVolume > 0) {
    currentVolume -= 10;
    updateVolume();
  }
});

function updateVolume() {
  audioPlayer.volume = currentVolume / 100;
  currentVolumeDisplay.textContent = currentVolume;
  volumeDisplay.textContent = `Volume: ${currentVolume}%`;
}

nextButton.addEventListener("click", function () {
  nextTrack();
});

prevButton.addEventListener("click", function () {
  prevTrack();
});
