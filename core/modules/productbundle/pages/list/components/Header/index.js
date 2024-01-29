/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/productbundle/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t, isAllowImport } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('productbundle:Product_Bundle')}</h2>
            {isAllowImport
            && (
                <Button className={classes.buttonAdd} onClick={() => router.push('/product/productbundle/import')}>
                    {t('productbundle:Import_Product_Bundle')}
                </Button>
            )}
        </div>
    );
};

export default HeaderContent;
