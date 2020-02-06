import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: ASSETS+'/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: 'Bearer '+SESSION.token,
      },
    });
  },
});


export function mutation(mutation,variables) {
  return client
    .mutate({
      mutation: mutation,
      variables: variables,
    })
}

export function query(query,variables) {
  return client
    .query({
      query: query,
      variables: variables,
    })
}
