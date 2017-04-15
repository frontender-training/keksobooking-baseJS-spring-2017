'use strict';

function createAds(i) {
  var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var TITLE_ADS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPE_OF_ROOMS = ['flat', 'house', 'bungalo'];
  var NUMBER_OF_ROOMS = ['1', '2', '3', '4', '5'];
  var TIME_CHECKIN = ['12:00', '13:00', '14:00'];
  var TIME_CHECKOUT = ['12:00', '13:00', '14:00'];
  var FACILITY = ['wifi', 'dishwasher', 'parking', 'elevator', 'conditioner'];

  // Функция, меняющая порядок в массиве
  function shuffle(array) {
    for (var j = array.length - 1; j > 0; j--) { // Задаем переменную, у которой числовое значение будет определяться рандомно
      var randomIndex = Math.floor(Math.random() * (j + 1)); // Задаем переменную, у которой числовое значение будет определяться рандомно
      var temporaryValue = array[j];
      array[j] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  }

  function getRandomArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getFeatures() {
    var newArr = FACILITY;
    var one = getRandom(0, FACILITY.length);
    newArr.length = one;
    return newArr;
  }

  var locationX = getRandom(300, 900);
  var locationY = getRandom(100, 500);

  return {

    'author': {
      'avatar': shuffle(AVATARS)[i] // Перебираем массив и ставим первое значение обновленного массива
    },
    'offer': {
      'title': shuffle(TITLE_ADS)[i], // Перебираем массив и ставим первое значение обновленного массива
      'adress': (locationX + ', ' + locationY),
      'price': getRandom(1000, 1000000),  // число, случайная цена от 1000 до 1 000 000
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
      'y': locationY// случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
    }
  }
};

var COUNT_USERS = 8;
var ads = [];
for (var i = 0; i < COUNT_USERS; i++) {
	ads.push(createAds(i));
}

// Создаем шаблон по которому будет собираться все меткм для карты
function createMark() {
  var userLocation = document.createElement('div');
  var userAvatar = document.createElement('img');
  userLocation.className = 'pin';
  userLocation.style.left = ads[i].location.x + 'px';
  userLocation.style.top = ads[i].location.y + 'px';
  userAvatar.className = 'rounded';
  userAvatar.width = 40;
  userAvatar.height = 40;
  userAvatar.src = ads[i].author.avatar;
  userLocation.appendChild(userAvatar);
  return userLocation;
}
// Вставляем полученные метки в карту
var tokyoPinMap = document.getElementsByClassName('tokyo__pin-map');
var fragment = document.createDocumentFragment();
 for (var i = 0; i < 8; i++) {
 	fragment.appendChild(createMark());
 }
 tokyoPinMap[0].appendChild(fragment);