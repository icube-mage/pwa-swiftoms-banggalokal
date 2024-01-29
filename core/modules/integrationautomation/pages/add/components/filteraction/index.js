import React from 'react';

import Tree from '@modules/integrationautomation/pages/add/components/filteraction/TreeSelection';

import useStyles from '@modules/integrationautomation/pages/add/components/filteraction/style';

const FiltersActionContent = (props) => {
    const {
        t, formik, getEventConditions, getEventConditionsRes,
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.contentBorder}>
            <h5 className={classes.titleSmall}>{t('integrationautomation:Generate_data_only_if_the_following_conditions_are_met')}</h5>
            <Tree
                formik={formik}
                t={t}
                getEventConditions={getEventConditions}
                getEventConditionsRes={getEventConditionsRes}
            />
        </div>
    );
};

export default FiltersActionContent;
