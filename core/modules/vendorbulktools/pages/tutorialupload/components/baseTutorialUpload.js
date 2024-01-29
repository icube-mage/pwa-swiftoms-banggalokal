/* eslint-disable max-len */
import React from 'react';
import Paper from '@material-ui/core/Paper';

import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/vendorbulktools/pages/default/components/style';
import { useRouter } from 'node_modules/next/router';
import { useTranslation } from '@i18n';

const BaseTutorialUpload = (props) => {
    const { t } = useTranslation('vendorbulktools');
    const {
        urlDownload, tutorialName, excelImageUrl, bulkTypeName,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/vendorportal/bulktools')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>{t('vendorbulktools:Tutorial_Upload_Product')}</h2>
            <Paper>
                <div className={classes.contentWithoutBorder}>
                    <p>
                        {t('vendorbulktools:Ikuti_instruksi_berikut_untuk_mengunggah_data')}
                        {' '}
                        &quot;
                        {tutorialName}
                        &quot;
                    </p>
                    <ol>
                        <li>
                            {t('vendorbulktools:Siapkan_berkas_csv_untuk_mengunggah_data')}
                            {' '}
                            &quot;
                            {tutorialName}
                            &quot;,
                            {' '}
                            {t('vendorbulktools:unduh_contoh_berkas_csv_yang_berisi_persyaratan_data_yang_dibutuhkan')}
                            {' '}
                            <a href={urlDownload} className="link-button">
                                {t('vendorbulktools:Klik_Disini')}
                            </a>
                        </li>
                        <li>
                            <p>{t('vendorbulktools:Buka_contoh_berkas_csv_yang_telah_diunduh_Anda_dapat_membukanya_dengan_aplikasi_apapun_seperti_Microsoft_Excel')}</p>
                            <p>
                                {t('vendorbulktools:kolom_dalam_contoh_berkas_csv_adalah_syarat_minimal_untuk_unggah')}
                                {' '}
                                &quot;
                                {tutorialName}
                                &quot;
                            </p>
                            <img style={{ width: '80%' }} src={excelImageUrl} alt="excel-example" />
                            <p>{t('vendorbulktools:Harap_pastikan_bahwa_berkas_csv_yang_akan_diunggah_sudah_benar_Anda_dapat_memeriksa_ulang_dengan_berkas_csv_anda')}</p>
                            <p>{t('vendorbulktools:Jika_ada_kolom_berisi_tanggal_harap_pastikan_format_tanggal_sudah_benar_sesuai_dengan_contoh_berkas_CSV')}</p>
                        </li>
                        <li>
                            <p>
                                {t('vendorbulktools:Pilih_bulk_type')}
                                {' '}
                                &quot;
                                {bulkTypeName}
                                &quot;
                            </p>
                            <p>
                                {t('vendorbulktools:Lampirkan_berkas_csv_dengan_mengklik_tombol')}
                                {' '}
                                &quot;
                                {t('vendorbulktools:Choose_File')}
                                &quot;
                            </p>
                            <img style={{ width: '50%', height: '250px' }} src="/assets/img/product-upload-submit-default.png" alt="submit-example" />
                        </li>
                        <li>
                            <p>
                                {t('vendorbulktools:Langkah_terakhir_klik_tombol')}
                                {' '}
                                &quot;
                                {t('vendorbulktools:Submit')}
                                &quot;
                                {' '}
                                {t('vendorbulktools:untuk_mengunggah_berkas_csv_kemudian_tunggu_hingga_proses_selesai')}
                            </p>
                        </li>
                    </ol>
                </div>
            </Paper>
        </>
    );
};

export default BaseTutorialUpload;
