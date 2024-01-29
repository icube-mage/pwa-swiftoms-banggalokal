/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/requestreturn/pages/edit/components/style';
import gqlService from '@modules/requestreturn/services/graphql';

const RequestReturnEditContent = (props) => {
    const {
        formik,
        detailReturn,
        handleDropFile,
        formikSendPackage,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const convertToRupiah = (number) => {
        const currencyFractionDigits = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).resolvedOptions().maximumFractionDigits;

        const value = (number).toLocaleString('id-ID', { maximumFractionDigits: currencyFractionDigits });

        return value;
    };

    return (
        <div className={classes.body}>
            <Button
                className={classes.btnBack}
                onClick={() => router.back()}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>{`Return #${detailReturn.incrementId}`}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <table className={classes.tableTop}>
                            <tr>
                                <td className={classes.tdTop}>Status</td>
                                <td className={classes.tdTop}>{detailReturn.status}</td>
                            </tr>
                            <tr>
                                <td className={classes.tdTop}>Return Type</td>
                                <td className={classes.tdTop}>{detailReturn.type}</td>
                            </tr>
                            <tr>
                                <td className={classes.tdTop}>Channel Order</td>
                                <td className={classes.tdTop}>{detailReturn.order}</td>
                            </tr>
                            {(detailReturn.statusCode === 'approved') && (
                                <tr>
                                    <td className={classes.tdTop}>Send Package</td>
                                    <td className={classes.tdTop}>
                                        <Button
                                            className={clsx(classes.btn, 'btn-package')}
                                            type="submit"
                                            onClick={formikSendPackage.handleSubmit}
                                            variant="contained"
                                        >
                                            Send Package
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </table>
                    </div>
                    <div className={classes.contentRight}>
                        <h5 className={classes.title} style={{ paddingTop: 0, textTransform: 'capitalize' }}>My Address</h5>
                        <span className={classes.orderLabel}>{`${detailReturn.shipping.firstname} ${detailReturn.shipping.lastname}`}</span>
                        <span className={classes.orderLabel}>{detailReturn.shipping.street}</span>
                        <span className={classes.orderLabel}>{`${detailReturn.shipping.city}, ${detailReturn.shipping.region}, ${detailReturn.shipping.postcode}`}</span>
                        <span className={classes.orderLabel}>{detailReturn.shipping.country_name}</span>
                        <span className={classes.orderLabel}>{detailReturn.shipping.telephone}</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Items</h5>
                    <div style={{ overflowX: 'auto' }}>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <th className={classes.th}>Image</th>
                                    <th className={classes.th}>Name</th>
                                    <th className={classes.th}>Price</th>
                                    <th className={classes.th}>Return Qty</th>
                                    <th className={classes.th}>Return Details</th>
                                    <th className={classes.th}>Status</th>
                                </tr>
                                {detailReturn.itemsx?.map((e, i) => (
                                    <tr>
                                        <td className={classes.td}>
                                            <div
                                                className={classes.imgThumbContainer}
                                                style={{
                                                    backgroundImage: `url("${e.image_url || '/assets/img/placeholder_image.jpg'}")`,
                                                }}
                                            />
                                        </td>
                                        <td className={classes.td}>{e.name}</td>
                                        <td className={classes.td}>{convertToRupiah(e.price)}</td>
                                        <td className={clsx(classes.td, classes.center)}>{e.qty}</td>
                                        <td className={classes.td}>
                                            <span className={classes.spanDetails}>
                                                <strong>Package Condition : </strong>
                                                {e.package_condition_label}
                                            </span>
                                            <span className={classes.spanDetails}>
                                                <strong>Reason : </strong>
                                                {' '}
                                                {e.reason_label}
                                            </span>
                                            <span><strong>Attachments : </strong></span>
                                            {e.attachment && (
                                                <>
                                                    {e.attachment?.map((efile) => (
                                                        <a className={classes.aLink} href={`${efile.filepath}`} target="_blank" download>
                                                            <span className={classes.spanDetails}>{efile.filename}</span>
                                                        </a>
                                                    ))}
                                                </>
                                            )}
                                            <div className={classes.dropFile}>
                                                <DropFile
                                                    formatFile=".zip, .rar, .jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx"
                                                    error={formik.errors.binary && formik.touched.binary}
                                                    getBase64={(files) => handleDropFile(files, i)}
                                                />
                                            </div>
                                            <span>The following file types are allowed: zip, rar, jpg, jpeg, png, gif, pdf, doc, docx, xls, xlsx</span>
                                        </td>
                                        <td className={classes.td}>{e.status_label}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={clsx(classes.title, classes.labelRequired)}>Messages</h5>
                    <TextField
                        className={clsx(classes.fieldRoot, 'fieldNotes')}
                        variant="outlined"
                        multiline
                        rows={4}
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.message && formik.errors.message)}
                        helperText={(formik.touched.message && formik.errors.message) || ''}
                    />
                    <div className={classes.formFieldButton}>
                        <Button
                            className={classes.btn}
                            type="submit"
                            onClick={formik.handleSubmit}
                            variant="contained"
                        >
                            Update Request
                        </Button>
                    </div>
                </div>
                <div className={classes.content}>
                    {detailReturn.message?.map((e) => (
                        <>
                            {(e.owner_type === 'customer') ? (
                                <div className={classes.messageText}>
                                    <span><strong>{`${e.customer_name}, ${e.created_at}`}</strong></span>
                                    <span className={classes.spanDetails}>{e.text}</span>
                                </div>
                            ) : (
                                <div className={clsx(classes.messageText, 'admin')}>
                                    <span><strong>{`${e.customer_name}, ${e.created_at}`}</strong></span>
                                    <span className={classes.spanDetails}>{e.text}</span>
                                </div>
                            )}
                        </>
                    ))}
                </div>
            </Paper>
        </div>
    );
};

export default RequestReturnEditContent;
