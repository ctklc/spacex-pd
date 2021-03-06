import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

export const apiURL = process.env.REACT_APP_API_URL;

export const client = new ApolloClient({
  uri: apiURL,
  cache: new InMemoryCache({
    typePolicies: {
      GetShips: {
        fields: {
          ships: offsetLimitPagination()
        }
      }
    }
  })
});
