import React from 'react';

import Select from '@common_select';

import Tree from '@modules/configurationintegrations/plugins/Tree';
import { allIdTree } from '@modules/configurationintegrations/helpers';

import useStyles from '@modules/configurationintegrations/pages/create/components/apiscontent/style';

const APIsContent = (props) => {
    const {
        t, formik, dataTree,
    } = props;
    const classes = useStyles();

    const selectOptions = [
        { value: 'false', label: t('configurationintegrations:Custom') },
        { value: 'true', label: t('configurationintegrations:Select_All') },
    ];

    return (
        <>
            <div className={classes.content}>
                <div className={classes.sectionHead}>
                    <h5 className={classes.sectionTitle}>{t('configurationintegrations:Available_APIs')}</h5>
                    <div>
                        <Select
                            name="all_resources"
                            value={formik.values.all_resources}
                            onChange={(e) => {
                                formik.handleChange(e);
                                if (e.target.value === 'true') {
                                    formik.setFieldValue('resource', allIdTree(dataTree));
                                } else {
                                    formik.setFieldValue('resource', []);
                                }
                            }}
                            dataOptions={selectOptions}
                            selectClasses={classes.fieldInput}
                            enableEmpty={false}
                        />
                    </div>
                </div>
            </div>
            <div className={classes.content}>
                <Tree {...props} name="resource" allIdTree={allIdTree(dataTree)} />
            </div>
        </>
    );
};

export default APIsContent;
