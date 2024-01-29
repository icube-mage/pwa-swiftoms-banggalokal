import React from 'react';

import Content from '@modules/productlist/plugins/modalbundle/view';
import gqlService from '@modules/productlist/services/graphql';

const ModalBundle = (props) => {
    const [getBundleOptionList, { data, loading }] = gqlService.getBundleOptionList();

    return <Content getBundleOptionList={getBundleOptionList} data={data} loading={loading} {...props} />;
};

export default ModalBundle;
