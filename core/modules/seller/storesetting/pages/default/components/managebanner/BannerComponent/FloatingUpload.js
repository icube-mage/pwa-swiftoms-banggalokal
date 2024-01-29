/* eslint-disable object-curly-newline */
import clsx from 'clsx';

import Divider from '@material-ui/core/Divider';

import useStyles from '@sellermodules/storesetting/pages/default/components/managebanner/style';

const ManageBannerContent = (props) => {
    const { t, indexActive, renderDescription, renderUpload, useFields, mode } = props;
    const classes = useStyles();

    return (
        <div className={clsx(classes.gridEdit, !(indexActive >= 0) && 'nonVisible', mode)}>
            <div className={clsx(classes.contentContainer, 'right')}>
                <h2 className={classes.title}>
                    {t('storesetting:Set_Design')}
                </h2>
                <Divider />
                {renderDescription(useFields[indexActive])}
                {renderUpload(useFields[indexActive])}
            </div>
        </div>
    );
};

export default ManageBannerContent;
