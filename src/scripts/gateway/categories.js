import { gql } from '../helpers/utils';

export const getCategories = async () => {
  const response = await gql(
    `query { 
      CategoryFind(query: "[{\\"parent\\": null}]") {
          _id
          createdAt
          name
      }
    }`,
  );
  return response;
};

export const getCategory = async id => {
  const response = await gql(
    `query {
        CategoryFindOne(query: "[{\\"_id\\": \\"${id}\\"}]") {
            _id
            createdAt
            name
            goods { 
                ... on Good {
                    _id
                    name,
                    price,
                    description
                    images {
                        ... on Image {
                            url
                        }
                    }
                }
            }
        }
    }`,
  );
  return response;
};
