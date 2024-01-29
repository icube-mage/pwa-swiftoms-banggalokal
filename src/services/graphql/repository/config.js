/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@services/graphql/schema/config';

export const storeConfig = () => useQuery(Schema.storeConfig);
export const availableStores = () => useLazyQuery(Schema.availableStores, {
    context: {
        language: true,
    },
});

export default {
    storeConfig,
    availableStores,
};
