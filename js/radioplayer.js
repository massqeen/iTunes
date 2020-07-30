export const radioPlayerInit = () => {
  const radioPlayer = document.querySelector('.radio'),
    radioCoverImg = document.querySelector('.radio-cover__img'),
    radioHeaderBig = document.querySelector('.radio-header__big'),
    radioItem = document.querySelectorAll('.radio-item'),
    radioNavigation = document.querySelector('.radio-navigation'),
    radioStop = document.querySelector('.radio-stop'),
    radioVolume = document.querySelector('.radio-volume'),
    radioVolumeIcon = document.querySelector('.radio-volume-icon');

  const radio = new Audio();
  radio.type = 'audio/aac';
  radioStop.disabled = true;
  radio.volume = radioVolume.value / 100;

  const selectCurrStation = (elem) => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  };

  const radioClickHandler = (e) => {
    const parent = e.target.closest('.radio-item');
    radioHeaderBig.textContent = parent.querySelector('.radio-name').textContent;
    radioCoverImg.src = parent.querySelector('.radio-img').src;
    radioStop.disabled = false;
    radio.src = e.target.dataset.radioStation;
    selectCurrStation(parent);
    parent.classList.add('select');
    togglePlayIcon();
    radio.play().then(r => r);
  };

  const stopClickHandler = () => {
    if (radio.paused) {
      togglePlayIcon();
      radio.play().then(r => r);
      return;
    }
    togglePlayIcon();
    radio.pause();
  };

  const togglePlayIcon = () => {
    if (radio.paused) {
      radioPlayer.classList.add('play');
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
      return;
    }
    radioPlayer.classList.remove('play');
    radioStop.classList.remove('fa-stop');
    radioStop.classList.add('fa-play');
  };

  const radioVolumeUpdate = () => {
    radio.volume = radioVolume.value / 100;
  };

  const radioVolumeClickHandler = () => {
    if (radio.volume) {
      radio.volume = 0;
      radioVolumeIcon.classList.remove('fa-volume-up');
      radioVolumeIcon.classList.add('fa-volume-off');
      return;
    }
    radio.volume = radioVolume.value / 100;
    radioVolumeIcon.classList.add('fa-volume-up');
    radioVolumeIcon.classList.remove('fa-volume-off');
  };

  radioPlayerInit.pause = () => {
    radio.pause();
    radioPlayer.classList.remove('play');
    radioStop.classList.remove('fa-stop');
    radioStop.classList.add('fa-play');
  };

  radioNavigation.addEventListener('change', radioClickHandler);
  radioStop.addEventListener('click', stopClickHandler);
  radioVolume.addEventListener('input', radioVolumeUpdate);
  radioVolumeIcon.addEventListener('click', radioVolumeClickHandler);
};
