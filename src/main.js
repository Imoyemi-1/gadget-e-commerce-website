import AOS from 'aos';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  const productSection = document.querySelector('#product-section');

  // Initial AOS
  AOS.init({ once: true, offset: 100 });

  // Re-trigger animation when section comes back into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          productSection.querySelectorAll('.product-card').forEach((card) => {
            card.classList.remove('aos-animate');
          });
          setTimeout(() => {
            AOS.refresh();
          }, 50);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(productSection);
});
