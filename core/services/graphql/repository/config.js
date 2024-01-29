/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { useQuery } from '@apollo/client';
import * as Schema from '@services/graphql/schema/config';

export const storeConfig = () => useQuery(Schema.storeConfig);
export default {
    storeConfig,
};
