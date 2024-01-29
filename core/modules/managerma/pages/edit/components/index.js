/* eslint-disable max-len */
import React from 'react';
import Cookies from 'js-cookie';
import Button from '@common_button';
import Select from '@common_select';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/managerma/pages/edit/components/style';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@common_textfield';
import { formatPriceNumber } from '@helper_currency';
import { breakPointsUp } from '@helper_theme';

const ManageRmaEditContent = (props) => {
    const {
        formik, rmaDetail, dataStatusItem, dataReturnType, dataPackageCondition,
        dataReason, handleRefund, canCreateMemo, canRefund, t, dataStock,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const desktop = breakPointsUp('sm');

    const dataRefundType = [
        { value: 'offline', label: t('managerma:Offline') },
        { value: 'storecredit', label: t('managerma:Refund_to_Customer_Store_Credit') },
        { value: 'giftcard', label: t('managerma:Create_Customer_Giftcard') },
    ];
    const dataReplacementType = [
        { value: 'pickup', label: t('managerma:Pickup_in_Store') },
        { value: 'delivery', label: t('managerma:Home_Delivery') },
    ];

    const isButtonVisible = () => {
        let buttonToShow = [];
        const loginLocation = JSON.parse(Cookies.get('cdt'))?.customer_loc_code?.split(',');
        const isReciever = loginLocation?.length && loginLocation?.includes(rmaDetail.package);
        switch (rmaDetail.status) {
        case 'pending_approval':
            buttonToShow = ['save', 'cancel'];
            break;
        case 'approved':
            buttonToShow = ['save'];
            break;
        case 'package_sent':
            buttonToShow = ['save'];
            break;
        case 'package_received':
            if (isReciever) {
                buttonToShow = ['save', 'cancel'];
            }
            break;
        case 'processing':
            if (isReciever) {
                buttonToShow = ['save'];
            }
            break;
        case 'complete':
            if (isReciever) {
                buttonToShow = ['save'];
            }
            break;
        case 'canceled':
            buttonToShow = ['save'];
            break;
        default:
            buttonToShow = [];
        }
        return buttonToShow;
    };

    const dataStatus = () => {
        let arrStatus = [];
        switch (rmaDetail.status) {
        case 'pending_approval':
            arrStatus = [
                { value: 'approved', label: t('managerma:Approved') },
                { value: 'package_received', label: t('managerma:Package_Received') },
            ];
            break;
        case 'approved':
            arrStatus = [
                { value: 'package_received', label: t('managerma:Package_Received') },
            ];
            break;
        case 'package_sent':
            arrStatus = [
                { value: 'package_received', label: t('managerma:Package_Received') },
            ];
            break;
        default:
            arrStatus = [];
        }
        return arrStatus;
    };

    const isFieldEnabled = (field) => {
        let arrField = [];
        switch (rmaDetail.status) {
        case 'pending_approval':
            arrField = ['return_type', 'refund_type', 'replacement_order_type', 'package_condition', 'reason', 'status_code', 'return_stock'];
            break;
        case 'approved':
            arrField = ['refund_type', 'replacement_order_type', 'status_code', 'return_stock'];
            break;
        case 'package_sent':
            arrField = ['refund_type', 'replacement_order_type', 'status_code', 'return_stock'];
            break;
        case 'package_received':
            arrField = ['refund_type', 'replacement_order_type', 'status_code'];
            break;
        case 'processing':
            arrField = ['refund_type', 'replacement_order_type', 'status_code'];
            break;
        default:
            arrField = [];
        }
        return arrField.includes(field);
    };

    return (
        <>
            <div className={classes.topContainer}>
                <div>
                    <Button
                        className={classes.btnBack}
                        onClick={() => router.push('/return/managerma')}
                        variant="contained"
                        style={{ marginRight: 16 }}
                    >
                        <ChevronLeftIcon className={classes.chevron} />
                    </Button>
                    <h2 className={classes.titleTop}>
                        {t('managerma:Manage_Request_')}
                        {rmaDetail.incrementId}
                    </h2>
                </div>
                <div className={classes.btnContainer}>
                    {isButtonVisible() && isButtonVisible().length
                        ? (
                            <>
                                {isButtonVisible().includes('cancel')
                                    && (
                                        <Button
                                            className={clsx(classes.btn, 'reverse')}
                                            onClick={() => {
                                                formik.setFieldValue('action', 'canceled');
                                                setTimeout(() => { formik.handleSubmit(); }, 500);
                                            }}
                                        >
                                            {t('managerma:Cancel')}
                                        </Button>
                                    )}
                                {isButtonVisible().includes('save')
                                    && (
                                        <Button
                                            className={classes.btn}
                                            onClick={() => {
                                                formik.setFieldValue('action', 'save');
                                                setTimeout(() => { formik.handleSubmit(); }, 500);
                                            }}
                                        >
                                            {t('managerma:Save')}
                                        </Button>
                                    )}
                            </>
                        )
                        : null}
                    {(rmaDetail.status === 'processing' && canRefund && formik.values.request.return_type !== 'replacement') && (
                        <Button
                            className={classes.btn}
                            onClick={() => handleRefund()}
                        >
                            {t('managerma:Refund')}
                        </Button>
                    )}
                    {(rmaDetail.status === 'package_received' && canCreateMemo) && (
                        <Button
                            className={classes.btn}
                            onClick={() => router.push(`/return/managerma/creatememos/${rmaDetail.id}`)}
                        >
                            {t('managerma:Credit_Memo')}
                        </Button>
                    )}
                </div>
            </div>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.gridHeader}>
                        <div style={{ paddingRight: 20 }}>
                            <h5 className={clsx(classes.titleSmall, 'border')}>{t('managerma:General_Information')}</h5>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <td className={classes.td}>{t('managerma:Channel_Order_Number')}</td>
                                        <td className={classes.td}>{rmaDetail.channelOrder || '-'}</td>
                                    </tr>
                                    <tr className={classes.tr}>
                                        <td className={clsx(classes.td, classes.labelRequired)}>{t('managerma:Status')}</td>
                                        {rmaDetail.status === 'pending_approval'
                                            || rmaDetail.status === 'approved'
                                            || rmaDetail.status === 'package_sent'
                                            ? (
                                                <Select
                                                    name="status_code"
                                                    value={formik.values.status_code}
                                                    onChange={formik.handleChange}
                                                    dataOptions={dataStatus()}
                                                    error={!!(formik.touched.status_code && formik.errors.status_code)}
                                                />
                                            )
                                            : <td className={classes.td}>{rmaDetail.statusLabel || '-'}</td>}
                                    </tr>
                                    <tr className={classes.tr}>
                                        <td className={classes.td}>{t('managerma:Request_Date')}</td>
                                        <td className={classes.td}>{rmaDetail.createdAt || '-'}</td>
                                    </tr>
                                    <tr className={classes.tr}>
                                        <td className={classes.td}>{t('managerma:Last_Update')}</td>
                                        <td className={classes.td}>{rmaDetail.updatedAt || '-'}</td>
                                    </tr>
                                    <tr className={classes.tr}>
                                        <td className={clsx(classes.td, classes.labelRequired)}>{t('managerma:Return_Type')}</td>
                                        <Select
                                            name="request.return_type"
                                            value={formik.values.request.return_type}
                                            onChange={formik.handleChange}
                                            dataOptions={Object.values(dataReturnType)}
                                            valueToMap="code"
                                            labelToMap="title"
                                            disabled={!isFieldEnabled('return_type')}
                                            error={!!(formik.touched.request?.return_type
                                                && formik.errors.request?.return_type)}
                                        />
                                    </tr>
                                    {formik.values.request.return_type
                                        && (
                                            <tr className={classes.tr}>
                                                {formik.values.request.return_type === 'refund'
                                                    ? (
                                                        <>
                                                            <td className={clsx(classes.td, classes.labelRequired)}>{t('managerma:Refund_Type')}</td>
                                                            <Select
                                                                name="request.refund_type"
                                                                value={formik.values.request.refund_type}
                                                                onChange={formik.handleChange}
                                                                dataOptions={dataRefundType}
                                                                disabled={!isFieldEnabled('refund_type')}
                                                                error={!!(formik.touched.request?.refund_type
                                                                && formik.errors.request?.refund_type)}
                                                            />
                                                        </>
                                                    )
                                                    : (
                                                        <>
                                                            <td className={clsx(classes.td, classes.labelRequired)}>
                                                                {t('managerma:Replacement_Order_Type')}
                                                            </td>
                                                            <Select
                                                                name="request.replacement_order_type"
                                                                value={formik.values.request.replacement_order_type}
                                                                onChange={formik.handleChange}
                                                                dataOptions={dataReplacementType}
                                                                disabled={!isFieldEnabled('replacement_order_type')}
                                                                error={!!(formik.touched.request?.replacement_order_type
                                                                && formik.errors.request?.replacement_order_type)}
                                                            />
                                                        </>
                                                    )}
                                            </tr>
                                        )}
                                    <tr className={classes.tr} style={{ borderBottom: '0px' }}>
                                        <td className={classes.td}>{t('managerma:Package_Received')}</td>
                                        <td className={classes.td}>{rmaDetail.packageName || '-'}</td>
                                    </tr>
                                    {(rmaDetail.status === 'processing' || rmaDetail.status === 'complete') && (
                                        <tr className={classes.tr}>
                                            <td className={classes.td}>{t('managerma:Credit_Memo')}</td>
                                            <td className={classes.td}>{`#${rmaDetail.creditmemo}`}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={classes.gridChild}>
                            <div>
                                <h5 className={clsx(classes.titleSmall, 'border')}>{t('managerma:Account_Information')}</h5>
                                <div style={{ paddingLeft: 8 }}>
                                    <span className={classes.orderLabel}>
                                        <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                                        {rmaDetail.name}
                                    </span>
                                    <span className={classes.orderLabel}>
                                        <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                        {rmaDetail.email}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h5 className={clsx(classes.titleSmall, 'border')}>{t('managerma:Shipping_Address')}</h5>
                                <div style={{ paddingLeft: 8 }}>
                                    <span className={classes.orderLabel}>
                                        {rmaDetail.street}
                                    </span>
                                    <span className={classes.orderLabel}>
                                        {rmaDetail.city}
                                    </span>
                                    <span className={classes.orderLabel}>
                                        {rmaDetail.region}
                                        {', '}
                                        {rmaDetail.postcode}
                                        {', '}
                                        {rmaDetail.country}
                                    </span>
                                    <span className={classes.orderLabel}>
                                        {rmaDetail.telephone}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('managerma:Product')}</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>{t('managerma:Product')}</th>
                                <th className={classes.th}>{t('managerma:Return_Qty')}</th>
                                <th className={classes.th}>{t('managerma:Return_Details')}</th>
                                <th className={classes.th}>{t('managerma:Status')}</th>
                                {dataStock
                                && <th className={classes.th}>{t('managerma:Return_Stock')}</th> }
                            </tr>
                            {rmaDetail.item?.map((e, i) => (
                                <tr>
                                    <td className={classes.td}>
                                        {e.name}
                                        <br />
                                        <span className={classes.spanLabel} style={{ display: 'inline-block' }}>
                                            {t('managerma:SKU__')}
                                        </span>
                                        {' '}
                                        {e.sku}
                                        <br />
                                        <span className={classes.spanLabel} style={{ display: 'inline-block' }}>
                                            {t('managerma:Price_')}
                                        </span>
                                        {' '}
                                        {formatPriceNumber(e.price)}
                                    </td>
                                    <td className={classes.td}>{e.qty}</td>
                                    <td className={classes.td}>
                                        <div className={classes.tdSelect}>
                                            <span className={clsx(classes.spanLabel, classes.labelRequired)}>{t('managerma:Package_Condition')}</span>
                                            <Select
                                                name={`items[${i}].package_condition`}
                                                value={formik.values.items[i].package_condition}
                                                onChange={formik.handleChange}
                                                dataOptions={Object.values(dataPackageCondition)}
                                                valueToMap="code"
                                                labelToMap="title"
                                                disabled={!isFieldEnabled('package_condition')}
                                                formControlClasses={!desktop && classes.select}
                                                error={!!(formik.touched.items?.[i]?.package_condition
                                                    && formik.errors.items?.[i]?.package_condition)}
                                            />
                                        </div>
                                        <br />
                                        <br />
                                        <div className={classes.tdSelect}>
                                            <span className={clsx(classes.spanLabel, classes.labelRequired)}>{t('managerma:Reason')}</span>
                                            <Select
                                                name={`items[${i}].reason`}
                                                value={formik.values.items[i].reason}
                                                onChange={formik.handleChange}
                                                dataOptions={Object.values(dataReason)}
                                                valueToMap="code"
                                                labelToMap="title"
                                                disabled={!isFieldEnabled('reason')}
                                                formControlClasses={!desktop && classes.select}
                                                error={!!(formik.touched.items?.[i]?.reason
                                                    && formik.errors.items?.[i]?.reason)}
                                            />
                                        </div>
                                        {e.attachment && e.attachment.length ? (
                                            <>
                                                <br />
                                                <br />
                                                <span className={classes.spanLabel}>{t('managerma:Attachment__')}</span>
                                                {e.attachment?.map((attach, idx) => (
                                                    <div key={idx}>
                                                        <a
                                                            href={attach.filepath}
                                                            download
                                                            target="_blank"
                                                            className={classes.link}
                                                            rel="noreferrer"
                                                        >
                                                            {attach.filename}
                                                        </a>
                                                    </div>
                                                ))}
                                            </>
                                        ) : null}
                                    </td>
                                    <td className={classes.td}>
                                        <Select
                                            name={`items[${i}].status_code`}
                                            value={formik.values.items[i].status_code}
                                            onChange={formik.handleChange}
                                            dataOptions={dataStatusItem}
                                            enableEmpty={false}
                                            disabled={!isFieldEnabled('status_code')}
                                            formControlClasses={!desktop && classes.select}
                                        />
                                    </td>
                                    {dataStock
                                    && (
                                        <td className={classes.td}>
                                            <Checkbox
                                                name={`items[${i}].return_stock`}
                                                checked={formik.values.items[i].return_stock}
                                                onChange={formik.handleChange}
                                                disabled={!isFieldEnabled('return_stock')}
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall} style={{ paddingBottom: 10 }}>{t('managerma:Messages')}</h5>
                    <FormGroup className={classes.formgroup}>
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    name="message.is_customer_notified"
                                    checked={formik.values.message.is_customer_notified}
                                    onChange={formik.handleChange}
                                />
                            )}
                            className={classes.controlLabel}
                            classes={{ root: classes.rootLabel }}
                            label={t('managerma:Notify_Customer_by_Email')}
                        />
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    name="message.is_visible_on_front"
                                    checked={formik.values.message.is_visible_on_front}
                                    onChange={formik.handleChange}
                                />
                            )}
                            className={classes.controlLabel}
                            classes={{ root: classes.rootLabel }}
                            label={t('managerma:Visible_to_Customer')}
                        />
                    </FormGroup>
                    <TextField
                        className={clsx(classes.fieldRoot, 'full')}
                        variant="outlined"
                        name="message.text"
                        value={formik.values.notes}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.notes && formik.errors.notes)}
                        helperText={(formik.touched.notes && formik.errors.notes) || ''}
                        fullWidth
                        multiline
                        rows={3}
                    />
                    {rmaDetail.message?.map((e) => (
                        <div className={clsx(classes.list, e.owner_type === 'admin' && 'right')}>
                            <span className={classes.spanLabel}>
                                {e.customer_name || t('managerma:Unknown')}
                                {', '}
                                {e.created_at}
                            </span>
                            <span>{e.text}</span>
                        </div>
                    ))}
                </div>
            </Paper>
        </>
    );
};

export default ManageRmaEditContent;
