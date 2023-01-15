import store from './store';
import { actionPromise } from './promises/promises.actions';
import './cart';
import cart from './shop';
import './auth/form';
import '../index.scss';
import './navbar/navbar';
import { getCategories } from './gateway/categories';
import { getOrders } from './gateway/orders';

store.subscribe(() => console.log(store.getState()));
document.querySelector('.navbar').style.zIndex = '1';
cart();

document.querySelector('.authorization__sign-in').addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector('#form-login').classList.add('active');
  document.querySelector('.overlay').classList.add('active');
  try {
    window.history.pushState(null, null, '/login');
    return;
  } catch (e) {}
  window.location.hash = '#login';
});

document.querySelector('.authorization__history').addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector('.good').classList.remove('active');
  document.querySelector('.content').classList.remove('active');
  store.dispatch(
    actionPromise(
      'getHistory',
      getOrders().then(response => {
        if (response.length === 0) {
          document.querySelector('.history').classList.add('active');
          document.querySelector('.history__wrapper').textContent = 'There is no history';
          return [];
        }
        const history = response.reduce((acc, element) => {
          acc += `<div>${element.toString()}</div>`;
        }, '');
        document.querySelector('.history__wrapper').innerHTML = history;
      }),
    ),
  );
  try {
    window.history.pushState(null, null, '/history');
    return;
  } catch (e) {}
  window.location.hash = '#history';
});

document.querySelector('.authorization__sign-up').addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector('#form-register').classList.add('active');
  document.querySelector('.overlay').classList.add('active');
  try {
    window.history.pushState(null, null, '/register');
    return;
  } catch (e) {}
  window.location.hash = '#register';
});

store.subscribe(() => console.log(store.getState())); //должен запускаться 4 раз

store.dispatch(
  actionPromise(
    'luke',
    fetch('https://swapi.dev/api/people/1').then(res => res.json()),
  ),
);
store.dispatch(
  actionPromise(
    'tatooine',
    fetch('https://swapi.dev/api/planets/1').then(res => res.json()),
  ),
);

store.dispatch(
  actionPromise(
    'getCategories',
    getCategories().then(categories => {
      const navbar = document.querySelector('.navbar-nav');
      navbar.innerHTML = '';
      categories.forEach(category => {
        navbar.innerHTML += `<a href="#" class="nav-item nav-link" data-id=${category._id}>${category.name}</a>`;
      });
      return categories;
    }),
  ),
);
