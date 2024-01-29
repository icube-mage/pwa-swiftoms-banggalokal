/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/productattributemapping/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();
    const { handleExport, t } = props;

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('productattributemapping:Marketplace_Product_Attribute_Mapping')}</h2>
            <div className={classes.headerContainer}>
                <Button
                    className={classes.buttonAdd}
                    onClick={() => router.push('/marketplace/productattributemapping/add')}
                >
                    {t('productattributemapping:Add_New_Mapping')}
                </Button>
                <Button
                    className={classes.buttonAdd}
                    onClick={handleExport}
                >
                    {t('productattributemapping:Export_Marketplace_Product_Attributes')}
                </Button>
                <Button
                    className={classes.buttonAdd}
                    onClick={() => router.push('/marketplace/productattributemapping/import')}
                >
                    {t('productattributemapping:Import_Mapping')}
                </Button>
            </div>
        </div>
    );
};

export default HeaderContent;
