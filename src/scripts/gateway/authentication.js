import * as jose from 'jose';
import { gql } from '../helpers/utils';

export const signIn = async (login, password) => {
  const token = await gql(
    `query{
      login(login: "${login}", password: "${password}")
    }`,
  );
  const user = jose.decodeJwt(token);
  return { user, token };
};

export const signUp = async (login, password) => {
  const response = await gql(
    `mutation($user: UserInput) {
        UserUpsert(user: $user) {
          _id
          login
        }
      }`,
    { user: { login, password } },
  );
  return response;
};
