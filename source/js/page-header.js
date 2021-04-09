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
