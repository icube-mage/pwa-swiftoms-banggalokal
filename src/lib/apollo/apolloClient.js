/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line object-curly-newline
/* eslint-disable max-len */
/* eslint-disable eqeqeq */

import { RetryLink } from 'apollo-link-retry';
import { graphqlEndpoint, HOST } from '@root/swift.config.js';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { removeIsLoginFlagging } from '@helper_auth';
import { getAppEnv } from '@helpers/env';
import {
    ApolloClient, ApolloLink, HttpLink, InMemoryCache, from,
} from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import cookies from 'js-cookie';

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

const handleSession = async () => {
    try {
        await removeIsLoginFlagging();
        if (window && window.showSessionExpired) {
            window.showSessionExpired();
        }
        console.log(`Dbg: cookie isLogin = ${cookies.get('isLogin')}`);
        console.log(`Dbg: cookie customerDataCookie = ${cookies.get('cdt')}`);
        setTimeout(() => { window.location.href = '/login'; }, 3000);
    } catch (err) {
        console.error('catch error', err);
    }
};

// handle if token expired
let logoutAttempt = 0;
const logoutLink = onError((err) => {
    const { graphQLErrors, networkError } = err;
    if (networkError && typeof window !== 'undefined' && graphQLErrors && graphQLErrors?.length > 0 && graphQLErrors[0]?.status > 500) {
        window.location.href = '/maintenance';
    } else if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0]?.extensions && graphQLErrors[0]?.extensions.category === 'graphql-seller-authorization') {
        window.location.href = '/seller/unauthorized';
    } else if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0]?.status === 401 && typeof window !== 'undefined' && logoutAttempt < 1) {
        logoutAttempt += 1;
        handleSession();
    } else if (networkError && networkError?.statusCode === 413 && typeof window !== 'undefined') {
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

export default function createApolloClient(initialState, ctx) {
    const middlewareHeader = new ApolloLink((operation, forward) => {
        const additionalHeader = {};
        operation.setContext((req) => {
            const { headers = {} } = req;
            const language = req?.language ?? false;
            if (!language) {
                const store_code = cookies.get('language_store_code');
                if (store_code) {
                    if (store_code != 'undefined') {
                        const store_code_parse = JSON.parse(store_code);
                        additionalHeader.Store = store_code_parse;
                    }
                }
            }

            return {
                headers: {
                    ...headers,
                    ...additionalHeader,
                },
            };
        });

        return forward(operation);
    });

    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: from([
            middlewareHeader,
            logoutLink,
            link,
        ]),
        cache: new InMemoryCache({ fragmentMatcher }).restore(initialState),
        // eslint-disable-next-line no-underscore-dangle
        connectToDevTools: typeof window !== 'undefined' && window.__APOLLO_CLIENT__ && (appEnv === 'local'),
        resolvers: {},
    });
}
