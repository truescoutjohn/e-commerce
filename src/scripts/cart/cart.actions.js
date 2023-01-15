export const CART_ADD = 'CART/ADD';
export const CART_SUB = 'CART/SUB';
export const CART_DEL = 'CART/DEL';
export const CART_SET = 'CART/SET';
export const CART_CLEAR = 'CART/CLEAR';

export const actionCartAdd = (good, count = 1) => ({ type: CART_ADD, count, good });
export const actionCartSub = (good, count = 1) => ({ type: CART_SUB, count, good });
export const actionCartDel = good => ({ type: CART_DEL, good });
export const actionCartSet = (good, count = 1) => ({ type: CART_SET, count, good });
export const actionCartClear = () => ({ type: CART_CLEAR });
