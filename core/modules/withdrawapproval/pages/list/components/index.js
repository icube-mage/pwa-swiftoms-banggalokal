/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import Table from '@common_table';
import Header from '@modules/withdrawapproval/pages/list/components/Header';
import useStyles from '@modules/locationpriceupload/pages/list/components/style';
import TextField from '@common_textfield';
import dynamic from 'next/dynamic';
import BalanceModal from '@modules/withdrawapproval/pages/list/components/balancemodal';

const Message = dynamic(() => import('@common_toast'), { ssr: false });

const VendorIrisPayoutApprovalContent = (props) => {
    const classes = useStyles();
    const { data, loading, getVendorIrisPayoutApprovalList, vendorIrisPayoutApprove, vendorIrisPayoutReject, t,
        show, setShow } = props;
    const irisPayoutApprovalList = (data && data.getVendorIrisPayoutApprovalList && data.getVendorIrisPayoutApprovalList.items) || [];
    const irisPayoutTotal = (data && data.getVendorIrisPayoutApprovalList && data.getVendorIrisPayoutApprovalList.total_count) || 0;

    const columns = [
        { field: 'vendor_name', headerName: t('withdrawapproval:Vendor'), hideable: true },
        { field: 'created_at', headerName: t('withdrawapproval:Transaction_Date'), sortable: true, hideable: true },
        { field: 'account_number', headerName: t('withdrawapproval:Bank_Account'), hideable: true },
        { field: 'amount', headerName: t('withdrawapproval:Amount'), hideable: true },
    ];

    const filters = [
        { field: 'vendor_name', name: 'vendor_name', type: 'like', label: t('withdrawapproval:Vendor'), initialValue: '' },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: t('withdrawapproval:Transaction_Date_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: t('withdrawapproval:Transaction_Date_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'account_number', name: 'account_number', type: 'like', label: t('withdrawapproval:Bank_Account'), initialValue: '' },
        { field: 'amount', name: 'amount_from', type: 'from', label: t('withdrawapproval:Amount_From'), initialValue: '' },
        { field: 'amount', name: 'amount_to', type: 'to', label: t('withdrawapproval:Amount_To'), initialValue: '' },
    ];

    const [toastMessage, setToastMessage] = useState({
        open: false,
        variant: '',
        text: '',
        htmlMessage: '',
    });

    const handleCloseMessage = () => {
        setToastMessage({ ...toastMessage, open: false });
    };

    return (
        <>
            <Header {...props} />
            <Table
                filters={filters}
                rows={irisPayoutApprovalList}
                primaryKey="entity_id"
                getRows={getVendorIrisPayoutApprovalList}
                // deleteRows={vendorIrisPayoutReject}
                loading={loading}
                columns={columns}
                count={irisPayoutTotal}
                showCheckbox
                recordName="iris payout approval"
                actions={[
                    {
                        label: t('withdrawapproval:Approve'),
                        message: t('withdrawapproval:Are_you_sure_you_want_to_approve'),
                        onClick: async (_checkedRows) => {
                            window.backdropLoader(true);
                            try {
                                const variables = { ids: _checkedRows.map((checkedRow) => Number(checkedRow.entity_id)) };
                                const res = await vendorIrisPayoutApprove({ variables });
                                if (res && res.data && res.data.vendorIrisPayoutApprove && res.data.vendorIrisPayoutApprove.error) {
                                    throw new Error(res.data.vendorIrisPayoutApprove.message);
                                }
                                window.toastMessage({
                                    open: true,
                                    text: t('withdrawapproval:Approve_success'),
                                    variant: 'success',
                                });
                            } catch (e) {
                                setToastMessage({
                                    open: true,
                                    text: '',
                                    variant: 'error',
                                    htmlMessage: e.message,
                                });
                            }
                            window.backdropLoader(false);
                        },
                    },
                    {
                        label: t('withdrawapproval:Reject'),
                        message: t('withdrawapproval:Are_you_sure_you_want_to_Reject'),
                        onClick: async (_checkedRows) => {
                            window.backdropLoader(true);
                            try {
                                const variables = { ids: _checkedRows.map((checkedRow) => Number(checkedRow.entity_id)) };
                                const res = await vendorIrisPayoutReject({ variables });
                                if (res && res.data && res.data.vendorIrisPayoutReject && res.data.vendorIrisPayoutReject.error) {
                                    throw new Error(res.data.vendorIrisPayoutReject.message);
                                }
                                window.toastMessage({
                                    open: true,
                                    text: t('withdrawapproval:Reject_success'),
                                    variant: 'success',
                                });
                            } catch (e) {
                                setToastMessage({
                                    open: true,
                                    text: '',
                                    variant: 'error',
                                    htmlMessage: e.message,
                                });
                            }
                            window.backdropLoader(false);
                        },
                    },
                ]}
            />
            <Message
                open={toastMessage.open}
                variant={toastMessage.variant}
                setOpen={handleCloseMessage}
                message={toastMessage.text}
                htmlMessage={toastMessage.htmlMessage}
                autoHideDuration={5000}
            />
            {show
            && (
                <BalanceModal
                    open={show}
                    handleClose={() => setShow(false)}
                    handleOpen={() => setShow(true)}
                    t={t}
                />
            )}
        </>
    );
};

export default VendorIrisPayoutApprovalContent;
