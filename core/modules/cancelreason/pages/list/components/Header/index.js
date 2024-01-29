import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/cancelreason/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('cancelreason:Manage_Cancel_Reason')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/configurations/cancelreason/create')}
            >
                {t('cancelreason:Add_Cancel_Reason')}
            </Button>
        </div>
    );
};

export default HeaderContent;
