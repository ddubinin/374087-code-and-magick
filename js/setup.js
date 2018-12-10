'use strict';

var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var secondNames = [
  'Да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
// цвет мантии
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
// цвет глаз
var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
// цвет шара
var fireballColor = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];


//  целое рандомное число от 0 до длины массива
var getRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)]; // array[n]
};


var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var generateWizard = function () {
  return {
    wizardName: getRandom(names) + ' ' + getRandom(secondNames),
    coatColor: getRandom(coatColors),
    eyesColor: getRandom(eyesColors)
  };
};
var getWizards = function (wizardsNum) {
  var wizards = [];
  for (var i = 0; i < wizardsNum; i++) {
    wizards.push(generateWizard());
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.wizardName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};
var fragment = document.createDocumentFragment();
var wizards = getWizards(4);
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');

// @oldfox  ⚠️ дублируется с
// стр 56
//var userDialog = document.querySelector('.setup');
var setup = document.querySelector('.setup');
// 
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// @oldfox  🙀 дублирует вызов окна сетапа
setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpenIcon.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

// @oldfox  🙀 дублирует вызов окна сетапа
setupOpenIcon.addEventListener('click', function () {  
  openSetup();
});

setupClose.addEventListener('click', function () {
  closeSetup();
});
setupClose.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetup();
  }
});
var openSetup = function (target) {
  //  @oldfox можем менять координаты при открытии на дефолт 😃
  setup.style.top = window.COORDS.y + "px";
  setup.style.left = window.COORDS.x + "px";
  setup.classList.remove('hidden');  
};
var closeSetup = function () {
  setup.classList.add('hidden');
  // @oldfox  можем менять координаты при закрытии на дефолт 😃
  /*
  setup.style.top = window.COORDS.y + "px";
  setup.style.left = window.COORDS.x + "px";
  */

};

var userNameInput = setup.querySelector('.setup-user-name');
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});
var setupCoat = document.querySelector('.wizard-coat');
var setupEyes = document.querySelector('.wizard-eyes');
var setupFireball = document.querySelector('.setup-fireball-wrap');

var inputEyes = document.querySelector('.setup-wizard-appearance input[name=eyes-color]');
var inputCoat = document.querySelector('.setup-wizard-appearance input[name=coat-color]');
var inputFireball = document.querySelector('.setup-fireball-wrap input[name=fireball-color]');

setupCoat.addEventListener('click', function () {
  inputCoat.value = setupCoat.style.fill = getRandom(coatColors);
});

setupEyes.addEventListener('click', function () {
  inputEyes.value = setupEyes.style.fill = getRandom(eyesColors);
});

setupFireball.addEventListener('click', function () {
  setupFireball.style.background = getRandom(fireballColor);
});

setupFireball.addEventListener('click', function () {
  inputFireball.value = getRandom(fireballColor);
});
