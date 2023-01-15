import { CART_ADD, CART_SUB, CART_SET, CART_DEL, CART_CLEAR } from './cart.actions';

const cartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case CART_ADD: {
      const copyCart = [...state.cart];
      const findedCartItem = copyCart.find(cartItem => action.good._id === cartItem.good._id);
      if (findedCartItem) {
        findedCartItem.count += action.count ?? 1;
        return { ...state, cart: copyCart };
      }
      return { ...state, cart: copyCart.concat({ good: action.good, count: action.count }) };
    }

    case CART_SUB: {
      const copyCart = [...state.cart];
      const findedCartItem = copyCart.find(cartItem => action.good._id === cartItem.good._id);

      if (!findedCartItem) {
        return state;
      }

      if (findedCartItem.count > 1) {
        findedCartItem.count -= action.count ?? 1;
        return { ...state, cart: copyCart };
      }
      return { ...state, cart: copyCart.filter(cartItem => cartItem.good._id !== action.good._id) };
    }

    case CART_SET: {
      const copyCart = [...state.cart];
      const findedCartItem = copyCart.find(cartItem => cartItem.good._id === action.good._id);
      if (!findedCartItem) {
        return state;
      }

      findedCartItem.count = action.count;

      if (findedCartItem.count >= 1) {
        return { ...state, cart: copyCart };
      }

      return {
        ...state,
        cart: state.cart.filter(cartItem => cartItem.good._id !== action.good._id),
      };
    }

    case CART_DEL:
      return {
        ...state,
        cart: state.cart.filter(cartItem => cartItem.good._id !== action.good._id),
      };

    case CART_CLEAR: {
      const copyState = { ...state };
      delete copyState.cart;
      return copyState;
    }

    default:
      return state;
  }
};

export default cartReducer;
