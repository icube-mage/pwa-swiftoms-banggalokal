/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import clsx from 'clsx';
import Button from '@common_button';
import useStyles from '@modules/stockadjustment/pages/edit/components/modalUpload/style';
import gqlSource from '@modules/source/services/graphql';
import gqlService from '@modules/stockadjustment/services/graphql';
import DropFile from '@common_dropfile';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const SKU_KEY = 'sku';
const STOCK_KEY = 'adj_qty';

const ModalFindProduct = (props) => {
    const {
        open, handleClose, addProduct, locationId, t,
    } = props;
    const classes = useStyles();
    const [csvToArrayOfObject] = gqlService.csvToArrayOfObject();
    const [getSourceList, { data: sourceData, error: sourceError, loading: sourceLoading }] = gqlSource.getSourceList();
    const [uploadedCsv, setUploadedCsv] = useState(null);
    const [mappedSku, setMappedSku] = useState([]);

    const formik = useFormik({
        initialValues: {
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required(t('stockadjustment:This_is_a_Required_field')),
        }),
        onSubmit: async (values) => {
            const variables = {
                binary: values.binary,
            };
            window.backdropLoader(true);
            handleClose();
            try {
                if (!locationId) {
                    throw new Error(t('stockadjustment:Location_is_required'));
                }
                const res = await csvToArrayOfObject({ variables });
                const data = res?.data?.csvToArrayOfObject ?? null;
                if (!data) {
                    throw new Error(t('stockadjustment:upload_failed'));
                }

                const SKU_IDX = data?.headers.findIndex((header) => header === SKU_KEY);
                const STOCK_IDX = data?.headers.findIndex((header) => header === STOCK_KEY);
                if (SKU_IDX === -1 || STOCK_IDX === -1) {
                    throw new Error(t('stockadjustment:csv_missing_header'));
                }

                // mapping data to get list of sku
                const productSkuMapped = data?.rows
                    .map((row) => {
                        const sku = row?.columns[SKU_IDX]?.value ?? null;
                        if (sku) {
                            return sku;
                        }
                    })
                    .filter((item) => item);

                const productMapped = data?.rows
                    .map((row) => {
                        const stock = row?.columns[STOCK_IDX]?.value ?? null;
                        const sku = row?.columns[SKU_IDX]?.value ?? null;
                        if (stock && sku) {
                            return {
                                sku,
                                stock,
                            };
                        }
                    })
                    .filter((item) => item);

                setMappedSku(productSkuMapped);
                setUploadedCsv(productMapped);

                getSourceList({
                    variables: {
                        pageSize: productSkuMapped.length,
                        currentPage: 1,
                        filter: {
                            loc_id: {
                                eq: locationId.toString(),
                            },
                            sku: {
                                in: productSkuMapped,
                            },
                        },
                    },
                });
                window.backdropLoader(false);
            } catch (error) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: error.message,
                    variant: 'error',
                });
            }
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];

        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode);
    };

    useEffect(() => {
        window.backdropLoader(false);
        if (sourceData && sourceData.getSourceList && sourceData.getSourceList.items && !sourceLoading) {
            const data = sourceData.getSourceList.items;
            if (data?.length === 0) {
                window.toastMessage({
                    open: true,
                    text: t('stockadjustment:No_product_found'),
                    variant: 'error',
                });
                return;
            }

            if (data?.length !== mappedSku?.length) {
                window.toastMessage({
                    open: true,
                    text: t('stockadjustment:Some_product_not_found'),
                    variant: 'error',
                });
                return;
            }

            const mapped = data
                .map((item) => {
                    const sku = item?.sku ?? null;
                    const uploaded = uploadedCsv?.find((itemUploaded) => itemUploaded?.sku === sku);
                    if (sku && uploaded) {
                        return {
                            sku,
                            stock_adjustment: Number(uploaded?.stock),
                            from_csv: true,
                        };
                    }
                })
                .filter((item) => item);

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < mapped.length; i++) {
                addProduct(mapped[i]);
            }
        }
    }, [sourceData, sourceError, sourceLoading]);

    const [downloadSampleCsv] = gqlService.downloadSampleCsv();
    const [urlDownload, setUrlDownload] = useState(null);

    useEffect(() => {
        const getSampleCsv = async () => {
            const res = await downloadSampleCsv({
                variables: {
                    type: 'stock_adjustment_products',
                },
            });
            setUrlDownload(res && res.data && res.data.downloadSampleCsv);
        };
        getSampleCsv();
    }, []);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth classes={{ paper: classes.paper }}>
            <div
                className={clsx(classes.textTitle, classes.content)}
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingTop: '20px',
                    fontSize: '26px',
                }}
            >
                <div>{t('stockadjustment:Upload_Products')}</div>
                <div>
                    <button type="button" className={classes.btnClear} onClick={() => handleClose()}>
                        ✕
                    </button>
                </div>
            </div>
            <DialogContent classes={{ root: clsx(classes.content) }}>
                <div className={classes.uploadContainer}>
                    <div className={clsx(classes.formField, classes.linkDownloadContainer)}>
                        <span className={classes.label}>
                            <a href={urlDownload} className={classes.linkDownload}>
                                {t('stockadjustment:Download_Sample_File')}
                            </a>
                        </span>
                    </div>
                    <div className={clsx(classes.formField, classes.textLeft, classes.dropZone)}>
                        <DropFile
                            title={t('stockadjustment:Please_select_the_file__')}
                            error={formik.errors.binary && formik.touched.binary}
                            getBase64={handleDropFile}
                        />
                    </div>
                </div>

                <div>
                    <Button className={classes.btn} onClick={formik.handleSubmit}>
                        {t('stockadjustment:Submit')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ModalFindProduct;
