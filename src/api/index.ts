import { gql } from '@apollo/client';

export const SHIPS = gql`
  query GetShips($limit: Int, $offset: Int) {
    ships(limit: $limit, offset: $offset) {
      id
      image
      name
      type
    }
  }
`;

export default { SHIPS };
