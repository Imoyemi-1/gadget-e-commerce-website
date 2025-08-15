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
  const path = window.location.pathname;
  const route = routes[path] || routes[404];

  const html = await fetch(route).then((data) => data.text());
  document.querySelector('#main-page').innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
