document.querySelector('.no-js-map').style.display = 'none';

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
// нужно для изменения размера и положения маркера 'img/icons/map-logo-marker.png'
// при переходе между брэкпоинтами:
const windowSizer = () => {
  if (window.innerWidth > 1439) return 3;
  if (window.innerWidth > 767) return 2;
  return 1;
}

const map = document.querySelector('#map');

// убирает все карты кроме одной
const killmaps = () => {
  const ymapsAll = document.querySelectorAll('#map > ymaps');
  for (let i=1; i<ymapsAll.length; i++) {
    ymapsAll[0].remove();
  }
}

let windowSize = windowSizer();

ymaps.ready(() => showMap(windowSize));

window.addEventListener('resize', () => {
  const windowSizeNow = windowSizer();
  if (windowSizeNow != windowSize) {
    const ymapsBlock = map.querySelector('ymaps');
    if (ymapsBlock) ymapsBlock.remove();
    ymaps.ready(() => showMap(windowSizeNow));
    windowSize = windowSizeNow;
    //fix
    setTimeout(killmaps, 50);
    setTimeout(killmaps, 100);
    setTimeout(killmaps, 1000);
    setTimeout(killmaps, 10000);
  }
})
// <-мои костыли
