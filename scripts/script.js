const WHITE_KEYS = ["a", "s", "d", "f", "g", "h", "j"];
const BLACK_KEYS = ["w", "e", "t", "y", "u"];

const keys = document.querySelectorAll(".key");
const whiteKeys = document.querySelectorAll(".key.white");
const blackKeys = document.querySelectorAll(".key.black");

keys.forEach((key) => {
  key.addEventListener("mousedown", () => playNote(key));
});

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

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
}
