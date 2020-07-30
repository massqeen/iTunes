import {addZero} from './support.js';

export const videoPlayerInit = () => {
  const videoBtnPlay = document.querySelector('.video-button__play'),
    videoBtnStop = document.querySelector('.video-button__stop'),
    videoFullscreen = document.querySelector('.video-fullscreen'),
    videoPlayer = document.querySelector('.video-player'),
    videoProgress = document.querySelector('.video-progress'),
    videoTimePassed = document.querySelector('.video-time__passed'),
    videoTimeTotal = document.querySelector('.video-time__total'),
    videoVolume = document.querySelector('.video-volume'),
    videoVolumeIcon = document.querySelector('.video-volume-icon');

  videoPlayer.volume = videoVolume.value / 100;

  const videoClickHandler = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoBtnPlay.classList.remove('fa-pause');
      videoBtnPlay.classList.add('fa-play');
    } else {
      videoBtnPlay.classList.add('fa-pause');
      videoBtnPlay.classList.remove('fa-play');
    }
  };

  const enterFullScreen = () => {
    videoPlayer.requestFullscreen();
  };

  const stopClickHandler = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  const timeUpdate = () => {
    const currentTime = videoPlayer.currentTime,
      duration = videoPlayer.duration;
    let minutesPassed = Math.floor(currentTime / 60),
      minutesTotal = Math.floor(duration / 60),
      secondsPassed = Math.floor(currentTime % 60),
      secondsTotal = Math.floor(duration % 60);

    videoProgress.value = (currentTime / duration) * 100;
    videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
  };

  const videoProgressUpdate = () => videoPlayer.currentTime = videoProgress.value * videoPlayer.duration / 100;

  const videoVolumeUpdate = () => {
    videoPlayer.volume = videoVolume.value / 100;
  };

  const videoVolumeClickHandler = () => {
    if (videoPlayer.volume) {
      videoPlayer.volume = 0;
      videoVolumeIcon.classList.remove('fa-volume-up');
      videoVolumeIcon.classList.add('fa-volume-off');
      return;
    }
    videoPlayer.volume = videoVolume.value / 100;
    videoVolumeIcon.classList.add('fa-volume-up');
    videoVolumeIcon.classList.remove('fa-volume-off');
  };

  videoBtnPlay.addEventListener('click', videoClickHandler);
  videoBtnStop.addEventListener('click', stopClickHandler);
  videoFullscreen.addEventListener('click', enterFullScreen);
  videoPlayer.addEventListener('click', videoClickHandler);
  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);
  videoPlayer.addEventListener('timeupdate', timeUpdate);
  videoProgress.addEventListener('input', videoProgressUpdate);
  videoVolume.addEventListener('input', videoVolumeUpdate);
  videoVolumeIcon.addEventListener('click', videoVolumeClickHandler);
};
