/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */

const http = require('http');
const {
    ApolloServer,
    introspectSchema,
    makeRemoteExecutableSchema,
} = require('apollo-server-express');
const cookieSession = require('cookie-session');
const express = require('express');
const next = require('next');
const { mergeSchemas } = require('graphql-tools');

const LRUCache = require('lru-cache');
const cookieParser = require('cookie-parser');
const nextI18next = require('./core/lib/i18n');
const fetcher = require('./src/api/graphql');
const chatFetcher = require('./core/api/graphql/chatFetcher');
const resolver = require('./src/api/graphql/resolver/index');
const { AuthSchema } = require('./src/api/graphql/schema/index');

const { json, urlencoded } = express;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const {
    expiredToken, nossrCache, features,
} = require('./swift.config');
const { SESSION_SECRET } = require('./swift-server.config');
const captchaValidation = require('./core/api/rest/captcha');
const firebaseValidation = require('./src/api/rest/firebase-cloud-messaging');
const webstoreValidation = require('./src/api/rest/webstore');
const validateToken = require('./src/api/rest/validate-token');
const generateAccessToken = require('./src/api/rest/generate-access-token');
const getAdminList = require('./src/api/rest/get-admin-list');
const getProfile = require('./src/api/rest/get-profile');

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
    max: 100 * 1024 * 1024, /* cache size will be 100 MB using `return n.length` as length() function */
    // eslint-disable-next-line no-unused-vars
    length(n, key) {
        return n.length;
    },
    maxAge: 1000 * 60 * 60 * 24, // create max age 1 day
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
    return `${req.path}`;
}

async function renderAndCache(req, res) {
    const key = getCacheKey(req);
    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key) && typeof req.query.resetcache === 'undefined') {
        res.setHeader('x-cache', 'HIT');
        res.send(ssrCache.get(key));
        return;
    }

    // reset cache if have query resetcache
    if (req.query && typeof req.query.resetcache !== 'undefined') {
        ssrCache.reset();
    }

    try {
        // console.log(`key ${key} not found, rendering`);
        // If not let's render the page into HTML
        const html = await app.renderToHTML(req, res, req.path, req.query);

        // Something is wrong with the request, let's skip the cache
        if (res.statusCode !== 200) {
            res.send(html);
            return;
        }
        // Let's cache this page
        ssrCache.set(key, html);

        res.setHeader('x-cache', 'MISS');
        res.send(html);
    } catch (err) {
        app.renderError(err, req, res, req.path, req.query);
    }
}

(async () => {
    await app.prepare();
    const server = express();
    server.use(cookieParser());
    // disable x-powered-by
    // server.disable('x-powered-by');
    // if ssr cache on
    if (features.ssrCache) {
        // handle next js request
        server.get('/_next/*', (req, res) => {
            /* serving _next static content using next.js handler */
            handle(req, res);
        });

        server.get('/assets/*', (req, res) => {
            /* serving assets static content using next.js handler */
            handle(req, res);
        });

        server.get('/static/*', (req, res) => {
            /* serving static content using next.js handler */
            handle(req, res);
        });

        server.get('/manifest.json', (req, res) => {
            /* serving manifest json */
            handle(req, res);
        });

        server.get('/favicon.ico', (req, res) => {
            /* serving manifest json */
            handle(req, res);
        });
        server.get('/service-worker.js', (req, res) => {
            /* serving service-worker */
            handle(req, res);
        });
    }

    await nextI18next.initPromise;

    server.use(cookieSession({
        name: 'qwt-swift',
        keys: [SESSION_SECRET],
        maxAge: expiredToken,
    }));

    server.use(json({ limit: '50mb' }));
    server.use(urlencoded({ extended: true }));

    if (fetcher) {
        const schema = makeRemoteExecutableSchema({
            schema: await introspectSchema(fetcher),
            fetcher,
        });

        let schemas = null;
        if (features.chatSystem.enabled && chatFetcher) {
            const chatSchema = makeRemoteExecutableSchema({
                schema: await introspectSchema(chatFetcher),
                fetcher: chatFetcher,
            });
            schemas = mergeSchemas({
                schemas: [schema, chatSchema, AuthSchema],
                resolvers: resolver,
            });
        } else {
            schemas = mergeSchemas({
                schemas: [schema, AuthSchema],
                resolvers: resolver,
            });
        }

        // handle server graphql endpoint use `/graphql`
        const serverGraph = new ApolloServer({
            schema: schemas,
            context: ({ req }) => req,
            // playground: {
            //     endpoint: '/graphql',
            //     settings: {
            //         'editor.theme': 'light',
            //     },
            // },
            playground: false,
            formatError: (err) => {
                if (err.message === 'graphql-authorization') {
                    return {
                        message: err.message,
                        extensions: {
                            category: 'graphql-authorization',
                        },
                        status: 401,
                    };
                }
                return err;
            },
        });
        serverGraph.applyMiddleware({ app: server });
    }

    // server.get('/sitemap.xml', generateXml);
    server.post('/captcha-validation', captchaValidation);

    // add firebase validation
    server.post('/auth/fcm-token', firebaseValidation);

    // validate access token
    server.post('/validate-token', validateToken);

    // generare access token
    server.post('/generate-access-token', generateAccessToken);

    // get admin list
    server.get('/get-admin-list', getAdminList);

    // gget user profile
    server.get('/get-user-profile', getProfile);

    server.get('*.woff2?', (req, res) => {
        res.setHeader('Cache-Control', 'public,max-age=31536000');
        handle(req, res);
    });

    // add webstore validation
    server.get('/webstore-multitenant', webstoreValidation);

    /**
     * configuration firebase messaging
     *   */
    // const serviceWorkers = [
    //     {
    //         filename: '.well-known/assetlinks.json',
    //         pathfile: './public/static/assetlinks.json',
    //     },
    // ];

    // serviceWorkers.forEach(({ filename, pathfile }) => {
    //     server.get(path.join(basePath, filename), (req, res) => {
    //         app.serveStatic(req, res, pathfile);
    //     });
    // });

    // server.get('*', (req, res) => handle(req, res));
    server.get('*', (req, res) => {
        const key = getCacheKey(req);
        // handle no cache ssr
        const found = nossrCache.find((val) => val === key);
        if (found || !features.ssrCache) {
            return handle(req, res);
        }
        /* serving page */
        return renderAndCache(req, res);
    });

    // create server
    const httpServer = http.createServer(server);
    await httpServer.listen(3000);
    console.log('> Ready on http://localhost:3000'); // eslint-disable-line no-console
})();
