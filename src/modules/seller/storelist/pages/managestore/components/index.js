/* eslint-disable object-curly-newline */
import React from 'react';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';

import BackHeader from '@common_backheaderseller';
import Tabs from '@common_tabsseller';

import Store from '@sellermodules/storelist/pages/managestore/components/TabComponent/store';
import useStyles from '@sellermodules/storelist/pages/managestore/components/style';

const ManageStoreContent = (props) => {
    const { t } = props;

    const classes = useStyles();
    const router = useRouter();

    const dataTabs = [
        { label: t('sellermanagestore:Manage_Store'), value: 0 },
    ];

    const onChangeTab = (e, v) => {
        const value = v === 0 ? '' : v;
        if (value !== (router.query.tab || '')) {
            router.replace(`/seller/saleschannels/managestore/${router.query.store_code}/${value}`,
                undefined, { shallow: v !== 'help' });
        }
    };

    return (
        <>
            <div className={classes.container}>
                <BackHeader title={t('sellermanagestore:Store_List')} route="/seller/saleschannels/storelist" />
                <div className={classes.tabsContainer}>
                    <Tabs data={dataTabs} onChange={onChangeTab} value={router.query.tab || 0} allItems={false} noBorder />
                </div>
                <Paper classes={{ root: classes.rootPaper }}>
                    <Store {...props} />
                </Paper>
            </div>
        </>
    );
};

export default ManageStoreContent;
