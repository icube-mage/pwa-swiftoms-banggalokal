/* eslint-disable max-len */
import React from 'react';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';

import Tree from '@modules/integrationautomation/pages/availablefields/components/Tree';
import useStyles from '@modules/integrationautomation/pages/availablefields/components/style';

const LocationCreateContent = (props) => {
    const {
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <h2 className={classes.titleTop}>{t('integrationautomation:Fields_Available_for_Webhook_Input')}</h2>
            <Paper className={classes.container}>
                <div className={classes.info}>
                    {t('integrationautomation:Data_is_based_on_Entity_ID_number', { number: router.query.export_id })}
                </div>
                <Tree {...props} />
            </Paper>
        </>
    );
};

export default LocationCreateContent;
