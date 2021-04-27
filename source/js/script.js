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
    const fatCatLen = Math.floor(rangeBarLen / rangeFieldLen * catsContainer.offsetWidth) + 'px';
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

const menuBtn = document.querySelector('.page-header__nav-toggle');
const spanBtn = menuBtn.querySelector('span');
const menuList = document.querySelector('.site-list');

if (window.innerWidth < 768) {
  menuList.style.display = 'none';
}

window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    menuList.style.display = 'none';
    bigWindow = false; // for example.js
  } else {
    menuList.style.display = 'flex';
    bigWindow = true; // for example.js
  }
})

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

const links = document.querySelectorAll('.site-list__link');
links.forEach(link => {
  link.classList.remove('site-list__link--current');
  if(!link.href) {
    link.classList.add('site-list__link--current');
  }
})

document.querySelector('.footer-location__no-js-text').style.display = 'none';
function showMap(windowSize) {

  // мои костыли ->
  const markerSize = () => {
    if (windowSize < 2) return [57, 53];
    return [115, 106];
  }

  const markerOffset = () => {
    if (windowSize < 2) return [-24, -53];
    return [-57, -106];
  }

  const centerMarker = () => {
    if (windowSize == 3) return [59.939135, 30.318518];
    return [59.938635, 30.323118];
  }

  const srcMaker = (numMarker) => {
    if ((numMarker == 1 && windowSize < 3) || (numMarker == 2 && windowSize == 3)) return 'img/icons/map-logo-marker.png';
    return '';
  }
  // <- мои костыли


  var myMap = new ymaps.Map('map', {

      center: centerMarker(),

      zoom: 16

  }, {

      searchControlProvider: 'yandex#search'

  }),



  // Создаём макет содержимого.

  MyIconContentLayout = ymaps.templateLayoutFactory.createClass(

      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'

  ),



  myPlacemark = new ymaps.Placemark(myMap.getCenter(), {

      hintContent: 'Кэт энерджи',

      balloonContent: ''

  }, {

      // Опции.

      // Необходимо указать данный тип макета.

      iconLayout: 'default#image',

      // Своё изображение иконки метки.

      iconImageHref: srcMaker(1),



      // Размеры метки.

      iconImageSize: markerSize(),

      // Смещение левого верхнего угла иконки относительно

      // её "ножки" (точки привязки).

      iconImageOffset: markerOffset()

  }),

  myPlacemarkWithContent = new ymaps.Placemark([59.938635, 30.323118], {

    hintContent: 'Кэт энерджи',

    balloonContent: '',

    iconContent: '12'

}, {

    // Опции.

    // Необходимо указать данный тип макета.

    iconLayout: 'default#imageWithContent',

    // Своё изображение иконки метки.

    iconImageHref: srcMaker(2),

    // Размеры метки.

    iconImageSize: markerSize(),

    // Смещение левого верхнего угла иконки относительно

    // её "ножки" (точки привязки).

    iconImageOffset: markerOffset(),

    // Смещение слоя с содержимым относительно слоя с картинкой.

    iconContentOffset: [15, 15],

    // Макет содержимого.

    iconContentLayout: MyIconContentLayout

});


  myMap.geoObjects

      .add(myPlacemark)

      .add(myPlacemarkWithContent);

}

// мои костыли ->
const windowSizer = () => {
  if (window.innerWidth > 1439) return 3;
  if (window.innerWidth > 767) return 2;
  return 1;
}

const map = document.querySelector('#map')
let windowSize = windowSizer();

ymaps.ready(() => showMap(windowSize));

window.addEventListener('resize', () => {
  const windowSizeNow = windowSizer();
  if (windowSizeNow != windowSize) {
    const ymapsBlock = map.querySelector('ymaps');
    if (ymapsBlock) ymapsBlock.remove();
    ymaps.ready(() => showMap(windowSizeNow));
    windowSize = windowSizeNow;
  }
})
// <-мои костыли
