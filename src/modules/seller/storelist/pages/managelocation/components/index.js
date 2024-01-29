/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import BackHeader from '@common_backheaderseller';
import Autocomplete from '@common_autocomplete';
import StickyBottom from '@common_stickybottom';
import Button from '@common_button';

import Table from '@sellermodules/storelist/pages/managelocation/components/Table';
import useStyles from '@sellermodules/storelist/pages/managelocation/components/style';

const ManageLocationContent = (props) => {
    const { loading, t, locList, setLocList, dataWarehouse, handleSubmit, error, setError, isMultiWarehouse, dataLoc } = props;

    const classes = useStyles();
    const router = useRouter();

    const handleChangeLocation = (val, idx) => {
        const temp = [...locList];
        temp[idx].loc_id = val?.id || null;
        setLocList(temp);
    };

    const columns = [
        { field: 'id', headerName: 'ID', hidden: true },
        { field: 'location', headerName: <div className={classes.divTh}>{t('sellerstorelist:Location')}</div> },
        { field: 'marketplace_warehouse', headerName: t('sellerstorelist:Marketplace_Warehouse'), hidden: !isMultiWarehouse },
    ];

    const rows = locList.map((loc, locIndex) => ({
        ...loc,
        id: loc.loc_id,
        location: () => (
            <Autocomplete
                placeholder={t('sellerstorelist:Choose_Location')}
                className={clsx(classes.textInput, loc.is_not_found && 'notFound')}
                options={dataLoc.filter((opt) => !locList.map(({ loc_id }) => loc_id).includes(opt.id))}
                labelKey="name"
                primaryKey="id"
                onChange={(e) => handleChangeLocation(e, locIndex)}
                value={dataLoc.find(({ id }) => id === loc.loc_id)}
                error={(error && !loc.loc_id) || loc.is_not_found}
                helperText={(!loc.loc_id && error && t('sellerstorelist:This_is_a_Required_field')) || ''}
                fullWidth
            />
        ),
        marketplace_warehouse: (
            <div>
                {loc.is_not_found && loc.loc_id
                    ? (
                        <div className={classes.errorText}>
                            {t('sellerstorelist:Please_save_to_remove_loc_from_the_location_list', {
                                loc: dataLoc.find(({ id }) => id === loc.loc_id)?.name,
                            })}
                        </div>
                    ) : dataWarehouse.find(({ id }) => id === loc.marketplace_warehouse_id)?.name || '-'}
            </div>
        ),
    }));

    const contentProps = {
        ...props,
        loading,
        columns,
        rows,
    };

    useEffect(() => {
        if (locList.every(({ loc_id, is_not_found }) => !is_not_found && !!loc_id)) {
            setError(false);
        }
    }, [locList]);

    return (
        <>
            <div className={classes.container}>
                <BackHeader title={t('sellerstoreintegration:Store_List')} route="/seller/saleschannels/storelist" />
                <Table
                    {...props}
                    {...contentProps}
                />
            </div>
            <StickyBottom
                show
                parentClasses={classes.stickyBottomContainer}
                contentRight={(
                    <div className={classes.stickyBottomContainerRight}>
                        <Button
                            classes={{ root: clsx(classes.btnRoot, 'outlined') }}
                            buttonType="outlined"
                            onClick={() => router.push('/seller/warehouse')}
                        >
                            {t('sellerwarehouse:btn_cancel')}
                        </Button>
                        <Button
                            classes={{ root: classes.btnRoot }}
                            onClick={handleSubmit}
                        >
                            {t('sellerwarehouse:Save')}
                        </Button>
                    </div>
                )}
            />
        </>
    );
};

export default ManageLocationContent;
