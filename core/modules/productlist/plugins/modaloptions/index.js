import React from 'react';

import Content from '@modules/productlist/plugins/modaloptions/view';
import gqlService from '@modules/productlist/services/graphql';

const ModalOptions = (props) => {
    const [getAllProductHasOptions, { loading, data }] = gqlService.getAllProductHasOptions();

    return <Content getAllProductHasOptions={getAllProductHasOptions} data={data} loading={loading} {...props} />;
};

export default ModalOptions;
