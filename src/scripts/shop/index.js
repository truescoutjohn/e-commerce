import store from '../store';
import { actionCartAdd, actionCartSub, actionCartSet, actionCartDel } from '../cart/cart.actions';
import { actionPromise } from '../promises/promises.actions';
import getGood from '../gateway/goods';

const increaseAmountOfGood = event => {
  const input = event.target.parentElement.previousElementSibling;
  input.value = parseInt(input.value, 10) + 1;
};
const decreaseAmountOfGood = event => {
  const input = event.target.parentElement.nextElementSibling;
  if (input.value !== '1') {
    input.value = parseInt(input.value, 10) - 1;
  }
};

const clickGoodHandler = event => {
  event.preventDefault();
  const goodItem = event.target.parentElement.parentElement.parentElement.parentElement
    .querySelector('.text-center')
    .innerText.split('\n')
    .slice(0, 2);
  store.dispatch(
    actionCartAdd({ _id: event.target.dataset.id, name: goodItem[0], price: goodItem[1].slice(1) }),
  );
};

const clickAddToCart = event => {
  const hrefArray = window.location.href.split('/');
  const id = hrefArray[hrefArray.length - 1];
  const goodName = document.querySelector('.p-30 h3:first-of-type').textContent;
  const goodPrice = document.querySelector('.p-30 h3:nth-of-type(2)').textContent;
  const count = parseInt(document.querySelector('input.count').value, 10);
  store.dispatch(actionCartAdd({ _id: id, name: goodName, price: goodPrice }, count));
};

const clickCartIncreaseHandler = event => {
  event.preventDefault();
  if (event.target.classList.contains('btn-plus') || event.target.classList.contains('fa-plus')) {
    const tr = event.target.closest('tr');
    const { id } = tr.dataset;
    const goodName = tr.querySelector('td:first-of-type').innerText.trim();
    const goodPrice = tr.querySelector('td:nth-of-type(2)').innerText.trim();
    store.dispatch(actionCartAdd({ _id: id, name: goodName, price: goodPrice }));
  }
};

const clickCartDecreaseHandler = event => {
  event.preventDefault();
  if (event.target.classList.contains('btn-minus') || event.target.classList.contains('fa-minus')) {
    const tr = event.target.closest('tr');
    const { id } = tr.dataset;
    const goodName = tr.querySelector('td:first-of-type').innerText.trim();
    const goodPrice = tr.querySelector('td:nth-of-type(2)').innerText.trim();
    store.dispatch(actionCartSub({ _id: id, name: goodName, price: goodPrice }));
  }
};

const changeCartAmountHandler = event => {
  event.preventDefault();
  if (event.target.classList.contains('amount')) {
    const tr = event.target.closest('tr');
    const { id } = tr.dataset;
    const goodName = tr.querySelector('td:first-of-type').innerText.trim();
    const goodPrice = tr.querySelector('td:nth-of-type(2)').innerText.trim();
    store.dispatch(
      actionCartSet(
        { _id: id, name: goodName, price: goodPrice },
        parseInt(event.target.value, 10),
      ),
    );
  }
};

const deleteItemCartHandler = event => {
  event.preventDefault();
  if (event.target.classList.contains('remove')) {
    const tr = event.target.closest('tr');
    const { id } = tr.dataset;
    const goodName = tr.querySelector('td:first-of-type').innerText.trim();
    const goodPrice = tr.querySelector('td:nth-of-type(2)').innerText.trim();
    store.dispatch(actionCartDel({ _id: id, name: goodName, price: goodPrice }));
  }
};

const clickCardGoodHandler = async event => {
  event.preventDefault();
  if (event.target.classList.contains('card__item')) {
    document.querySelector('.content').classList.remove('active');
    const goodHtml = document.querySelector('.good');
    store.dispatch(
      actionPromise(
        'getGood',
        getGood(event.target.closest('.card__wrapper').dataset.id).then(([good]) => {
          goodHtml.classList.add('active');
          const images = good.images.reduce(
            (acc, image) =>
              (acc += `<div class="carousel-item active">
                <img class="w-100 h-100" src="http://shop-roles.node.ed.asmer.org.ua/${image.url}" alt="Image" />
              </div>`),
            '',
          );
          goodHtml.innerHTML = `
      <div class="row px-xl-5">
        <div class="col-lg-5 mb-30">
          <div id="product-carousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner bg-light">
              ${images}
            </div>
            <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">
              <i class="fa fa-2x fa-angle-left text-dark"></i>
            </a>
            <a class="carousel-control-next" href="#product-carousel" data-slide="next">
              <i class="fa fa-2x fa-angle-right text-dark"></i>
            </a>
          </div>
        </div>

        <div class="col-lg-7 h-auto mb-30">
          <div class="h-100 bg-light p-30">
            <h3>${good.name}</h3>
            <h3 class="font-weight-semi-bold mb-4">$${good.price}</h3>
            <p class="mb-4">
              ${good.description}
            </p>
            <div class="d-flex align-items-center mb-4 pt-2">
              <div class="input-group quantity mr-3" style="width: 130px">
                <div class="input-group-btn">
                  <button class="btn btn-primary btn-minus decrease">
                    -
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control bg-secondary border-0 text-center count"
                  value="1"
                />
                <div class="input-group-btn">
                  <button class="btn btn-primary btn-plus increase">
                    +
                  </button>
                </div>
              </div>
              <button class="btn btn-primary px-3" id="add_good1">
                <i class="fa fa-shopping-cart mr-1" id="add_good2"></i> Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
          try {
            window.history.pushState(null, null, `/good/${good._id}`);
          } catch (e) {
            window.location.hash = '#good';
          }
          document.querySelector('.increase').addEventListener('click', increaseAmountOfGood);
          document.querySelector('.decrease').addEventListener('click', decreaseAmountOfGood);
          document.querySelector('#add_good1').addEventListener('click', clickAddToCart);
          document.querySelector('#add_good2').addEventListener('click', clickAddToCart);
          return good;
        }),
      ),
    );
  }
};

export default () => {
  [...document.querySelectorAll('.fa-shopping-cart')].forEach(icon =>
    icon.parentElement.addEventListener('click', clickGoodHandler),
  );
  document.querySelector('.table').addEventListener('click', clickCartIncreaseHandler);
  document.querySelector('.table').addEventListener('click', clickCartDecreaseHandler);
  document.querySelector('.table').addEventListener('change', changeCartAmountHandler);
  document.querySelector('.table').addEventListener('click', deleteItemCartHandler);
  document.querySelector('.content').addEventListener('click', clickCardGoodHandler);
};
