import clsx from 'clsx';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import TextField from '@common_textfield';
import Button from '@common_button';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import ProductModal from '@sellermodules/storesetting/plugins/ProductModal';
import ProductTable from '@sellermodules/storesetting/plugins/ProductTable';
import useStyles from '@sellermodules/storesetting/pages/displaywindow/edit/components/style';

const CatalogOrganizeContent = (props) => {
    const {
        t, formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [openProduct, setOpenProduct] = React.useState(false);

    React.useEffect(() => {
        if (!formik.isSubmitting) return;
        const keys = Object.keys(formik.errors);
        if (keys.length > 0) {
            const keyName = keys[0];
            const node = document.getElementsByName(keyName);
            if (node.length) {
                node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                node[0].focus();
            }
        }
    }, [formik]);

    return (
        <div>
            <div className={classes.headerContainer}>
                <div className="left">
                    <IconButton id="button-back" aria-label="back" onClick={() => router.push('/seller/storesetting/displaywindow')}>
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <h2 className={classes.title}>{t('storesetting:Display_Window')}</h2>
                </div>
                <Button
                    id="button-save"
                    className={clsx(classes.btn, !formik.values.products.length && 'disabled')}
                    startIcon={<img alt="" src="/assets/img/save-white.svg" className="icon" />}
                    onClick={formik.handleSubmit}
                    disabled={!formik.values.products.length}
                >
                    {t('storesetting:Save')}
                </Button>
            </div>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('storesetting:Display_Window')}</h2>
                <div className={classes.formFieldsGrid}>
                    <InputLabel htmlFor="name" className={classNames(classes.label, classes.required)}>
                        {t('storesetting:Display_Window_Name')}
                    </InputLabel>
                    <div>
                        <TextField
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className={classes.textInput}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                            placeholder={t('storesetting:Make_display_window_names_that_match_the_product_category_easier_for_buyers_to_find')}
                        />
                    </div>
                </div>

            </Paper>
            <Paper className={classes.paper}>
                <div className={clsx(classes.formFieldsGrid, 'between')}>
                    <InputLabel htmlFor="name" className={classes.label}>
                        <h2 className={clsx(classes.title)}>{t('storesetting:Selected_Product')}</h2>
                    </InputLabel>
                    <div className={classes.btnContainer}>
                        <Button
                            id="button-add"
                            className={classes.btn}
                            startIcon={<img src="/assets/img/add.svg" alt="add-icon" />}
                            onClick={() => setOpenProduct(true)}
                        >
                            {t('common:Add_Product')}
                        </Button>
                    </div>
                </div>
            </Paper>
            {formik.values.products.length
                ? (
                    <ProductTable {...props} />
                )
                : (
                    <Paper className={classes.paper}>
                        <div className={classes.emptyContainer}>
                            <img className={classes.imgIcon} src="/assets/img/display_window.svg" alt="wdw" />
                            <h2 className={classes.title}>{t('storesetting:Fill_the_Display_Window')}</h2>
                            <div className={classes.subtitle}>{t('storesetting:Choose_a_product_that_matches_your_display_window_name')}</div>
                        </div>
                    </Paper>
                )}
            <ProductModal
                {...props}
                open={openProduct}
                onClose={() => setOpenProduct(false)}
            />
            <div style={{ height: 30 }} />
        </div>
    );
};

export default CatalogOrganizeContent;
