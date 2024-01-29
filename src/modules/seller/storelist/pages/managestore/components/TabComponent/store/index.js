import React from 'react';

import Button from '@common_button';

import useStyles from '@sellermodules/storelist/pages/managestore/components/TabComponent/store/style';

const ManageStoreContent = (props) => {
    const {
        t, handleManageStore, data,
    } = props;

    const classes = useStyles();

    return (
        <div>
            <div className={classes.title}>{data.store_domain}</div>
            <div>{t('sellermanagestore:Manage_online_store_to_sell_on_the_website')}</div>
            <div className={classes.buttonContainer}>
                <Button
                    onClick={() => window.open(`https://${data.store_domain}`, '_blank')}
                    buttonType="outlined"
                    classes={{ root: classes.btnRootOutlined }}
                >
                    {t('sellermanagestore:View_Store')}
                </Button>
                <Button
                    classes={{ root: classes.btnRoot }}
                    onClick={handleManageStore}
                >
                    {t('sellermanagestore:Manage_Online_Store')}

                </Button>
            </div>
        </div>
    );
};

export default ManageStoreContent;
