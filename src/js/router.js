import { displayProduct } from './main';
import Products from './data';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const footer = document.querySelector('footer');
const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  window.scrollTo({ top: 0 });
  handleLocation();
};

const routes = {
  404: '/src/pages/index.html',
  '/': '/src/pages/index.html',
  '/shop': '/src/pages/shop.html',
  '/contact': '/src/pages/contact.html',
  '/about': '/src/pages/about.html',
};

const handleLocation = async () => {
  const link = document.querySelectorAll('#menu > a');
  const path = window.location.pathname;
  const route = routes[path] || routes[404];

  const html = await fetch(route).then((data) => data.text());

  [...link].forEach((item) => {
    item.classList.remove('text-blue-400');
    item.classList.remove('underline');
  });
  switch (path) {
    case '/':
      link[0].classList.add('text-blue-400'),
        link[0].classList.add('underline');
      break;
    case '/shop':
      link[1].classList.add('text-blue-400'),
        link[1].classList.add('underline');
      setTimeout(() => displayProduct(Products), 0);
      break;
    case '/about':
      link[2].classList.add('text-blue-400'),
        link[2].classList.add('underline');
      break;
    default:
      link[3].classList.add('text-blue-400'),
        link[3].classList.add('underline');
      break;
  }
  document.querySelector('#main-page').innerHTML = html;
  footer.classList.remove('hidden');

  // add swiper to hero product display
  const heroSwiper = new Swiper('.hero-swiper', {
    modules: [Pagination, Autoplay],
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
