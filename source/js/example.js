const rangeField = document.querySelector('.cat-slider__range-container');
if (rangeField) {
  const rangeBar = rangeField.querySelector('.cat-slider__bar');
  let rangeFieldLen = rangeField.offsetWidth; // ширина всей обласи для "тыка"
  let rangeBarLen = rangeBar.offsetWidth;

  const catsContainer = document.querySelector('.cat-slider__images');
  const fatCat = catsContainer.querySelector('.cat-slider__past-cat-block');

  rangeField.addEventListener('mousedown', (evt) => {
    rangeBar.style.width = evt.offsetX + 'px';
  })

  rangeField.addEventListener('mouseup', (evt) => {
    rangeBarLen = evt.offsetX;
    rangeBar.style.width = rangeBarLen + 'px';
    const fatCatLen = Math.floor(rangeBarLen / rangeFieldLen * catsContainer.offsetWidth) + "px";
    fatCat.style.width = fatCatLen;
  })

  // кнопки было, стало
  const btnPast = document.querySelector('.cat-slider__button--past');
  const btnNow = document.querySelector('.cat-slider__button--now');

  btnPast.addEventListener('click', () => {
    rangeBar.style.width = '99%';
    fatCat.style.width = '99%';
  })

  btnNow.addEventListener('click', () => {
    rangeBar.style.width = '1%'
    fatCat.style.width = '1%'
  })

  // вычисляю переход от mobil к tableе
  let bigWindow = window.innerWidth > 767;
  let marker = bigWindow; // чтоб было с чем сравнивать

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      bigWindow = false;
    } else {
      bigWindow = true;
    }

    // если предыдущее значение ширины окна по "другую сторону" от текущего,
    // то сбрасываю значения
    if(marker != bigWindow) {
      rangeFieldLen = rangeField.offsetWidth;
      rangeBarLen = rangeBar.offsetWidth;
      rangeBar.style.width = '50%';
      fatCat.style.width = '50%';
      marker = bigWindow;
    }
  })

  toggle = rangeField.querySelector('.cat-slider__toggle');

  rangeField.addEventListener('mouseover', () => {
    toggle.classList.add('cat-slider__toggle--hover');
  })

  rangeField.addEventListener('mouseleave', () => {
    toggle.classList.remove('cat-slider__toggle--hover');
  })

  rangeField.addEventListener('mousedown', () => {
    toggle.classList.add('cat-slider__toggle--active');
  })

  rangeField.addEventListener('mouseup', () => {
    toggle.classList.remove('cat-slider__toggle--active');
  })
}
