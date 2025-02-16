const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const stopBtn = document.getElementById("stop");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const volumeSlider = document.getElementById("volume");
const currentTimeDisplay = document.getElementById("current-time");
const totalDurationDisplay = document.getElementById("total-duration");
const title = document.getElementById("title");
const musicImage = document.getElementById("music-image");

// Array of songs with title and image
const songs = [
    { src: "song1.mp3", title: "Song 1", image: "cover1.jpg" },
    { src: "song2.mp3", title: "Song 2", image: "cover2.jpg" },
    { src: "song3.mp3", title: "Song 3", image: "cover3.jpg" }
];

let songIndex = 0;

// Load Song
function loadSong(index) {
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    musicImage.src = songs[index].image;
    audio.load();
}

// Play or Pause Music
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸ Pause";
    } else {
        audio.pause();
        playBtn.textContent = "▶ Play";
    }
});

// Stop Music
stopBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    playBtn.textContent = "▶ Play";
});

// Next Song
nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
});

// Previous Song
prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audio.play();
});

// Volume Control
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

// Update Duration Display
audio.addEventListener("loadedmetadata", () => {
    totalDurationDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Format Time (mm:ss)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}

// Load the first song initially
loadSong(songIndex);
