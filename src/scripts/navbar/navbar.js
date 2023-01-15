import { getCategory } from '../gateway/categories';
import store from '../store';
import { actionPromise } from '../promises/promises.actions';
import addCartHandler from '../shop';

const renderCategory = (event, result) => {
  const containerGoods = document.querySelector('.content');
  containerGoods.classList.toggle('active');
  document.querySelector('.good').classList.remove('active');
  event.target.closest('nav').classList.remove('active');
  containerGoods.innerHTML = '';
  result.goods.forEach(good => {
    containerGoods.innerHTML += `<div class="col-lg-4 col-md-6 col-sm-6 pb-1 card__item card__wrapper" data-id="${good._id}">
              <div class="product-item bg-light mb-4 card__item">
                <div class="product-img position-relative overflow-hidden card__item">
                  <img class="img-fluid w-100 card__item" src="http://shop-roles.node.ed.asmer.org.ua/${good.images[0].url}" alt="good">
                  <div class="product-action card__item">
                    <a class="btn btn-outline-dark btn-square" href="" data-id="${good._id}"><i class="fa fa-shopping-cart" data-id="${good._id}"></i></a>
                    <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                  </div>
                </div>
                <div class="text-center py-4 card__item">
                  <a class="h6 text-decoration-none text-truncate card__item" href="">${good.name}</a>
                  <div class="d-flex align-items-center justify-content-center mt-2 card__item">
                    $${good.price}
                  </div>
                </div>
              </div>
            </div>`;
    addCartHandler();
  });
  return result;
};

function handleNavbar(event) {
  event.preventDefault();
  if (event.target.classList.contains('nav-item')) {
    store.dispatch(
      actionPromise(
        'getCategory',
        getCategory(event.target.dataset.id).then(result => renderCategory(event, result)),
      ),
    );
    try {
      window.history.pushState(null, null, `/category/${event.target.dataset.id}`);
      return;
    } catch (e) {}
    window.location.hash = '#category';
  }
}

const clickOnDropDown = event => {
  event.preventDefault();
  document.querySelector('#navbar-vertical').classList.toggle('active');
};

document.querySelector('.navbar-nav').addEventListener('click', handleNavbar);
document.querySelector('.dropdown__menu').addEventListener('click', clickOnDropDown);
