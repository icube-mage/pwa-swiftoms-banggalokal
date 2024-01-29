/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line object-curly-newline
/* eslint-disable max-len */
import {
    ApolloClient, HttpLink, InMemoryCache, from,
} from '@apollo/client';
import { RetryLink } from 'apollo-link-retry';
import fetch from 'isomorphic-unfetch';
import { graphqlEndpoint, HOST } from '@root/swift.config.js';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { removeIsLoginFlagging } from '@helper_auth';
import { getAppEnv } from '@helpers/env';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
            types: [],
        },
    },
});

const appEnv = getAppEnv();

const uri = (graphqlEndpoint[appEnv])
    ? graphqlEndpoint[appEnv] : graphqlEndpoint.dev;

const host = (HOST[appEnv])
    ? HOST[appEnv] : HOST.dev;

const uriInternal = `${host}/graphql`;
// handle if token expired
const logoutLink = onError((err) => {
    const { graphQLErrors, networkError } = err;
    if (networkError && typeof window !== 'undefined' && graphQLErrors && graphQLErrors.length > 0 && graphQLErrors[0].status > 500) {
        window.location.href = '/maintenance';
    } else if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].extensions && graphQLErrors[0].extensions.category === 'graphql-seller-authorization') {
        window.location.href = '/seller/unauthorized';
    } else if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].status === 401 && typeof window !== 'undefined') {
        removeIsLoginFlagging();
        window.location.href = '/login';
    } else if (networkError && networkError.statusCode === 413 && typeof window !== 'undefined') {
        networkError.message = 'Your file is too large. Please choose smaller file size.';
    }
});

const link = new RetryLink().split(
    (operation) => operation.getContext().request === 'internal',
    new HttpLink({
        uri: uriInternal, // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch,
    }),
    new HttpLink({
        uri, // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch,
        useGETForQueries: true,
    }),
);

// const link = new RetryLink().split(
//     (operation) => operation.getContext().request === 'internal',
//     new HttpLink({
//         uri: uriInternal, // Server URL (must be absolute)
//         credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
//         fetch,
//     }),
//     new RetryLink().split(
//         (operation) => operation.getContext().request === chatContextName,
//         new HttpLink({
//             uri: chatUri,
//             credentials: 'same-origin',
//             fetch,
//             useGETForQueries: true,
//         }),
//         new HttpLink({
//             uri, // Server URL (must be absolute)
//             credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
//             fetch,
//             useGETForQueries: true,
//         }),
//     ),
// );

export default function createApolloClient(initialState, ctx) {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: from([
            logoutLink,
            link,
        ]),
        cache: new InMemoryCache({ fragmentMatcher }).restore(initialState),
        // eslint-disable-next-line no-underscore-dangle
        connectToDevTools: typeof window !== 'undefined' && window.__APOLLO_CLIENT__
            && (appEnv === 'local'),
        resolvers: {},
    });
}
