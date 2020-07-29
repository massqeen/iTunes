export const videoPlayerInit = () => {
  const videoBtnPlay = document.querySelector('.video-button__play'),
    videoBtnStop = document.querySelector('.video-button__stop'),
    videoFullscreen = document.querySelector('.video-fullscreen'),
    videoPLayer = document.querySelector('.video-player'),
    videoProgress = document.querySelector('.video-progress'),
    videoTimePassed = document.querySelector('.video-time__passed'),
    videoTimeTotal = document.querySelector('.video-time__total'),
    videoVolume = document.querySelector('.video-volume'),
    videoVolumeIcon = document.querySelector('.video-volume-icon');

  videoPLayer.volume = videoVolume.value / 100;

  const videoClickHandler = () => {
    if (videoPLayer.paused) {
      videoPLayer.play();
    } else {
      videoPLayer.pause();
    }
  };

  const toggleIcon = () => {
    if (videoPLayer.paused) {
      videoBtnPlay.classList.remove('fa-pause');
      videoBtnPlay.classList.add('fa-play');
    } else {
      videoBtnPlay.classList.add('fa-pause');
      videoBtnPlay.classList.remove('fa-play');
    }
  };

  const enterFullScreen = () => {
    videoPLayer.requestFullscreen();
  };

  const stopClickHandler = () => {
    videoPLayer.pause();
    videoPLayer.currentTime = 0;
  };

  const addZero = (n) => n < 10 ? `0${n}` : n;

  const timeUpdate = () => {
    const currentTime = videoPLayer.currentTime,
      duration = videoPLayer.duration;
    let minutesPassed = addZero(Math.floor(currentTime / 60)),
      minutesTotal = addZero(Math.floor(duration / 60)),
      secondsPassed = addZero(Math.floor(currentTime % 60)),
      secondsTotal = addZero(Math.floor(duration % 60));

    videoProgress.value = (currentTime / duration) * 100;
    videoTimePassed.textContent = `${minutesPassed}:${secondsPassed}`;
    videoTimeTotal.textContent = `${minutesTotal}:${secondsTotal}`;
  };

  const videoProgressUpdate = () => videoPLayer.currentTime = videoProgress.value * videoPLayer.duration / 100;

  const videoVolumeUpdate = () => {
    videoPLayer.volume = videoVolume.value / 100;
  };

  const videoVolumeClickHandler = () => {
    if (videoPLayer.volume) {
      videoPLayer.volume = 0;
      videoVolumeIcon.classList.remove('fa-volume-up');
      videoVolumeIcon.classList.add('fa-volume-off');
      return;
    }
    videoPLayer.volume = videoVolume.value / 100;
    videoVolumeIcon.classList.add('fa-volume-up');
    videoVolumeIcon.classList.remove('fa-volume-off');
  };

  videoBtnPlay.addEventListener('click', videoClickHandler);
  videoBtnStop.addEventListener('click', stopClickHandler);
  videoFullscreen.addEventListener('click', enterFullScreen);
  videoPLayer.addEventListener('click', videoClickHandler);
  videoPLayer.addEventListener('play', toggleIcon);
  videoPLayer.addEventListener('pause', toggleIcon);
  videoPLayer.addEventListener('timeupdate', timeUpdate);
  videoProgress.addEventListener('input', videoProgressUpdate);
  videoVolume.addEventListener('input', videoVolumeUpdate);
  videoVolumeIcon.addEventListener('click', videoVolumeClickHandler);
};
