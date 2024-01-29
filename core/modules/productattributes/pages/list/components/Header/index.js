/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/productattributes/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('productattributes:Product_Attributes')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/product/productattributes/create')}
            >
                {t('productattributes:Create_Product_Attribute')}
            </Button>
        </div>
    );
};

export default HeaderContent;
