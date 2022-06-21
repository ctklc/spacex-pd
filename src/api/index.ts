import { gql } from '@apollo/client';

export const SHIPS = gql`
  query GetShips($limit: Int!) {
    ships(limit: $limit) {
      id
      image
      name
      type
    }
  }
`;

export default { SHIPS };
