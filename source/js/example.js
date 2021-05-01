const rangeField = document.querySelector('.cat-slider__range-container');// ширина всей обласи для "тыка"

if (rangeField) {
  const rangeBar = rangeField.querySelector('.cat-slider__bar');
  const rangeBarField = rangeField.querySelector('.cat-slider__range');
  let rangeFieldLen = rangeBarField.offsetWidth;
  let rangeBarLen = rangeBar.offsetWidth;

  const catsContainer = document.querySelector('.cat-slider__images');
  const fatCat = catsContainer.querySelector('.cat-slider__past-cat-block');

  const leftCounter = (offset) => {
    let left = offset - rangeBar.offsetWidth / 2;
    if (left < 0) left = 0;
    if (left > rangeBarField.offsetWidth - rangeBar.offsetWidth) left = rangeBarField.offsetWidth - rangeBar.offsetWidth;
    return `${left}px`
  }

  rangeField.addEventListener('mousedown', (evt) => {
    rangeBar.style.left = leftCounter(evt.offsetX);
  })

  rangeField.addEventListener('mouseup', (evt) => {
    rangeBar.style.left = leftCounter(evt.offsetX);

    rangeBarLen = evt.offsetX;
    const fatCatLen = Math.floor( (rangeFieldLen - rangeBarLen) / rangeFieldLen * catsContainer.offsetWidth ) + 'px';
    fatCat.style.width = fatCatLen;
  })

  // кнопки было, стало
  const btnPast = document.querySelector('.cat-slider__button--past');
  const btnNow = document.querySelector('.cat-slider__button--now');

  btnPast.addEventListener('click', () => {
    rangeBar.style.left = '0';
    rangeBar.style.right = 'auto';
    fatCat.style.width = '99%';
  })

  btnNow.addEventListener('click', () => {
    rangeBar.style.left = 'auto';
    rangeBar.style.right = '0';
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
    if (marker != bigWindow) {
      rangeFieldLen = rangeField.offsetWidth;
      rangeBarLen = rangeBar.offsetWidth;
      rangeBar.style.left = '0';
      rangeBar.style.right = 'auto';
      fatCat.style.width = '100%';
      marker = bigWindow;
    }
  })

  rangeField.addEventListener('mouseover', () => {
    rangeBar.classList.add('cat-slider__js--hover');
  })

  rangeField.addEventListener('mouseleave', () => {
    rangeBar.classList.remove('cat-slider__js--hover');
  })

  rangeField.addEventListener('mousedown', () => {
    rangeBar.classList.add('cat-slider__js--active');
  })

  rangeField.addEventListener('mouseup', () => {
    rangeBar.classList.remove('cat-slider__js--active');
  })
}
