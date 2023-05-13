# Slider SliDj

## Usage

Include plugin files

```html
<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="slidj.css">
</head>

<body>
    <script src="slidj.js"></script>
</body>
```

## Call plugin without any options

```js
const slider = new Slidj();
slider.init();
```

## html structure

```html
<div class="row-slider">
  <button type="button" class="row-slider__btn prev hidden">
    <svg class="row-slider__btn-svg prev">
      <use xlink:href="icons/sprite.svg#prev"></use>
    </svg>
  </button>
  <div class="row-slider__list">
    <div class="row-slider__item">1</div>
    <div class="row-slider__item">2</div>
    <div class="row-slider__item">3</div>
    <div class="row-slider__item">4</div>
    <div class="row-slider__item">5</div>
    <div class="row-slider__item">6</div>
    <div class="row-slider__item">7</div>
    <div class="row-slider__item">8</div>
  </div>
  <button type="button" class="row-slider__btn next hidden">
    <svg class="row-slider__btn-svg next">
      <use xlink:href="icons/sprite.svg#next"></use>
    </svg>
  </button>
</div>
```

## Options

```js
const slider = new Slidj({
  // Default Options
  sliderList: 'row-slider__list', // Class name slider list
  sliderItem: 'row-slider__item', // Class name slider item
  sliderBtn: 'row-slider__btn', // Class name slider btn
  center: 'center' // Class name slid center
});
slider.init();
```

## Demo

```shell
npm i
http-server dist
```

## Download

NPM

npm i @djas420/slidj

GitLab

git clone <https://gitlab.com/Djas420/slidj.git>

GitHub

git clone <https://github.com/Djas420/slidj.git>

## For designers

Interested in participating in an open project, write to email [design@djco.ru](mailto:design@djco.ru)
