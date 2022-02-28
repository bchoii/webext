const videos = document.getElementsByTagName('video');

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const _incVideoTime = (inc) => {
  for (const video of videos) {
    video.currentTime += inc;
  }
};

const _setVideoRate = (rate) => {
  for (const video of videos) {
    if (rate < 32) {
      video.playbackRate = rate;
    }
  }
};

const _incVideoRate = (inc) => {
  for (const video of videos) {
    _setVideoRate(video.playbackRate * inc);
  }
};

const _incVideoVolume = (inc) => {
  for (const video of videos) {
    video.volume = clamp(video.volume + inc, 0, 1);
  }
};

document.onkeydown = (event) => {
  switch (event.key) {
    case 'q':
      _incVideoVolume(-0.1);
      break;
    case 'w':
      _incVideoVolume(0.1);
      break;
    case 'a':
      _setVideoRate(1);
      break;
    case 's':
      _incVideoRate(0.5);
      break;
    case 'd':
      _incVideoRate(2);
      break;
    case 'z':
      _incVideoTime(-3);
      break;
    case 'x':
      _incVideoTime(5);
      break;
    case 'v':
      _incVideoTime(30);
      break;
    case 'b':
      _incVideoTime(60);
      break;
    default:
      break;
  }
};
