/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import getConfig from 'next/config';

const { GraphQLClient } = require('graphql-request');
const { HOST } = require('../../../../swift.config');

const { decrypt } = require('../../../helpers/encryption');

const { publicRuntimeConfig } = getConfig();

function requestGraphInternal(query, variables = {}, context = {}) {
    let token = '';
    if (context.session || context.headers) {
        token = context.session.token ? `Bearer ${decrypt(context.session.token)}`
            : context.headers.authorization ? context.headers.authorization : '';
    }

    const host = (typeof publicRuntimeConfig !== 'undefined' && HOST[publicRuntimeConfig.appEnv])
        ? HOST[publicRuntimeConfig.appEnv] : HOST.dev;
    return new Promise((resolve) => {
        const headers = {
            Authorization: token,
        };
        const client = new GraphQLClient(`${host}/graphql`, {
            headers,
        });
        // console.log(client);
        client.request(query, variables).then((data) => resolve(data)).catch((err) => resolve(err));
    });
}

module.exports = requestGraphInternal;
