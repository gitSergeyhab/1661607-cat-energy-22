const rangeField = document.querySelector('.cat-slider__range');
if (rangeField) {
  const rangeBar = rangeField.querySelector('.cat-slider__bar');
  const rangeFieldLen = rangeField.offsetWidth;
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
}

const menuBtn = document.querySelector('.page-header__nav-toggle');
const spanBtn = menuBtn.querySelector('span');
const menuList = document.querySelector('.site-list');

menuList.style.display = 'none';
spanBtn.classList.add('page-header__nav-open');

menuBtn.addEventListener('click', () => {
    spanBtn.classList.toggle('page-header__nav-open');
    spanBtn.classList.toggle('page-header__nav-close');
    if(spanBtn.classList.contains('page-header__nav-open')) {
        menuList.style.display = 'none';
    } else {
        menuList.style.display = 'flex';
    }
})

const links = document.querySelectorAll('.site-list__item a');
links.forEach(link => {
  link.parentNode.classList.remove('site-list__item--current');
  if(!link.href) {
    link.parentNode.classList.add('site-list__item--current');
  }
})
