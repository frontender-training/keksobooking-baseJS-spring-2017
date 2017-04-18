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

// Функция, создающая случайное число
function getRandomArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// Функция, создающая массив произвольной длины
function getFeatures() {  	
  var newArr = FACILITY;
  var one = getRandom(0, FACILITY.length);
  newArr.length = one;
  return newArr;
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
      'features': getFeatures(), // Выбираем случайное число из массива удобств
      'description': '',
      'photos': []
    },
    'location': {
      'x': locationX, // случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
      'y': locationY // случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
    }
  };
}

var i;
var ads = [];
for (i = 0; i < COUNT_USERS; i++) {
  ads.push(createAds(i));  
}

// Создаем шаблон по которому будет собираться все меткм для карты
function createMark() {
  var userLocation = document.createElement('div');
  var userAvatar = document.createElement('img');
  userLocation.className = 'pin';
  userLocation.style.left = (ads[i].location.x - MARKER_HEIGHT) + 'px';
  userLocation.style.top = ads[i].location.y - (MARKER_WIDTH / 2) + 'px';
  userAvatar.className = 'rounded';
  userAvatar.width = 40;
  userAvatar.height = 40;
  userAvatar.src = ads[i].author.avatar;
  userLocation.appendChild(userAvatar);
  return userLocation;
}

// Переводим название типов жилья на русский
function translateType (type) {
	if (type === 'flat') {
		return 'Квартира';
	}
	if (type === 'bungalo')	{
		return 'Бунгало';
	}
	if (type === 'house') {
		return 'Дом';
	}
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
// function createIconFeature(feature) {
// 	var iconFeature = document.createElement('span');
//   iconFeature.classList.add('feature__image');
//   iconFeature.classList.add('feature__image--' + feature);
//   return iconFeature;
// }

// Проходим по всему массиву
// function generateIconsFeatures(arrayFeatures) {
// var fragment = document.createDocumentFragment();
// for (i = 0; i < feature.length; i++) {
// 	fragment.appendChild(createIconFeature());
//   }
//   return fragment;
// }

// Вставляем полученные метки в карту
var tokyoPinMap = document.getElementsByClassName('tokyo__pin-map');
var fragment = document.createDocumentFragment();
for (i = 0; i < 8; i++) {
	fragment.appendChild(createMark());
  }
tokyoPinMap[0].appendChild(fragment);

// function createTemplateAds (adsTemplate) {

// 	var userAds = document.querySelector('.dialog__panel');
// 	userAds.querySelector('.lodge__title').textContent = ads[i].offer.title;
// 	userAds.querySelector('.lodge__address').textContent = ads[i].offer.address;
// 	userAds.querySelector('.lodge__price').textContent = ads[i].offer.price + '&#x20bd;/ночь';
// 	userAds.querySelector('.lodge__type').textContent = ads[i].offer.type;
// 	userAds.querySelector('.lodge__rooms-and-guests').textContent = 'Для' + ads[i].offer.guests + 'гостей в ' + ads[i].offer.rooms + 'комнатах';
// 	userAds.querySelector('.lodge__checkin-time').textContent = 'Заезд после' + ads[i].offer.checkin + ', выезд' + ads[i].offer.checkout;
// 	userAds.querySelector('.lodge__features').appendChild(generateIconsFeatures(ads[i].offer.features));
// 	userAds.querySelector('.lodge__description').textContent = ads[i].offer.description;
// 	userAds.querySelector('.dialog__title').img.src = ads[i].author.avatar;
// 	document.getElementsByClassName('dialog__title')[i].images.src = ads[i].author.avatar;
// 	return userAds;
// }

var offerDialog = document.querySelector('#offer-dialog'); // Берем элемент, в который будем вставлять наш шаблон
var templateAds = document.querySelector('#lodge-template').content // Берем сам шаблон, который будем вставлять
var userAds = offerDialog.getElementsByClassName('dialog__panel');

function createOfferAvatar() {
	var dialogTitle = document.querySelector('.dialog__title');
	var img = document.createElement('img');
	img.width = 70;
	img.height = 70;
	img.src = ads[i].author.avatar;
	dialogTitle.appendChild(img);
	return dialogTitle;
}

for (var i = 0; i < 8; i++) {
	document.getElementsByClassName('lodge__title')[i].textContent = ads[i].offer.title;
	document.getElementsByClassName('lodge__address')[i].textContent = ads[i].offer.adress;
	document.getElementsByClassName('lodge__price')[i].innerHTML = getPrice(ads[i].offer.price);
	document.getElementsByClassName('lodge__type')[i].textContent = translateType(ads[i].offer.type);
	document.getElementsByClassName('lodge__rooms-and-guests')[i].textContent = getGuestsAndRooms(ads[i].offer.guests, ads[i].offer.rooms);
	document.getElementsByClassName('lodge__checkin-time')[i].textContent = getTime(ads[i].offer.checkin, ads[i].offer.checkout);
	// document.getElementsByClassName('lodge__features')[i].appendChild(generateIconsFeatures(ads[i].offer.features));
	document.getElementsByClassName('lodge__features')[i].textContent = ads[i].offer.features;
	document.getElementsByClassName('lodge__description')[i].textContent = ads[i].offer.description;
	var adsList = templateAds.cloneNode(true);
  offerDialog.appendChild(adsList);
}

offerDialog[0].insertBefore(userAds, createOfferAvatar());