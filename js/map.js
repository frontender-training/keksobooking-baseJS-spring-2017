'use strict';

var AVATARS = shuffle([
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
]);

var TITLE_ADS = shuffle([
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
]);

var TYPE_OF_ROOMS = ['flat', 'house', 'bungalo'];
var NUMBER_OF_ROOMS = ['1', '2', '3', '4', '5'];
var TIME_CHECKIN = ['12:00', '13:00', '14:00'];
var TIME_CHECKOUT = ['12:00', '13:00', '14:00'];
var FACILITY = ['wifi', 'dishwasher', 'parking', 'elevator', 'conditioner'];

var COUNT_USERS = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MARKER_HEIGHT = 75;
var MARKER_WIDTH = 56;

// Функция, меняющая порядок в массиве
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) { // Задаем переменную, у которой числовое значение будет определяться рандомно
    var randomIndex = Math.floor(Math.random() * (i + 1)); // Задаем переменную, у которой числовое значение будет определяться рандомно
    var temporaryValue = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Функция, создающая случайное число в заданном промежутке
function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

// Функция, возращающая случайное число
function getRandomArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// Функция, создающая массив произвольной длины
function getFeatures(array) {
  var clone = array.slice();
  clone.length = getRandom(1, array.length);
  return clone;
}

function createAds(i) {

  var locationX = getRandom(300, 900);
  var locationY = getRandom(100, 500);

  return {
    'author': {
      'avatar': AVATARS[i] // Перебираем массив и ставим первое значение обновленного массива
    },
    'offer': {
      'title': TITLE_ADS[i], // Перебираем массив и ставим первое значение обновленного массива
      'adress': (locationX + ', ' + locationY),
      'price': getRandom(MIN_PRICE, MAX_PRICE),  // число, случайная цена от 1000 до 1 000 000
      'type': getRandomArray(TYPE_OF_ROOMS), // Выбираем случайное число из массива типа комнат
      'rooms': getRandomArray(NUMBER_OF_ROOMS), // Выбираем случайное число из массива количества комнат
      'guests': getRandom(1, 20), // число, случайное количество гостей, которое можно разместить
      'checkin': getRandomArray(TIME_CHECKIN),  // Выбираем случайное число из массива времени заезда
      'checkout': getRandomArray(TIME_CHECKOUT), // Выбираем случайное число из массива времени выезда
      'features': getFeatures(FACILITY), // Выбираем случайное число из массива удобств
      'description': '',
      'photos': []
    },
    'location': {
      'x': locationX, // случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
      'y': locationY // случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
    }
  };
}

function getAds() {
  var i;
  var ads = [];
  for (i = 0; i < COUNT_USERS; i++) {
    ads.push(createAds(i));
  }
  return ads;
}

// Создаем шаблон по которому будет собираться все меткм для карты
function createMark(ad) {
  var userLocation = document.createElement('div');
  var userAvatar = document.createElement('img');
  userLocation.className = 'pin';
  userLocation.style.left = (ad.location.x - MARKER_HEIGHT) + 'px';
  userLocation.style.top = ad.location.y - (MARKER_WIDTH / 2) + 'px';
  userAvatar.className = 'rounded';
  userAvatar.width = 40;
  userAvatar.height = 40;
  userAvatar.src = ad.author.avatar;
  userLocation.appendChild(userAvatar);
  return userLocation;
}

// Переводим название типов жилья на русский
function translateType(type) {
  if (type === 'flat') {
    return 'Квартира';
  }
  if (type === 'bungalo') {
    return 'Бунгало';
  }
  if (type === 'house') {
    return 'Дом';
  }
  return type;
}

function getGuestsAndRooms(guests, rooms) {
  return 'Для ' + guests + ' гостей в ' + rooms + ' комнатах';
}

function getTime(checkin, checkout) {
  return 'Заезд после ' + checkin + ', выезд ' + checkout;
}

function getPrice(price) {
  return price + ' &#x20bd;/ночь';
}

// Создаем иконку удобств
function createIconFeature(feature) {
  var iconFeature = document.createElement('span');
  iconFeature.classList.add('feature__image');
  iconFeature.classList.add('feature__image--' + feature);
  return iconFeature;
}

// Проходим по всему массиву
function generateIconsFeatures(arrayFeatures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayFeatures.length; i++) {
    var feature = createIconFeature(arrayFeatures[i]);
    fragment.appendChild(feature);
  }
  return fragment;
}

var ads = getAds();
createOffer(ads[0]);
insertPins();

// Вставляем полученные метки в карту
function insertPins() {
  var tokyoPinMap = document.getElementsByClassName('tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 8; i++) {
    fragment.appendChild(createMark(ads[i]));
  }
  tokyoPinMap[0].appendChild(fragment);
}

function createOffer(ad) {
  var offer = ad.offer;
  var author = ad.author;
  var offerDialog = document.querySelector('#offer-dialog'); // Берем элемент, в который будем вставлять наш шаблон
  var userAds = offerDialog.getElementsByClassName('dialog__panel')[0];

  var adsList = userAds.cloneNode(true);
  var dialogTitle = offerDialog.querySelector('.dialog__title > img');
  dialogTitle.src = author.avatar;

  adsList.getElementsByClassName('lodge__title')[0].textContent = offer.title;
  adsList.getElementsByClassName('lodge__address')[0].textContent = offer.adress;
  adsList.getElementsByClassName('lodge__price')[0].innerHTML = getPrice(offer.price);
  adsList.getElementsByClassName('lodge__type')[0].textContent = translateType(offer.type);
  adsList.getElementsByClassName('lodge__rooms-and-guests')[0].textContent = getGuestsAndRooms(offer.guests, offer.rooms);
  adsList.getElementsByClassName('lodge__checkin-time')[0].textContent = getTime(offer.checkin, offer.checkout);
  removeChilds(adsList.getElementsByClassName('lodge__features')[0]);
  adsList.getElementsByClassName('lodge__features')[0].appendChild(generateIconsFeatures(offer.features));
  adsList.getElementsByClassName('lodge__description')[0].textContent = offer.description;
  offerDialog.removeChild(userAds);
  offerDialog.appendChild(adsList);
}

function removeChilds(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
