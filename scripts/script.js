const WHITE_KEYS = ["a", "s", "d", "f", "g", "h", "j"];
const BLACK_KEYS = ["w", "e", "t", "y", "u"];

const recordButton = document.querySelector(".record-button.btn");
const playButton = document.querySelector(".play-button.btn");
const keys = document.querySelectorAll(".key");
const whiteKeys = document.querySelectorAll(".key.white");
const blackKeys = document.querySelectorAll(".key.black");

const keyMap = [...keys].reduce((map, key) => {
  map[key.dataset.note] = key;
  return map;
}, {});

keys.forEach((key) => {
  key.addEventListener("mousedown", () => playNote(key));
});

recordButton.addEventListener("click", toggleRecording);

playButton.addEventListener("click", playSong);

document.addEventListener("keyup", () =>
  keys.forEach((key) => key.classList.remove("active"))
);

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) {
    playNote(whiteKeys[whiteKeyIndex]);
    whiteKeys[whiteKeyIndex].classList.add("active");
  }

  if (blackKeyIndex > -1) {
    playNote(blackKeys[blackKeyIndex]);
    blackKeys[blackKeyIndex].classList.add("active");
  }
});

function toggleRecording() {
  recordButton.classList.toggle("active");
  if (isRecording()) {
    startRecording();
  } else {
    stopRecording();
  }
}

function isRecording() {
  return recordButton != null && recordButton.classList.contains("active");
}

function startRecording() {
  recordingStartTime = Date.now();
  songNotes = [];
  playButton.classList.remove("show");
}

function stopRecording() {
  playButton.classList.add("show");
}

function playSong() {
  if (songNotes.length === 0) return;
  songNotes.forEach((note) => {
    setTimeout(() => {
      playNote(keyMap[note.key]);
    }, note.startTime);
  });
}

function playNote(key) {
  if (isRecording()) recordNote(key.dataset.note);
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
}

function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recordingStartTime,
  });
}
