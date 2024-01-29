/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable max-len */
import clsx from 'classnames';
import useStyles from '@sellermodules/order/pages/status/components/style';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@common_button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AppModal from '@common_appmodal/index';
import BoxReason from '@common_boxreason/index';
import TextField from '@common_textfield';
import Box from '@material-ui/core/Box';
import { useState, useEffect } from 'react';

const UpdateAllocationDialog = (props) => {
    // prettier-ignore
    const {
        open, onClose, t,
        formik, loadingReallocate, currentStock,
    } = props;
    const classes = useStyles();

    const getPreviewStock = (sku, location, stock) => {
        const [getCurrentStock] = currentStock.filter((i) => i?.sku === sku && i?.location.loc_id === location) || [];
        return getCurrentStock?.qty_saleable + stock;
    };

    useEffect(() => {
        formik.resetForm();
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent className={classes.dialogContent}>
                <div className="title">{t('sellerorder:Edit_Stock')}</div>
                <TableContainer>
                    <Table>
                        <TableHead style={{ background: '#F3F4FA' }}>
                            <TableRow>
                                <TableCell className={clsx(classes.th, 'noborder-bottom')}>{t('sellerorder:Product')}</TableCell>
                                <TableCell className={clsx(classes.th, 'noborder-bottom')}>{t('sellerorder:Location')}</TableCell>
                                <TableCell className={clsx(classes.th, 'center')}>{t('sellerorder:allocation_total_stock')}</TableCell>
                                <TableCell className={clsx(classes.th, 'center')}>{t('sellerorder:Buffer_Stock')}</TableCell>
                                <TableCell className={clsx(classes.th, 'center')}>{t('sellerorder:Used_for_order')}</TableCell>
                                <TableCell className={clsx(classes.th, 'center', 'noborder-bottom')}>{t('allocation_available_stock')}</TableCell>
                                <TableCell className={clsx(classes.th, 'center', 'noborder-bottom')}>{t('add_stock')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                // prettier-ignore
                                formik.values.seller_stock?.length > 0
                                && formik.values.seller_stock.map((item, index) => (
                                    <>
                                        <TableRow className={clsx(classes.rowItem)}>
                                            <TableCell align="left" className={clsx(classes.td, 'vertical-center')}>
                                                <Box display="flex" alignItems="center">
                                                    <Box
                                                        display="flex"
                                                        flexDirection="column"
                                                        alignItems="flex-start"
                                                        className={clsx(classes.itemCard)}
                                                    >
                                                        <span style={{ fontWeight: 'bold' }}>{item.product_name || '-'}</span>
                                                        <span>{`SKU: ${item.vendor_sku || item.sku}`}</span>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left" className={clsx(classes.td, 'vertical-center')}>
                                                {item.location.loc_name}
                                            </TableCell>
                                            <TableCell align="center" className={clsx(classes.td, 'vertical-center')}>
                                                {item.qty_total}
                                            </TableCell>
                                            <TableCell align="center" className={clsx(classes.td, 'vertical-center')}>
                                                {item.qty_buffer}
                                            </TableCell>
                                            <TableCell align="center" className={clsx(classes.td, 'vertical-center')}>
                                                {item.qty_reserved}
                                            </TableCell>
                                            <TableCell align="center" className={clsx(classes.td, 'vertical-center')}>
                                                {getPreviewStock(
                                                    formik.values.seller_stock[index].sku,
                                                    formik.values.seller_stock[index].location.loc_id,
                                                    formik.values.seller_stock[index].qty_saleable,
                                                )}
                                            </TableCell>
                                            <TableCell align="center" className={clsx(classes.td, 'vertical-center')}>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    <TextField
                                                        className={clsx(classes.totalStockTextfield)}
                                                        value={formik.values.seller_stock[index].qty_saleable}
                                                        variant="outlined"
                                                        onChange={(e) => {
                                                            formik.setFieldValue(`seller_stock[${index}].qty_saleable`, parseInt(e.target.value, 10));
                                                            if (!e.target.value) {
                                                                formik.setFieldValue(`seller_stock[${index}].qty_saleable`, 0);
                                                            }
                                                        }}
                                                        onWheel={(e) => e.target.blur()}
                                                        error={!!(formik.touched.seller_stock?.length && formik.touched.seller_stock[index]?.qty_saleable
                                                            && formik.errors.seller_stock?.length && formik.errors.seller_stock[index]?.qty_saleable)}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions className={clsx(classes.dialogActions, 'center')}>
                <Button className={clsx(classes.buttonAction, 'cancel')} disabled={loadingReallocate} onClick={onClose}>
                    {t('Close_2')}
                </Button>
                <Button className={clsx(classes.buttonAction, 'edit')} disabled={loadingReallocate} onClick={formik.handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const StatusSummary = (props) => {
    // prettier-ignore
    const {
        t, dataSellerStock, formik, loadingReallocate,
        openCancelDialog, setOpenCancelDialog,
        onCallbackReason, getCancelReasonsByChannel, loadingCancelReason,
        data, currentStock,
    } = props;
    const classes = useStyles();
    const [open, setOpen] = useState();
    const [inputDataReason, setInputDataReason] = React.useState(null);
    const handleOpenUpdateDialog = () => {
        setOpen(!open);
    };

    const handleOpenCancelDialog = async () => {
        try {
            setOpenCancelDialog(!openCancelDialog);
            const channel_code = data?.channel_code;
            const res = await getCancelReasonsByChannel({
                variables: { channel_code },
            });
            if (res) {
                const inputData = res?.data?.getCancelReasonsByChannel;
                if (inputData) {
                    setInputDataReason(inputData);
                }
            }
        } catch (err) {
            console.log('[err] get cancel by channel', err);
        }
    };

    return (
        <>
            <UpdateAllocationDialog
                open={open}
                onClose={handleOpenUpdateDialog}
                t={t}
                formik={formik}
                loadingReallocate={loadingReallocate}
                currentStock={currentStock}
            />
            <AppModal
                closeButton
                onHandleClose={handleOpenCancelDialog}
                show={openCancelDialog}
                title={t('Cancel_Reason')}
            >
                {loadingCancelReason && <div><strong>{`${t('common:loading')}...`}</strong></div>}
                {!loadingCancelReason && <BoxReason t={t} inputData={inputDataReason} onCallbackReason={onCallbackReason} /> }
            </AppModal>
            <div className={clsx(classes.statusSummary)}>
                <h2 className={clsx(classes.title, 'center')}>{t('sellerorder:failed_order')}</h2>
                <div className={clsx('body')}>
                    <span>{`${t('sku_not_available')}: `}</span>
                    <TableContainer className={clsx('table-container')}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={clsx(classes.th, 'center', 'noborder-bottom')}>SKU</TableCell>
                                    <TableCell className={clsx(classes.th, 'center', 'noborder-bottom')}>{t('sellerorder:Location')}</TableCell>
                                    <TableCell className={clsx(classes.th, 'center', 'noborder-bottom')}>{t('allocation_available_stock')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    // prettier-ignore
                                    dataSellerStock?.length > 0
                                        && dataSellerStock.map((item) => (
                                            <>
                                                <TableRow className={clsx(classes.rowItem)}>
                                                    <TableCell align="center" className={clsx(classes.td, 'child')}>
                                                        {item.vendor_sku || item.sku}
                                                    </TableCell>
                                                    <TableCell align="center" className={clsx(classes.td, 'child')}>
                                                        {item.location.loc_name}
                                                    </TableCell>
                                                    <TableCell align="center" className={clsx(classes.td, 'child')}>
                                                        {item.qty_saleable}
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="action-container">
                    <Button className={clsx(classes.buttonAction, 'cancel')} onClick={handleOpenCancelDialog}>
                        {t('cancel_allocation')}
                    </Button>
                    <Button className={clsx(classes.buttonAction, 'edit')} onClick={handleOpenUpdateDialog}>
                        {t('Update_Stock')}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default StatusSummary;
