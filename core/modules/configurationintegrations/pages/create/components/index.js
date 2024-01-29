import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';

import Button from '@common_button';
import Tabs from '@common_tabs';

import IntegrationInfoContent from '@modules/configurationintegrations/pages/create/components/integrationinfocontent';
import APIsContent from '@modules/configurationintegrations/pages/create/components/apiscontent';
import useStyles from '@modules/configurationintegrations/pages/create/components/style';

const IntegrationsCreateContent = (props) => {
    const {
        formik, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [tab, setTab] = useState('info');
    const dataTabs = [
        { label: t('sellercatalog:Integration_Info'), value: 'info' },
        { label: t('sellercatalog:APIs'), value: 'apis' },
    ];

    const renderContent = () => {
        switch (tab) {
        case 'info':
            return <IntegrationInfoContent {...props} />;
        case 'apis':
            return <APIsContent {...props} />;
        default:
            return <IntegrationInfoContent {...props} />;
        }
    };

    useEffect(() => {
        if (!formik.isSubmitting) return;
        const keys = Object.keys(formik.errors);
        if (keys.length > 0) {
            setTab('info');
        }
    }, [formik]);

    return (
        <>
            <div className={classes.topSection}>
                <div>
                    <Button
                        className={classes.btnBack}
                        onClick={() => router.push('/configurations/integrations')}
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
                    <h2 className={classes.titleTop}>{t('configurationintegrations:New_Integration')}</h2>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        style={{ marginLeft: 10 }}
                        className={classes.btn}
                        onClick={() => {
                            formik.setFieldValue('activate', true);
                            formik.handleSubmit();
                        }}
                        buttonType="outlined"
                        variant="contained"
                    >
                        {t('configurationintegrations:Save_and_Activate')}
                    </Button>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('configurationintegrations:Save')}
                    </Button>
                </div>
            </div>
            <Tabs
                data={dataTabs}
                transparent
                onChange={(e, v) => setTab(v)}
                value={tab}
                allItems={false}
                containerClass={classes.tabs}
            />
            <Paper className={classes.container}>
                {renderContent()}
            </Paper>
        </>
    );
};

export default IntegrationsCreateContent;
