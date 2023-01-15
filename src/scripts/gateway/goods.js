import { gql } from '../helpers/utils';

export default async id => {
  const response = gql(
    `query {
        GoodFind(query: "[{\\"_id\\": \\"${id}\\"}]") {
            _id
            createdAt
            name
            description
            price
            images {
                ... on Image {
                    url
                }
            }
        }
    }`,
  );
  return response;
};
