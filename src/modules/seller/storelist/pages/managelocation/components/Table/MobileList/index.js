import Paper from '@material-ui/core/Paper';

import useStyles from '@sellermodules/storelist/pages/managelocation/components/Table/MobileList/style';

export const getComponentOrString = (param) => {
    if (typeof param === 'function') {
        return param();
    }
    if (typeof param === 'string' || typeof param === 'number') {
        if (String(param) !== 'undefined') {
            return String(param);
        }
    }
    return param;
};

const StoreListMobileContent = (props) => {
    const {
        t, dataToMap, isMultiWarehouse,
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.tableBodyContainer}>
            {!dataToMap.length ? null : dataToMap.map((row, rowIndex) => (
                <Paper key={rowIndex} className={classes.rowPaper}>
                    <div className={classes.rowBody}>
                        <div className="action">
                            {getComponentOrString(row.actions)}
                        </div>
                        <div className="flex column gap10">
                            <div className="flex column">
                                <div className="title">{t('sellerstorelist:Location')}</div>
                                <div>{getComponentOrString(row.location)}</div>
                            </div>
                            {isMultiWarehouse
                            && (
                                <div className="flex column">
                                    <div className="title">{t('sellerstorelist:Marketplace_Warehouse')}</div>
                                    <div>{getComponentOrString(row.marketplace_warehouse)}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </Paper>
            ))}
        </div>
    );
};

export default StoreListMobileContent;
