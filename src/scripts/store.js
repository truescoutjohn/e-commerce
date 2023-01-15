import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/auth.reducer';
import cartReducer from './cart/cart.reducer';
import promisesReducer from './promises/promises.reducer';
import { localStoredReducer } from './helpers/utils';

const appReducer = combineReducers({
  auth: authReducer,
  cart: localStoredReducer(cartReducer, 'cart'),
  promises: promisesReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(appReducer, composeEnhancer(applyMiddleware(thunk)));
