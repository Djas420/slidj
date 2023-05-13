/*!
 * AdaptiveMenuDjCo v0.0.2 (https://gitlab.com/Djas420/slidj)
 * Copyright 2023 The DjCo.ru Authors
 * Licensed under MIT (https://gitlab.com/Djas420/slidj/-/blob/main/LICENSE)
 */

function Slidj(options = {}) {
  const SL = options?.sliderList || 'row-slider__list';
  const SI = options?.sliderItem || 'row-slider__item';
  const SB = options?.sliderBtn || 'row-slider__btn';
  const center = options?.center || false;

  const sliderList = document.querySelector(`.${SL}`);
  const slides = document.querySelectorAll(`.${SI}`);

  let sliderDifference = sliderList.scrollWidth - sliderList.clientWidth;
  let itemWidth = sliderList.scrollWidth / slides.length;
  let maxCountVisibility = sliderList.clientWidth / itemWidth;
  let item = (sliderDifference / slides.length) * +maxCountVisibility.toFixed(2);

  const prevBtn = document.querySelector(`.${SB}.prev`);
  const nextBtn = document.querySelector(`.${SB}.next`);

  function slide(slider, step, period) {
    const startTime = Date.now();
    const startLeft = slider.scrollLeft;
    const render = () => {
      const dt = Date.now() - startTime;
      if (dt < period) {
        // eslint-disable-next-line no-param-reassign
        slider.scrollLeft = startLeft + (step * dt) / period;
        requestAnimationFrame(render);
      }
    };
    requestAnimationFrame(render);
  }

  function getScrollLeft() {
    return sliderList.scrollLeft;
  }

  function deltaX() {
    if (sliderDifference - 5 < getScrollLeft()) {
      if (!nextBtn.classList.contains('hidden')) {
        nextBtn.classList.add('hidden');
      }
    } else if (nextBtn.classList.contains('hidden')) {
      nextBtn.classList.remove('hidden');
    }
    if (getScrollLeft() > 5) {
      if (prevBtn.classList.contains('hidden')) {
        prevBtn.classList.remove('hidden');
      }
    } else if (!prevBtn.classList.contains('hidden')) {
      prevBtn.classList.add('hidden');
    }
  }

  function resize() {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      sliderDifference = sliderList.scrollWidth - sliderList.clientWidth;
      itemWidth = sliderList.scrollWidth / slides.length;
      maxCountVisibility = sliderList.clientWidth / itemWidth;
      item = (sliderDifference / slides.length) * +maxCountVisibility.toFixed(2);
      deltaX();
    }, 100);
  }

  function scroll() {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      deltaX();
    }, 17);
  }

  function centerElem() {
    sliderList.scrollLeft = 0;
    const elem = document.querySelector(`.${SI}.${center}`);
    const elemWidth = elem.offsetWidth;
    const sw = sliderList.clientWidth;
    const eo = elem.offsetLeft;
    const leaf = (eo - (sw / 2)) + (elemWidth / 2);
    sliderList.scrollLeft = leaf;
  }

  const base = Object.create(
    {},
    {
      init: {
        value() {
          deltaX();

          prevBtn.addEventListener('click', () => {
            slide(sliderList, -item, item);
            setTimeout(deltaX, item);
          });

          nextBtn.addEventListener('click', () => {
            slide(sliderList, item, item);
            setTimeout(deltaX, item);
          });

          if (center) {
            centerElem();
          }

          sliderList.addEventListener('scroll', scroll);
          window.addEventListener('resize', resize);
        },
      },
    },
  );

  return base;
}
