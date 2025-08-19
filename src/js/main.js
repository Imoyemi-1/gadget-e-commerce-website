import AOS from 'aos';

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

mobileMenu.addEventListener('click', (e) => {
  const list = e.target.closest('.nav-item');
  if (list) {
    mobileMenu.classList.add('hidden');
    document.querySelector('footer input').value = '';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const productSection = document.querySelector('#product-section');

  AOS.init({
    once: false, // allow repeat
    offset: 100,
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            AOS.refresh();
          }, 50);
        }
      });
    },
    { threshold: 0.1 }
  );
  if (productSection) observer.observe(productSection);
});

// display product

const displayProduct = (products) => {
  products.forEach(
    ({ rating, image, tags, description, price, brand, name }) => {
      const article = document.createElement('article');
      article.className =
        'relative bg-slate-900/80 backdrop-blur-sm text-white p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 border border-slate-800 transition-all duration-500 transform hover:-translate-y-2';
      article.setAttribute('data-aos', 'fade-up');
      article.innerHTML = `  
      <!-- Badge -->
      <div
        class="absolute top-4 right-4 ${
          tags[0] === 'New'
            ? 'bg-blue-500'
            : tags[0] === 'Hot'
            ? 'bg-red-500'
            : 'bg-green-500'
        } text-xs font-bold px-3 py-1 rounded-full shadow-md"
      >
        ${tags[0]}
      </div>
      <!-- Image -->
      <div class="w-full h-100 overflow-hidden rounded-lg mb-4">
        <img
        l loading="lazy"
          src=${image}
          class="w-full h-full object-contain"
          alt="${name}"
        />
      </div>
      <!-- Details -->
      <h3 class="text-xl font-semibold mb-2">${name}</h3>
      <p class="text-slate-400 mb-4">
        ${description}
      </p>
      <!-- Price + Rating -->
      <div class="flex justify-between items-center mb-4">
        <span class="text-blue-400 text-lg font-bold">$${price}</span>
        <div class="flex items-center">
          <span class="text-yellow-400">★★★★★</span>
          <span class="text-slate-500 ml-2">(${rating})</span>
        </div>
      </div>
      <!-- Button -->
      <button
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
      >
        Add to Cart
        <ion-icon name="cart-outline" class="text-xl"></ion-icon>
      </button>
    `;
      document.getElementById('products-list-container').appendChild(article);
    }
  );
};

export { displayProduct };
