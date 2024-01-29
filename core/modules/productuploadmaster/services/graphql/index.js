import { useMutation } from '@apollo/client';
import * as Schema from '@modules/productuploadmaster/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

export const uploadSource = (variables) => useMutation(Schema.uploadSource, {
    variables, ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables, ...context,
});

export default {
    uploadSource,
    downloadSampleCsv,
};
