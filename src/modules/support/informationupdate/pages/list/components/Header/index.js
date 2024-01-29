import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/support/informationupdate/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('information_update')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/support/informationupdate/create')}
            >
                {t('create_publish')}
            </Button>
        </div>
    );
};

export default HeaderContent;
