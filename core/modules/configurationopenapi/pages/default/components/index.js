/* eslint-disable no-confusing-arrow */
/* eslint-disable indent */
/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/configurationopenapi/pages/default/components/style';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InputMultiSelect from '@modules/configurationopenapi/pages/default/components/inputMultiSelect';

const ConfigOpenApiContent = (props) => {
    const { formik, dataOpenApi, t } = props;

    const classes = useStyles();

    return (
        <>
            <h2 className={classes.titleTop}>{t('openapiconfiguration:Open_API_Configuration')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {dataOpenApi?.map((parent, index) => (
                        <Accordion
                            TransitionProps={{ unmountOnExit: true }}
                            key={index}
                            elevation={4}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                <h2 className={classes.title} style={{ textTransform: 'uppercase' }}>
                                    {parent.label}
                                </h2>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                <div className={classes.contentChild}>
                                    {parent.fields.map((firstChild) => (
                                        <InputMultiSelect
                                            name={firstChild.id.replaceAll('/', '_')}
                                            options={firstChild.options}
                                            formik={formik}
                                            canRestore={firstChild.can_restore}
                                            depends={firstChild.depends ? firstChild.depends : null}
                                            t={t}
                                            {...firstChild}
                                        />
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    <div className={classes.formFieldButton}>
                        <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                            Submit
                        </Button>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default ConfigOpenApiContent;
