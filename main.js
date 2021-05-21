const player = document.querySelector(".player");
const video = player.querySelector(".player__video");
const playBtn = player.querySelector(".play");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const volume = player.querySelector(".player__slider");
const forward = player.querySelector(".forward");
const backward = player.querySelector(".backward");
const skip = player.querySelectorAll("[data-skip]");
const fullScreen = player.querySelector(".fullscreen");
const sound = player.querySelector(".sound");

const togglePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updateBtn = () => {
  const icon = video.paused
    ? "<i class='fas fa-play'></i>"
    : "<i class='fas fa-pause'></i>";
  playBtn.innerHTML = icon;
};

const skipHandler = (e) => {
  let skipDuration = e.target.parentElement.dataset.skip;
  video.currentTime += parseFloat(skipDuration);
};

const volumeAnimation = () => {
  if (!video.volume) {
    sound.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    sound.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
};

const rangeHandler = (e) => {
  video.volume = e.target.value;
  volumeAnimation(video);
};

const progressHandler = () => {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
};

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const openFullscreen = () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    /* Safari */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    /* IE11 */
    video.msRequestFullscreen();
  }
};

const toggleSound = () => {
  if (video.volume) {
    video.volume = 0;
    volumeAnimation();
  } else {
    video.volume = 1;
    volume.value = 1;
    volumeAnimation();
  }
};

let mousedown = false;

video.addEventListener("click", togglePlay);
playBtn.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
skip.forEach((element) => element.addEventListener("click", skipHandler));
volume.addEventListener("change", rangeHandler);
video.addEventListener("timeupdate", progressHandler);
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
fullScreen.addEventListener("click", openFullscreen);
sound.addEventListener("click", toggleSound);
