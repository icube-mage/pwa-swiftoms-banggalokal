/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/orderqueue/pages/filteredlist/components/Header/style';
import clsx from 'clsx';

const HeaderContent = (props) => {
    const { t, headerTitle, showBulkButton } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={clsx(classes.headerContainer, !showBulkButton && 'hideBulkButton')}>
            <h2 className={classes.title}>{headerTitle}</h2>
            {/* <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/order/orderqueue/create')}
            >
                Create Sales Channel
            </Button> */}
            {showBulkButton
            && (
                <Button
                    className={classes.buttonAdd}
                    onClick={() => router.push('/order/failed/import')}
                >
                    {t('order:Bulk_Reallocation')}
                </Button>
            )}
        </div>
    );
};

export default HeaderContent;
