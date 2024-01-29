import React from 'react';
import useStyles from '@modules/batchpack/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('packlist:Pack_List')}</h2>
        </div>
    );
};

export default HeaderContent;
