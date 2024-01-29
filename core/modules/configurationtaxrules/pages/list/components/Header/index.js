/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/productlist/pages/list/components/Header/style';

const HeaderContent = ({ t }) => {
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('taxrulesconfiguration:Tax_Rules_Configuration')}</h2>
            <Button className={classes.buttonAdd} onClick={() => router.push('/configurations/taxrules/create')}>
                {t('taxrulesconfiguration:Add_New_Tax_Rule')}
            </Button>
        </div>
    );
};

export default HeaderContent;
