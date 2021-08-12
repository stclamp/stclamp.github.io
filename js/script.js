//slider 

$(document).ready(function () {
  $('#slidr-img').slick({
    arrows: false,
    dots: true,
    fade: true,
    infinity: true,
    prevArrow: '<img class="slick-prev" src="img/arr-left.svg">',
    nextArrow: '<img class="slick-next" src="img/arr-right.svg">'
  });
});

//smooth scroll

const smoothScrollElems = document.querySelectorAll('a[href*="#"]:not([href="#"])');
smoothScrollElems.forEach(link => {
  link.addEventListener('click', (event) => {

    event.preventDefault();
    const id = link.getAttribute('href').substring(1);


    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

//percents from html

const percentSkill = document.querySelectorAll('.percent');
const percentLine = document.querySelectorAll('.subline');

const soloPercentSkill = percentSkill.forEach((item, i) => {
  percentLine[i].style.width = item.textContent;
});

//Burger 

const menuBtn = document.querySelector('.menu__humburger');
const menuClose = document.querySelector('.menu__close');
const menuLinks = document.querySelectorAll('.header__list');
const menu = document.querySelector('.menu');
const wrapper = document.querySelector('.promo .wrapper');
const menuItems = document.querySelectorAll('.header__list-link');
const headerLogo = document.querySelector('.header__logo');

console.log(window.screen.width)

function toggleBurgerMenu() {
  menuLinks.forEach(item => {
    if(window.screen.width >= 768) {
      item.classList.remove('hidden');
      item.classList.remove('bg');
    } else {
      item.classList.toggle('hidden');
      item.classList.toggle('bg');
    }
  });
  // menu.classList.toggle('bg');
  headerLogo.classList.toggle('wt');
}

headerLogo.addEventListener('click', () => {
  // toggleBurgerMenu();
  menuBtn.style.display = 'block';
  menuClose.style.display = 'none';
});

menuBtn.addEventListener('click', () => {
  toggleBurgerMenu();
  menuBtn.style.display = 'none';
  menuClose.style.display = 'block';
});

menuClose.addEventListener('click', () => {
  toggleBurgerMenu();
  menuBtn.style.display = 'block';
  menuClose.style.display = 'none';
})

const width = document.documentElement.scrollWidth;
console.log(width)

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    toggleBurgerMenu();
    if(width > 768){
      menuBtn.style.display = 'none';
      menuClose.style.display = 'none';
    } else if(width < 768) {
      menuBtn.style.display = 'block';
      menuClose.style.display = 'none';
    }
   
  });
});




// form

const ajaxSend = async (formData) => { //ajax to Telegram
  const fetchResp = await fetch('sendTelegram.php', {
    method: 'POST',
    body: formData
  });
  // if (!fetchResp.ok) {
  //     throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`);
  // }
  return await fetchResp.text();
};

const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', validator);
})


const rules = {  //rules for validator by dataset
  required: function (el) {
    if (el.value != '') {
      return true;
    } else {
      return false;
    }
  },
  email: function (el) {
    let reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return reg.test(el.value);
  },
  name: function (el) {
    if (el.value.length < 2 || el.value.length > 20) {
      return false;
    } else {
      return true;
    }
  },
  max: function (el) {
    if (el.value.length < 5 || el.value.length > 200) {
      return false;
    } else {
      return true;
    }
  }
}
function showErrors(arr) {
  console.log(arr);
}

function validator(e) {
  e.preventDefault();
  var errors = [];
  const inputs = forms[0].elements;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].tagName != 'BUTTON') {
      let rulesList = inputs[i].dataset.rule;
      rulesList = rulesList.split(' ');

      for (let j = 0; j < rulesList.length; j++) {
        if (rulesList[j] in rules) {
          if (!rules[rulesList[j]](inputs[i])) {
            errors.push({
              name: inputs[i].name,
              error: rulesList[j]
            });
            inputs[i].classList.add('error');
          } else {
            inputs[i].classList.remove('error');
          }
        }
      }
    }
  }
  if (errors.length > 0) {
    e.preventDefault();
    showErrors(errors);

  } else {
    e.preventDefault();
    const formData = new FormData(this); //form send
    ajaxSend(formData)
      .then((response) => {
        console.log(response);
        forms[0].reset(); // очищаем поля формы 
      })
      .catch((err) => console.error(err));
  }
}


