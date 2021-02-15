import { gql } from '@apollo/client';

export const SEARCH_LOCATIONS = gql`
query($searchQuery: String!){
    searchLocations(searchQuery: $searchQuery){
        name
        city
        id
    }
  } 
`;

export const GET_LOCATIONS = gql`
query{
  getLocations{
    name
    city
    id
  }
}
`;
