/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import useStyles from '@modules/inventoryaudittrail/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('inventoryaudittrail:Inventory_Audit_Trail')}</h2>
        </div>
    );
};

export default HeaderContent;
