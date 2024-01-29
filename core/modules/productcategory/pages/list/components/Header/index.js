/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/productcategory/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { handlePull, t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('productcategory:Marketplace_Product_Category')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={handlePull}
            >
                {t('productcategory:Pull_Categories')}
            </Button>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/marketplace/productcategory/updatestatus')}
            >
                {t('productcategory:Update_Status')}
            </Button>
        </div>
    );
};

export default HeaderContent;
