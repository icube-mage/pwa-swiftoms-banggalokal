import React from 'react';
import useStyles from '@modules/integrationsupport/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('menu:integration_support')}</h2>
        </div>
    );
};

export default HeaderContent;
