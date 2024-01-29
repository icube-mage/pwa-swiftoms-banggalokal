/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
// import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/batchcreate/pages/manualorder/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('createpickbybatch:Select_Order')}</h2>
        </div>
    );
};

export default HeaderContent;
