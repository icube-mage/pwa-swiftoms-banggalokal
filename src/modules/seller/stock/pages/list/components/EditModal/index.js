/* eslint-disable react/no-danger */
/* eslint-disable no-useless-escape */
import { useEffect } from 'react';
import clsx from 'clsx';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import TextField from '@common_textfield';
import Switch from '@common_switch';
import Button from '@common_button';
import TextInfo from '@common_textinfo';

import { breakPointsUp } from '@helper_theme';
import useStyles from '@sellermodules/stock/pages/list/components/EditModal/style';

export const isEmpty = (value) => {
    if ([undefined, null, '', false, NaN].includes(value)) return true;
    if (value && value.length <= 0) return true;
    return false;
};

const EditStockContent = (props) => {
    const {
        t, formikEdit, setOpenEdit, openEdit,
    } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    const onClose = () => {
        formikEdit.resetForm();
        setOpenEdit(false);
    };

    const {
        name, loc_name, sync, qty_total, qty_buffer, channels, sync_history,
    } = formikEdit.values;

    const findHistory = (channel) => sync_history.find(({ channel_code }) => channel_code === channel.channel_code);

    useEffect(() => {
        const totalChannelsStock = channels.reduce((acc, cV) => acc + Number(cV.qty), 0);
        if (channels.some((channel) => Number(channel.qty) >= 100000)) {
            formikEdit.setStatus({
                error: t('sellerstock:Maximum_value_is_max', { max: 99999 }),
            });
        } else if (!sync && Number(qty_total) - Number(qty_buffer) - totalChannelsStock < 0) {
            formikEdit.setStatus({
                error: t('sellerstock:The_Warehouse_Stock_of_a_product_must_be_equal_to_or_greater_than_the_total_stock_in_all_MPchannels'),
            });
        } else {
            formikEdit.setStatus({
                error: '',
            });
        }
    }, [formikEdit.values]);

    return (
        <Dialog
            open={openEdit}
            onClose={onClose}
            classes={{ paper: classes.dialogContainer }}
            className={classes.dialogContainerRoot}
            fullWidth
            maxWidth="md"
            fullScreen={!isDesktop}
            scroll="paper"
        >
            <div className={classes.borderMobile}>
                <DialogContent className={clsx(classes.content, !!channels?.length && 'mb20')}>
                    <div className="mb10">
                        <div className="bold f16">
                            <span className="hidden-mobile">
                                {t('sellerstock:Product')}
                                {' '}
                                :
                                {' '}
                            </span>
                            {name}
                        </div>
                        <IconButton classes={{ root: classes.closeButton }} onClick={onClose}>
                            <CloseIcon className={classes.closeIcon} />
                            <div className="f14 bold hidden-desktop capitalize">{t('sellerstock:detail_stock')}</div>
                        </IconButton>
                        <Button className={clsx(classes.btn, 'hidden-mobile')} onClick={formikEdit.handleSubmit}>
                            {t('sellerstock:Save')}
                        </Button>
                    </div>
                    <div className="mb10">
                        <div className="f13">
                            {t('sellerstock:Location')}
                            {' '}
                            :
                            {loc_name}
                        </div>
                    </div>
                    <div className={`${!isDesktop ? 'f13' : ''} grid mb10`}>
                        <div style={{ fontsize: 13 }}>
                            {t('sellerstock:Sync_Stock')}
                            {' '}
                            :
                        </div>
                        <div className={classes.divSwitch}>
                            <Switch
                                name="sync"
                                trueLabel=""
                                falseLabel=""
                                useLabel={false}
                                value={sync}
                                onChange={formikEdit.handleChange}
                                rootClass={classes.switch}
                            />
                            <TextInfo textHelp={<span dangerouslySetInnerHTML={{ __html: t('__sellerstock:tooltip_sync_stock') }} />} />
                        </div>
                    </div>
                    <div className={`${!isDesktop ? 'f13' : ''} grid mb10`}>
                        <div className="bold">
                            {t('sellerstock:Warehouse_Stock')}
                            {' '}
                            :
                        </div>
                        <TextField
                            name="qty_total"
                            type="number"
                            value={qty_total}
                            onChange={(e) => {
                                if (e.target.value?.length <= 5) {
                                    if (Number(e.target.value) < qty_buffer) {
                                        formikEdit.setFieldValue('qty_buffer', 0);
                                    }
                                    formikEdit.handleChange(e);
                                }
                                return true;
                            }}
                            className={classes.textInput}
                            error={!!formikEdit.errors.qty_total}
                            helperText={formikEdit.errors.qty_total || ''}
                        />
                    </div>
                    <div className={`${!isDesktop ? 'f13' : ''} grid mb10`}>
                        <div className="bold">
                            {t('sellerstock:Buffer_Stock')}
                            {' '}
                            :
                        </div>
                        <TextField
                            name="qty_buffer"
                            type="number"
                            value={qty_buffer}
                            onChange={(e) => {
                                if (e.target.value?.length <= 5) {
                                    if (Number(e.target.value) > qty_total) {
                                        return false;
                                    }
                                    formikEdit.handleChange(e);
                                }
                                return true;
                            }}
                            className={classes.textInput}
                            error={!!formikEdit.errors.qty_buffer}
                            helperText={formikEdit.errors.qty_buffer || ''}
                        />
                    </div>
                    <Button className={clsx(classes.btn, 'hidden-desktop')} onClick={formikEdit.handleSubmit}>
                        {t('sellerstock:Save')}
                    </Button>
                    {!!formikEdit.status?.error && <div className="error-div hidden-desktop">{formikEdit.status.error}</div>}
                </DialogContent>

                <div className="hidden-mobile">
                    {!!channels?.length && (
                        <DialogContent className={clsx(classes.contentBorder, formikEdit.status?.error && 'red-border')}>
                            <div className="grid">
                                <div className="grid-item-border head-item bold">{t('sellerstock:Channel')}</div>
                                <div className="grid-item-border head-item bold">{t('sellerstock:Stock')}</div>
                                <div className="grid-item head-item bold">{t('sellerstock:Last_Sync')}</div>
                                <div />
                            </div>
                            {channels?.map((row, index) => (
                                <div className="grid" key={row.channel?.channel_id}>
                                    <div className="grid-item-border flex">
                                        <div className={classes.imgBackContainerChannel}>
                                            <div
                                                className={classes.imgBackChannel}
                                                style={{
                                                    backgroundImage: `url(${row.channel?.image_url || '/assets/img/placeholder_image.jpg'})`,
                                                }}
                                            />
                                        </div>
                                        <div className="bold">{row.channel?.channel_name || '-'}</div>
                                    </div>
                                    <div className="grid-item-border">
                                        <TextField
                                            name={`channels[${index}].qty`}
                                            type="number"
                                            value={sync ? (qty_total - qty_buffer) : row.qty ?? ''}
                                            onChange={(e) => (e.target.value?.length <= 5 ? formikEdit.handleChange(e) : null)}
                                            className={classes.textInput}
                                            disabled={sync}
                                        />
                                    </div>
                                    <div className="grid-item no-border">
                                        <span className={findHistory(row)?.status?.code === 'failed' ? 'red' : undefined}>
                                            {!findHistory(row)?.inserted_at ? (
                                                <>
                                                    {t('sellerstock:Never_been_synced_to_the_marketplace_Save_to_sync_into_Marketplace')}
                                                </>
                                            ) : (
                                                <>
                                                    {findHistory(row)?.inserted_at || '-'}
                                                    {' '}
                                                    |
                                                    {t('sellerstock:Stock')}
                                                    {' '}
                                                    :
                                                    {' '}
                                                    {findHistory(row)?.qty_update || 0}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                    {!findHistory(row)?.status?.code ? null : (
                                        <div className="grid-item no-border">
                                            {findHistory(row)?.status?.code === 'success' ? (
                                                <CheckCircleIcon className="icon check" />
                                            ) : (
                                                <CancelIcon className="icon cancel" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {!!formikEdit.status?.error && <div className="error-div">{formikEdit.status.error}</div>}
                        </DialogContent>
                    )}
                </div>

                <div className="hidden-desktop">
                    {!!channels?.length
                        && channels?.map((row, index) => (
                            <DialogContent
                                key={row.channel?.channel_id}
                                className={clsx(classes.contentBorder, formikEdit.status?.error && 'red-border')}
                            >
                                <div className="grid-item flex mb20">
                                    <div className={classes.imgBackContainerChannel}>
                                        <div
                                            className={classes.imgBackChannel}
                                            style={{ backgroundImage: `url(${row.channel?.image_url || '/assets/img/placeholder_image.jpg'})` }}
                                        />
                                    </div>
                                    <div className="bold">{row.channel?.channel_name || '-'}</div>
                                </div>
                                <div className="f13 grid-item flex mb15">
                                    <div className="bold">
                                        {t('sellerstock:Stock')}
                                        {' '}
                                        :
                                    </div>
                                    <TextField
                                        name={`channels[${index}].qty`}
                                        type="number"
                                        value={sync ? qty_total : row.qty ?? ''}
                                        onChange={(e) => (e.target.value?.length <= 5 ? formikEdit.handleChange(e) : null)}
                                        className={classes.textInput}
                                        disabled={sync}
                                    />
                                </div>
                                <div className="f13">
                                    <div className="bold mb10">
                                        {t('sellerstock:Last_Sync')}
                                        {' '}
                                        :
                                    </div>
                                    <div className="grid-item flex f11">
                                        <span className={findHistory(row)?.status?.code === 'failed' ? 'red' : undefined}>
                                            {!findHistory(row) ? (
                                                <>
                                                    {t('sellerstock:Never_been_synced_to_the_marketplace_Save_to_sync_into_Marketplace')}
                                                </>
                                            ) : (
                                                <>
                                                    {findHistory(row)?.inserted_at || '-'}
                                                    {' '}
                                                    |
                                                    {t('sellerstock:Stock')}
                                                    {' '}
                                                    :
                                                    {' '}
                                                    {findHistory(row)?.qty_update || 0}
                                                </>
                                            )}
                                        </span>
                                        {!findHistory(row)?.status?.code ? null : (
                                            <>
                                                {findHistory(row)?.status?.code === 'success' ? (
                                                    <CheckCircleIcon className="icon check" />
                                                ) : (
                                                    <CancelIcon className="icon cancel" />
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </DialogContent>
                        ))}
                </div>
            </div>
        </Dialog>
    );
};

export default EditStockContent;
