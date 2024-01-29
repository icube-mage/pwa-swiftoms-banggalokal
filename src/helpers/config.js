/* eslint-disable import/prefer-default-export */
const { HOST, graphqlEndpoint, docsGuide } = require('@root/swift.config');
const { getAppEnv } = require('@helpers/env');

const getHost = () => {
    const appEnv = getAppEnv();
    const globalHost = HOST[appEnv] || HOST.prod;
    return globalHost;
};

const getStoreHost = (appEnv = getAppEnv()) => {
    let storeHost = graphqlEndpoint[appEnv] || graphqlEndpoint.prod;
    storeHost = storeHost.replace('graphql', '');
    return storeHost;
};

const getDocsGuide = () => {
    const appEnv = getAppEnv();
    const urlDocs = docsGuide[appEnv] || docsGuide.prod;
    return urlDocs;
};

module.exports = { getHost, getStoreHost, getDocsGuide };
