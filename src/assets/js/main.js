ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.765,37.625],
    zoom: 14,
    scroll: false,
  });

  myMap.behaviors.disable('scrollZoom');
  
  var placemark = new ymaps.Placemark([55.770233,37.636787], {}, {
    iconLayout: 'default#image',
    iconImageHref: './images/svg/map-circle.svg',
    iconImageSize: [12, 12],
    iconImageOffset: [30, 10],
  });
  myMap.geoObjects.add(placemark);
}


new JustValidate('.contacts__form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 30
    },
    textarea: {
      required: true
    },
    mail: {
      required: true,
      email: true
    },
  },
  messages: {
    mail: {
      required: "Вы не ввели e-mail"
    },
    name:  {
      required: "Вы не ввели имя"
    },
    textarea: {
      required: "Незаполненное поле"
    }
  }

});

new JustValidate('.about__validate', {
  rules: {
    mail: {
      required: true,
      email: true
    }
  },
  messages: {
    mail: {
      required: "Вы не ввели e-mail"
    }
}})

const searchBtn = document.querySelector('.header__btn');
const searchInput = document.querySelector('.header__search--string');
const searchCloseBtn = document.querySelector('.header__search--close');

searchBtn.addEventListener('click', () => {
  searchInput.style.display = 'flex';
});

searchCloseBtn.addEventListener('click', () => {
  searchInput.style.display = 'none';
});

const nav = document.querySelector('.header__nav')
const burgerBtn = document.querySelector('.header__burger-btn')
const navCloseBtn = document.querySelector('.header__nav__burger-close')

burgerBtn.addEventListener('click', () => {
  nav.style.display = 'flex';
});

navCloseBtn.addEventListener('click', () => {
  nav.style.display = 'none';
});
