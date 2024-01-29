import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Button from '@common_button';
import Tabs from '@common_tabs';

import GeneralInformationContent from '@modules/integrationautomation/pages/add/components/generalinformation';
import OutputFormatContent from '@modules/integrationautomation/pages/add/components/outputformat';
import FiltersActionContent from '@modules/integrationautomation/pages/add/components/filteraction';
import useStyles from '@modules/integrationautomation/pages/add/components/style';

const AddAutomationContent = (props) => {
    const {
        t, formik, tab, setTab,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const dataTabs = [
        { label: t('sellercatalog:General_Information'), value: 'info' },
        { label: t('sellercatalog:Output_Format'), value: 'output', disabled: !formik.values.events?.event_id },
        { label: t('sellercatalog:Filters__Actions'), value: 'filter', disabled: !formik.values.events?.event_id },
    ];

    const renderContent = () => {
        switch (tab) {
        case 'info':
            return <GeneralInformationContent {...props} />;
        case 'output':
            return <OutputFormatContent {...props} />;
        case 'filter':
            return <FiltersActionContent {...props} />;
        default:
            return <GeneralInformationContent {...props} />;
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
                        onClick={() => router.push('/integration/automation')}
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
                    <h2 className={classes.titleTop}>{t('integrationautomation:Add_Automation')}</h2>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('integrationautomation:Submit')}
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
            <div className={classes.divider} />
        </>
    );
};

export default AddAutomationContent;
