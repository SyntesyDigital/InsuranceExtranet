import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: 'Bearer cd4ad4d362dadc8a90a36f0050c003c252e71eec',
      },
    });
  },
});

const GET_ORGANIZATION = gql`
  query($organization: String!) {
    organization(login: $organization) {
      name
      url
    }
  }
`;

export function getData() {

  return client
    .query({
      query: GET_ORGANIZATION,
      variables: {
        organization: 'the-road-to-learn-react',
      },
    });
}



/**
 * Function to create role the first time. 
 * Payload contain the information of the Role
 * 
 * @param {} payload 
 */
export function postCreateRole(payload) {
  return client
    .query({
      query: GET_ORGANIZATION,
      variables: {
        organization: 'the-road-to-learn-react',
      },
    });
}

/**
 * Function to update role basic parameters
 * 
 * @param {} payload 
 */
export function postUpdateRole(payload) {
  return client
    .query({
      query: GET_ORGANIZATION,
      variables: {
        organization: 'the-road-to-learn-react',
      },
    });
}

export function getPermission(payload) {
  return client
    .query({
      query: GET_ORGANIZATION,
      variables: {
        organization: 'the-road-to-learn-react',
      },
    });
}

