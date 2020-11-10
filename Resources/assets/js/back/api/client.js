import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: ASSETS + '/graphql',
  });

const authLink = setContext((_, { headers }) => {
    
    return {
        headers: {
            ...headers,
            authorization: 'Bearer ' + userSession.getApiToken(),
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    defaultOptions : {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    }
});

export function mutation(mutation,variables) {
    return client
        .mutate({
            mutation: mutation,
            variables: variables,
        });
}

export function query(query,variables) {
    return client
        .query({
            query: query,
            variables: variables,
        });
}


