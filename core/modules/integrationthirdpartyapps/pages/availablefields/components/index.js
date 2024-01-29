/* eslint-disable max-len */
import React from 'react';
import { useRouter } from 'next/router';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';

import Button from '@common_button';

import Tree from '@modules/integrationthirdpartyapps/pages/availablefields/components/Tree';
import useStyles from '@modules/integrationthirdpartyapps/pages/availablefields/components/style';

const LocationCreateContent = (props) => {
    const {
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push({
                    pathname: '/integration/thirdpartyapps/edit/[id]/output',
                    query: { id: router.query.id },
                })}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>{t('integrationthirdpartyapps:Fields_Available_for_Webhook_Input')}</h2>
            <Paper className={classes.container}>
                <div className={classes.info}>
                    {t('integrationthirdpartyapps:Data_is_based_on_Shipment_number', { number: router.query.shipment_number })}
                </div>
                <Tree {...props} />
            </Paper>
        </>
    );
};

export default LocationCreateContent;
