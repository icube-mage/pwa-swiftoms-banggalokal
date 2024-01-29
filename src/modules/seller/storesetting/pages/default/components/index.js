import React from 'react';

import InformationContent from '@sellermodules/storesetting/pages/default/components/information';

const StoreSettingContent = (props) => {
    const {
        formik,
    } = props;

    React.useEffect(() => {
        if (!formik.isSubmitting) return;
        const keysError = Object.keys(formik.errors);
        if (keysError.length > 0) {
            const keyName = keysError[0];
            const node = document.getElementsByName(keyName);
            if (node?.length) {
                node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                node[0].focus();
            }
        }
    }, [formik]);

    return (
        <div style={{ paddingBottom: 10 }}>
            <div style={{ height: 20 }} />
            <InformationContent {...props} />
            <div style={{ height: 40 }} />
        </div>
    );
};

export default StoreSettingContent;
