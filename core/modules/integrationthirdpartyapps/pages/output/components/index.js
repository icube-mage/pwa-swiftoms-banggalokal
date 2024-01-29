/* eslint-disable react/no-danger */
/* eslint-disable max-len */
import React from 'react';
import { useRouter } from 'next/router';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';

import Tabs from '@common_tabs';
import Button from '@common_button';

import OutputFormat from '@modules/integrationthirdpartyapps/pages/output/components/OutputFormat';

import useStyles from '@modules/integrationthirdpartyapps/pages/output/components/style';

const LocationCreateContent = (props) => {
    const {
        t, formikOutputFormat,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const { content } = router.query;
    const tab = (content === '' ? 0 : content) || 0;
    const dataTab = [
        { label: t('productlist:Output_Format'), value: 0 },
    ];

    const onChangeTab = async (e, v) => {
        if (v !== tab) {
            router.replace({
                pathname: `/integration/thirdpartyapps/edit/[id]/output${v ? `/${v}` : ''}`,
                query: { id: router.query.id },
            }, undefined, { shallow: true });
        }
    };

    const renderComponent = () => {
        switch (tab) {
        case 0:
            return <OutputFormat {...props} />;
        default:
            return <OutputFormat {...props} />;
        }
    };

    return (
        <>
            <div className={classes.topPage}>
                <div>
                    <Button
                        className={classes.btnBack}
                        onClick={() => router.push({
                            pathname: '/integration/thirdpartyapps/edit/[id]',
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
                    <h2 className={classes.titleTop}>{t('productlist:Edit_Output')}</h2>
                </div>
                <div className={classes.buttonSave}>
                    <Button
                        className={classes.button}
                        onClick={formikOutputFormat.handleSubmit}
                        variant="contained"
                    >
                        {t('integrationthirdpartyapps:Save_Changes')}
                    </Button>
                </div>
            </div>

            <Paper className={classes.container}>
                <Tabs data={dataTab} onChange={onChangeTab} value={tab} allItems={false} rounded />
                <div className={classes.divider} />
                {renderComponent()}
            </Paper>
            <div className={classes.divider} />
        </>
    );
};

export default LocationCreateContent;
