import { addZero } from './support.js';

export const musicPlayerInit = () => {
  const audio = document.querySelector('.audio'),
    audioBtnPlay = document.querySelector('.audio-button__play'),
    audioHeader = document.querySelector('.audio-header'),
    audioImg = document.querySelector('.audio-img'),
    audioNavigation = document.querySelector('.audio-navigation'),
    audioPlayer = document.querySelector('.audio-player'),
    audioProgress = document.querySelector('.audio-progress'),
    audioProgressTiming = document.querySelector('.audio-progress__timing'),
    audioTimePassed = document.querySelector('.audio-time__passed'),
    audioTimeTotal = document.querySelector('.audio-time__total'),
    audioVolume = document.querySelector('.audio-volume'),
    audioVolumeIcon = document.querySelector('.audio-volume-icon'),
    playlist = ['hello', 'flow', 'speed'];
  let trackIndex = 0;

  const changeTrack = () => {
    const track = playlist[trackIndex];
    const wasNotPlayed = audioPlayer.paused;
    audioPlayer.src = `./audio/${track}.mp3`;
    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
    if (wasNotPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  const playTrack = () => {
    const track = playlist[trackIndex];
    audioHeader.textContent = track.toUpperCase();
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  };

  const prevTrack = () => {
    if (trackIndex !== 0) {
      trackIndex -= 1;
    } else {
      trackIndex = playlist.length - 1;
    }
    changeTrack();
  };

  const nextTrack = () => {
    if (trackIndex === playlist.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex += 1;
    }
    changeTrack();
  };

  const clickNavigationHandler = (e) => {

    if (e.target.classList.contains('audio-button__play')) {
      audio.classList.toggle('play');
      audioBtnPlay.classList.toggle('fa-play');
      audioBtnPlay.classList.toggle('fa-pause');
      playTrack();
    }

    if (e.target.classList.contains('audio-button__prev')) {
      prevTrack();
    }

    if (e.target.classList.contains('audio-button__next')) {
      nextTrack();
    }
  };

  const nextTrackOnEnd = () => {
    nextTrack();
    audioPlayer.play();
  };

  const TimeUpdate = () => {
    const currentTime = audioPlayer.currentTime,
      duration = audioPlayer.duration;
    let minutesPassed = Math.floor(currentTime / 60) || '0',
      minutesTotal = Math.floor(duration / 60) || '0',
      secondsPassed = Math.floor(currentTime % 60) || '0',
      secondsTotal = Math.floor(duration % 60) || '0';

    audioProgressTiming.style.width = (currentTime / duration) * 100 + '%';
    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
  };

  const audioProgressUpdate = (e) => {
    const x = e.offsetX;
    const fullWidth = audioProgress.clientWidth;
    audioPlayer.currentTime = (x / fullWidth) * audioPlayer.duration;
  };

  const audioVolumeUpdate = () => {
    audioPlayer.volume = audioVolume.value / 100;
  };

  const audioVolumeClickHandler = () => {
    if (audioPlayer.volume) {
      audioPlayer.volume = 0;
      audioVolumeIcon.classList.remove('fa-volume-up');
      audioVolumeIcon.classList.add('fa-volume-off');
      return;
    }
    audioPlayer.volume = audioVolume.value / 100;
    audioVolumeIcon.classList.add('fa-volume-up');
    audioVolumeIcon.classList.remove('fa-volume-off');
  };


  audioNavigation.addEventListener('click', clickNavigationHandler);
  audioPlayer.addEventListener('ended', nextTrackOnEnd);
  audioPlayer.addEventListener('timeupdate', TimeUpdate);
  audioProgress.addEventListener('click', audioProgressUpdate);
  audioVolume.addEventListener('input', audioVolumeUpdate);
  audioVolumeIcon.addEventListener('click', audioVolumeClickHandler);
};
