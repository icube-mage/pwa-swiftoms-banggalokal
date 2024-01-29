/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Table from '@common_table';
import CustomList from '@common_customlist';

import Header from '@modules/servicefee/pages/list/components/Header';
import EditDialog from '@modules/servicefee/pages/list/components/EditDialog';
import useStyles from '@modules/servicefee/pages/list/components/style';
import { breakPointsUp } from '@helper_theme';

const ManageBankListContent = (props) => {
    const { data, loading, getServiceFeeList, t, setOpen, setDetail, formik } = props;
    const desktop = breakPointsUp('sm');
    const classes = useStyles();

    const serviceList = (data && data.getServiceFeeList && data.getServiceFeeList.items) || [];
    const serviceTotal = (data && data.getServiceFeeList && data.getServiceFeeList.total_count) || 0;

    const columns = [
        { field: 'name', headerName: t('servicefee:Category_Name'), hideable: true, sortable: true },
        { field: 'fee_percent', headerName: t('servicefee:Percent_Fee'), hideable: true, sortable: true },
        { field: 'actions', headerName: t('servicefee:Action') },
    ];

    const filters = [
        { field: 'name', name: 'name', type: 'like', label: t('servicefee:Category_Name'), initialValue: '' },
    ];

    const onClick = (service) => {
        setOpen(true);
        setDetail({
            ...service,
            id: service?.category?.category_id,
            name: service?.category?.name,
            fee: service.fee_percent,
        });
        formik.setFieldValue('fee', service.fee_percent);
    };
    const rows = serviceList.map((service) => ({
        ...service,
        id: service?.category?.category_id,
        name: service?.category?.name,
        fee: service.fee_percent,
        actions: () => (
            <div className={classes.editLink}>
                <span className="text" onClick={() => onClick(service)} aria-hidden="true">{t('servicefee:Edit')}</span>
            </div>
        ),
    }));

    return (
        <>
            <Header t={t} />
            {desktop ? (
                <Table
                    filters={filters}
                    rows={rows}
                    getRows={getServiceFeeList}
                    loading={loading}
                    columns={columns}
                    count={serviceTotal}
                    hideActions
                />
            )
                : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getServiceFeeList}
                        loading={loading}
                        columns={columns}
                        count={serviceTotal}
                        hideActions
                        hideColumn={false}
                        twoColumns
                        handleClickRow={onClick}
                        usePagination
                        getKey={false}
                    />
                )}
            <EditDialog {...props} />
        </>
    );
};

export default ManageBankListContent;
