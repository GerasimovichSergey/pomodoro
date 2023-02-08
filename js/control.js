import { showTime, startTimer } from './timer.js';
import { state } from './state.js';


const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');
const navigationButtons = document.querySelectorAll('.navigation__btn');

export const changeActiveBtn = (dataUse) => {
  state.status = dataUse;

  for (let i = 0; i < navigationButtons.length; i++) {
    if (navigationButtons[i].dataset.use === dataUse) {
      navigationButtons[i].classList.add('navigation__btn_active');
    } else {
      navigationButtons[i].classList.remove('navigation__btn_active');
    }
  }
}

const stop = () => {
  state.isActive = false;
  btnStart.textContent = 'Старт';
  state.timeLeft = state[state.status] * 60;
  showTime(state.timeLeft);
}

export const initControl = () => {
  btnStart.addEventListener('click', () => {
    if (state.isActive) {
      clearTimeout(state.timerId);
      state.isActive = false;
      btnStart.textContent = 'Старт';
    } else {
      state.isActive = true;
      btnStart.textContent = 'Пауза';
      startTimer();
    }
  });

  btnStop.addEventListener('click', stop);

  for (let i = 0; i < navigationButtons.length; i++) {
    navigationButtons[i].addEventListener('click', () => {
      changeActiveBtn(navigationButtons[i].dataset.use);
      stop();
    })
  }

  showTime(state.timeLeft);
};

