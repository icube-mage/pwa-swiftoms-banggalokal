/* eslint-disable object-curly-newline */
import React from 'react';
import { useRouter } from 'next/router';
import Button from '@common_button';
import useStyles from '@modules/thirdpartyapps/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const router = useRouter();
    const classes = useStyles();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('thirdpartyapps:Third_Party_Apps')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/vendorportal/thirdpartyapps/create')}
            >
                {t('thirdpartyapps:Create')}
            </Button>
        </div>
    );
};

export default HeaderContent;
