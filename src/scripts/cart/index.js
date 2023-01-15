import store from '../store';
import { actionCartClear } from './cart.actions';

document.querySelector('#cartIcon').addEventListener('click', function () {
  const cart = document.querySelector('.cart__wrapper');
  cart.classList.toggle('active');
  cart.style.zIndex = '999';
  const overlay = document.querySelector('.overlay');
  overlay.classList.toggle('active');
  overlay.addEventListener('click', function (event) {
    event.target.classList.remove('active');
    cart.classList.remove('active');
    window.history.back();
  });
  try {
    history.pushState(null, null, '/cart');
    return;
  } catch (e) {}
  location.hash = '#cart';
});

document.querySelector('.btn-clear').addEventListener('click', function () {
  store.dispatch(actionCartClear());
});

const table = document.querySelector('.align-middle');
const totalElement = table.closest('div').nextElementSibling.querySelector('.total');
const fillInCart = () => {
  const { cart } = store.getState().cart;
  table.innerHTML = '';
  const total = cart.reduce((acc, item) => {
    return acc + parseInt(item.good.price.slice(1), 10) * item.count;
  }, 0);
  totalElement.textContent = `$${total}`;
  cart.forEach(goodItem => {
    table.innerHTML += `<tr data-id="${goodItem.good._id}">
                  <td class="align-middle">
                    <img src="img/product-1.jpg" alt="" style="width: 50px"> ${goodItem.good.name}
                  </td>
                  <td class="align-middle">${goodItem.good.price}</td>
                  <td class="align-middle">
                    <div class="input-group quantity mx-auto" style="width: 100px">
                      <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-minus">
                          <i class="fa fa-minus"></i>
                        </button>
                      </div>
                      <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center amount" value="${
                        goodItem.count
                      }">
                      <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-plus">
                          <i class="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle">${
                    parseInt(goodItem.good.price.slice(1), 10) * goodItem.count
                  }</td>
                  <td class="align-middle">
                    <button class="btn btn-sm btn-danger remove"><i class="fa fa-times remove"></i></button>
                  </td>
                </tr>`;
  });
};
fillInCart();
store.subscribe(fillInCart);
