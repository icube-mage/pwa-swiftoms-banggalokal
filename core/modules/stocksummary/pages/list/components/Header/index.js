/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import useStyles from '@modules/stocksummary/pages/list/components/Header/style';
import gqlService from '@modules/stocksummary/services/graphql';
import { useRouter } from 'next/router';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const [exportStockSummaryList] = gqlService.exportStockSummaryList();
    const [syncStockSummaryToMP] = gqlService.syncStockSummaryToMP();
    const router = useRouter();

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('stocksummary:Channel_Stock_Summary')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={async () => {
                    window.backdropLoader(true);
                    try {
                        const resp = await exportStockSummaryList();
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: t('stocksummary:The_channel_stock_summary_has_been_exported'),
                            variant: 'success',
                        });
                        setTimeout(() => router.push(resp?.data?.exportStockSummaryList), 250);
                    } catch (error) {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: error.message,
                            variant: 'error',
                        });
                    }
                }}
            >
                {t('stocksummary:Export')}
            </Button>
            <Button
                className={classes.buttonAdd}
                onClick={async () => {
                    window.backdropLoader(true);
                    try {
                        const resp = await syncStockSummaryToMP();
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: resp?.data?.syncStockSummaryToMP,
                            variant: 'success',
                        });
                    } catch (error) {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: error.message,
                            variant: 'error',
                        });
                    }
                }}
            >
                {t('stocksummary:Sync_To_Marketplace')}
            </Button>
        </div>
    );
};

export default HeaderContent;
