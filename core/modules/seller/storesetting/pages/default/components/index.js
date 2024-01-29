/* eslint-disable no-param-reassign */
import React from 'react';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';

import Tabs from '@common_tabsseller';

import InformationContent from '@sellermodules/storesetting/pages/default/components/information';
import LocationContent from '@sellermodules/storesetting/pages/default/components/location';
import ManageBannerContent from '@sellermodules/storesetting/pages/default/components/managebanner';
import DisplayWindowContent from '@sellermodules/storesetting/pages/default/components/displaywindow';
import useStyles from '@sellermodules/storesetting/pages/default/components/style';

const StoreSettingContent = (props) => {
    const {
        t, formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const { setting } = router.query;
    const tab = (setting === '' ? 0 : setting) || 0;
    const dataTabs = [
        { label: t('storesetting:Information'), value: 0 },
        { label: t('storesetting:Location'), value: 'location' },
        { label: t('storesetting:Manage_Banner'), value: 'banner' },
        { label: t('storesetting:Display_Window'), value: 'displaywindow' },
    ];

    const renderComponent = () => {
        switch (tab) {
        case 'location':
            return <LocationContent {...props} />;
        case 'banner':
            return <ManageBannerContent {...props} />;
        case 'displaywindow':
            return <DisplayWindowContent {...props} />;
        default:
            return <InformationContent {...props} />;
        }
    };

    const onChangeTab = (e, v) => {
        const routeParams = v === 0 ? '' : `/${v}`;
        router.replace(`/seller/storesetting${routeParams}`, undefined, { shallow: true });
    };

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
            <Paper className={classes.container}>
                <h2 className={classes.title}>{t('storesetting:Store_Setting')}</h2>
                <Tabs data={dataTabs} onChange={onChangeTab} value={tab} allItems={false} />
            </Paper>
            <div style={{ height: 20 }} />
            {renderComponent()}
            <div style={{ height: 20 }} />
        </div>
    );
};

export default StoreSettingContent;
