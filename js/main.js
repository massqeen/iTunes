import { radioPlayerInit } from './radioplayer.js';
import { videoPlayerInit } from './videoplayer.js';
import { musicPlayerInit } from './musicplayer.js';

const playerAudio = document.querySelector('.player-audio'),
  playerBlock = document.querySelectorAll('.player-block'),
  playerBtn = document.querySelectorAll('.player-btn');

const deactivateTempHeader = () =>
  (document.querySelector('.temp').style.display = 'none');

const deactivateTabs = () => {
  playerBlock.forEach((item) => item.classList.remove('active'));
  playerBtn.forEach((item) => item.classList.remove('active'));
};

const playerBtnClickHandler = (btn, i) => {
  deactivateTabs();
  deactivateTempHeader();
  btn.classList.add('active');
  playerBlock[i].classList.add('active');
};

playerBtn.forEach((btn, i) => {
  btn.addEventListener('click', () => playerBtnClickHandler(btn, i));
});

radioPlayerInit();
videoPlayerInit();
musicPlayerInit();
