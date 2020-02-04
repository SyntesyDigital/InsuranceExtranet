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

/**
 * Function to get user. 
 * Payload contain the information of the User
 * 
 * @param {} payload 
 */
export function apiGetUser(payload) {
    return client
        .query({
            query: GET_ORGANIZATION,
            variables: {
                organization: 'the-road-to-learn-react',
            },
        });
}

/**
 * Function to update user role. 
 * Payload contain the information of the Role
 * 
 * @param {} payload 
 */
export function apiUpdateUserRole(payload) {
    return client
        .query({
            query: GET_ORGANIZATION,
            variables: {
                organization: 'the-road-to-learn-react',
            },
        });
}

/**
 * Function to update user permission. 
 * Payload contain the information of the Permission and Value
 * 
 * @param {} payload 
 */
export function apiUpdateUserPermission(payload) {
    return client
        .query({
            query: GET_ORGANIZATION,
            variables: {
                organization: 'the-road-to-learn-react',
            },
        });
}





