const serializeCart = (state, action, originalReducer, localStorageKey) => {
  const newState = originalReducer(state, action);
  localStorage.setItem(localStorageKey, JSON.stringify(newState));
  return newState;
};

const getGql = endpoint => {
  const authorizationToken = localStorage.getItem('token') ?? null;
  async function gql(myquery, variables = {}) {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
    };

    if (authorizationToken) {
      headers.Authorization = `Bearer ${authorizationToken}`;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: myquery, variables }),
      });

      const json = await response.json();
      if (json.errors) {
        throw new Error(json.errors[0].message);
      }
      return json.data[Object.keys(json.data)[0]];
    } catch (exception) {
      console.log(exception.message);
      return exception.message;
    }
  }
  return gql;
};

export const gql = getGql('http://shop-roles.node.ed.asmer.org.ua/graphql');

export const localStoredReducer = (originalReducer, localStorageKey) => {
  function wrapper(
    state = { cart: JSON.parse(localStorage.getItem(localStorageKey)).cart },
    action,
  ) {
    let newState;

    if (!localStorage.getItem(localStorageKey)) {
      return serializeCart(state, action, originalReducer, localStorageKey);
    }

    try {
      newState = originalReducer(state, action);
      localStorage.setItem(localStorageKey, JSON.stringify(newState));
    } catch (e) {
      newState = serializeCart(state, action, originalReducer, localStorageKey);
    }

    return newState;
  }

  return wrapper;
};
