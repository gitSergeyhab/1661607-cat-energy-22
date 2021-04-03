const menuBtn = document.querySelector('.page-header__nav-toggle');
const spanBtn = menuBtn.querySelector('span');
const menuList = document.querySelector('.site-list');

if (window.innerWidth < 768) {
  menuList.style.display = 'none';
}

window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    menuList.style.display = 'none';
  } else {
    menuList.style.display = 'flex';
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

const links = document.querySelectorAll('.site-list__item a');
links.forEach(link => {
  link.parentNode.classList.remove('site-list__item--current');
  if(!link.href) {
    link.parentNode.classList.add('site-list__item--current');
  }
})
