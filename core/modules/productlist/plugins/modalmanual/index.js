import React from 'react';
import { useRouter } from 'next/router';

import Content from '@modules/productlist/plugins/modalmanual/view';
import gqlService from '@modules/productlist/services/graphql';

const ModalManual = (props) => {
    const router = useRouter();
    const id = router && router.query && Number(router.query.id);

    const [getConfigurableProductAssociated, { loading, data }] = gqlService.getConfigurableProductAssociated();

    const contentProps = {
        ...props,
        getConfigurableProductAssociated,
        loading,
        data,
        id,
    };
    return <Content {...contentProps} />;
};

export default ModalManual;
