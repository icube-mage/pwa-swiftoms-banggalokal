import React from 'react';
import useStyles from '@modules/failedreason/pages/list/components/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('failedreason:Manage_Failed_Reason')}</h2>
        </div>
    );
};

export default HeaderContent;
