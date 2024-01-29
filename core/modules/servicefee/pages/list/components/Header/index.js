import React from 'react';

import useStyles from '@modules/servicefee/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('servicefee:Service_Fee')}</h2>
        </div>
    );
};

export default HeaderContent;
