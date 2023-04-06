/*!
 * AdaptiveMenuDjCo v0.0.1 (https://gitlab.com/Djas420/slidj)
 * Copyright 2023 The DjCo.ru Authors
 * Licensed under MIT (https://gitlab.com/Djas420/slidj/-/blob/main/LICENSE)
 */

function Slidj(sl, si, sb) {
  const SL = sl || 'row-slider__list';
  const SI = si || 'row-slider__item';
  const SB = sb || 'row-slider__btn';

  const sliderList = document.querySelector(`.${SL}`);
  const slides = document.querySelectorAll(`.${SI}`);

  let sliderВifference = sliderList.scrollWidth - sliderList.clientWidth;
  let itemWidth = sliderList.scrollWidth / slides.length;
  let maxCountVisibility = sliderList.clientWidth / itemWidth;
  let item = (sliderВifference / slides.length) * +maxCountVisibility.toFixed(2);

  const prevBtn = document.querySelector(`.${SB}.prev`);
  const nextBtn = document.querySelector(`.${SB}.next`);

  function slide(slider, step, period) {
    const startTime = Date.now();
    const startLeft = slider.scrollLeft;
    const render = () => {
      const dt = Date.now() - startTime;
      if (dt < period) {
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
    if (sliderВifference - 5 < getScrollLeft()) {
      if (!nextBtn.classList.contains('hidden')) {
        nextBtn.classList.add('hidden');
      }
    } else {
      if (nextBtn.classList.contains('hidden')) {
        nextBtn.classList.remove('hidden');
      }
    }
    if (getScrollLeft() > 5) {
      if (prevBtn.classList.contains('hidden')) {
        prevBtn.classList.remove('hidden');
      }
    } else {
      if (!prevBtn.classList.contains('hidden')) {
        prevBtn.classList.add('hidden');
      }
    }
  }

  function resize() {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      sliderВifference = sliderList.scrollWidth - sliderList.clientWidth;
      itemWidth = sliderList.scrollWidth / slides.length;
      maxCountVisibility = sliderList.clientWidth / itemWidth;
      item = (sliderВifference / slides.length) * +maxCountVisibility.toFixed(2);
      deltaX();
    }, 100);
  }

  function scroll() {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      deltaX();
    }, 17);
  }

  const base = Object.create({},
    {
      init: {
        value: function () {
          deltaX();

          prevBtn.addEventListener('click', () => {
            slide(sliderList, -item, item);
            setTimeout(deltaX, item);
          });

          nextBtn.addEventListener('click', () => {
            slide(sliderList, item, item);
            setTimeout(deltaX, item);
          });

          sliderList.addEventListener('scroll', scroll);
          window.addEventListener('resize', resize);
        }
      }
    }
  )

  return base;
}
