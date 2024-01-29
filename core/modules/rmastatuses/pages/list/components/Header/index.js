/* eslint-disable object-curly-newline */
import React from 'react';
import useStyles from '@modules/rmastatuses/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('rmastatuses:Manage_Status')}</h2>
        </div>
    );
};

export default HeaderContent;
