import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@common_button';

const TableMassAction = ({
    t,
    classes,
    loading,
    count,
    checkedRows,
    setShowConfirm,
}) => {
    if (!loading && (count && checkedRows?.length)) {
        return (
            <div className={classes.massAction}>
                <Grid container spacing={3}>
                    <Grid item>
                        {checkedRows.length ? `${checkedRows.length} ${t('sellercatalog:Product_Selected')}` : null}
                    </Grid>
                    <Grid item>
                        <Button
                            className={classes.deactiveBtn}
                            onClick={() => setShowConfirm(true)}
                        >
                            {t('Remove_Product')}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    return null;
};

export default TableMassAction;
