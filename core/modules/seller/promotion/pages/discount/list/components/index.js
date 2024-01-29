import React from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import { setLocalStorage } from '@helper_localstorage';
import formatDate from '@helper_date';

import ProductModal from '@sellermodules/promotion/pages/discount/list/components/ProductModal';
import ListCard from '@sellermodules/promotion/pages/discount/list/components/ListCard';
import useStyles from '@sellermodules/promotion/pages/discount/list/components/style';

const DiscountListContent = (props) => {
    const {
        data, loading, getSellerDiscountList, t, dataCat, dataEtalase, handleDelete, handleSingleDelete,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [checked, setChecked] = React.useState([]);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);

    const productList = (data && data.getSellerDiscountList && data.getSellerDiscountList.items) || [];
    const orderTotal = (data && data.getSellerDiscountList && data.getSellerDiscountList.total_count) || 0;

    const onClickEdit = async (row) => {
        window.backdropLoader(true);
        await setLocalStorage('edit_discount', JSON.stringify({
            entity_id: row.entity_id,
            name: row.name,
            sku: row.sku,
            vendor_sku: row.vendor_sku,
            image: row.image,
            isParent: !!row.variants?.length,
            price: row.price_raw,
            price_formatted: row.price,
            discount: row.discount_raw ? Number(row.discount_raw) : '',
            discount_price: row.discount_price_raw ? Number(row.discount_price_raw) : '',
            from: row.discount_from_date ? formatDate(row.discount_from_date, 'YYYY-MM-DD') : null,
            to: row.discount_to_date ? formatDate(row.discount_to_date, 'YYYY-MM-DD') : null,
            selected_variants: row.variants.map((variant) => ({
                entity_id: variant.entity_id,
                name: variant.name,
                sku: variant.sku,
                vendor_sku: variant.vendor_sku,
                price: variant.price_raw,
                price_formatted: variant.price,
                discount: variant.discount_raw ? Number(variant.discount_raw) : '',
                discount_price: variant.discount_price_raw ? Number(variant.discount_price_raw) : '',
                from: variant.discount_from_date ? formatDate(variant.discount_from_date, 'YYYY-MM-DD') : null,
                to: variant.discount_to_date ? formatDate(variant.discount_to_date, 'YYYY-MM-DD') : null,
                isChild: true,
            })),
        }));
        router.push('/seller/promotion/discount/edit');
    };

    const columns = [
        { field: 'id', hidden: true },
        { field: 'product_information' },
        { field: 'price_formatted', headerName: t('sellerpromotion:Discount_Price') },
        { field: 'discount_formatted', headerName: t('sellerpromotion:Discount'), small: true },
        { field: 'discount_period', headerName: t('sellerpromotion:Discount_Period') },
        { field: 'status', headerName: t('sellerpromotion:Product_Status'), small: true },
    ];

    const rows = productList.map((product) => ({
        ...product,
        id: product.entity_id,
        product_information: (
            <Grid container spacing={2} className={classes.imgContainer}>
                <Grid item xs={12} md={4}>
                    <div
                        className={classes.img}
                        style={{ backgroundImage: `url(${product.image || '/assets/img/placeholder_image.jpg'})` }}
                        alt="ord-img"
                    />
                </Grid>
                <Grid item xs={12} md={8} container direction="column" spacing={2}>
                    <Grid item xs>
                        {product.name}
                    </Grid>
                    <Grid item>
                        {`SKU : ${product.vendor_sku}`}
                    </Grid>
                </Grid>
            </Grid>
        ),
        price_formatted: (
            <div className={classes.discPrice}>
                <span className={classes.price}>
                    {product.price}
                </span>
                <br />
                {product.discount_price}
            </div>
        ),
        discount_formatted: <div className={classes.discount}>{product.discount}</div>,
        discount_period: !product.variants?.length
            && (
                <div>
                    {`${formatDate(product.discount_from_date, 'DD MMM YYYY')} - ${formatDate(product.discount_to_date, 'DD MMM YYYY')}`}
                </div>
            ),
        status: product.status === '1' ? t('sellerpromotion:Enabled') : t('sellerpromotion:Disabled'),
        variants_product: product.variants?.map((variant) => ({
            ...variant,
            id: variant.entity_id,
            product_information: (
                <div>
                    <div>
                        {variant.name}
                    </div>
                    <div>
                        {`SKU : ${variant.vendor_sku}`}
                    </div>
                </div>
            ),
            price_formatted: (
                <div className={classes.discPrice}>
                    <span className={classes.price}>
                        {variant.price}
                    </span>
                    <br />
                    {variant.discount_price}
                </div>
            ),
            discount_formatted: <div className={classes.discount}>{variant.discount}</div>,
            discount_period: (
                <div>
                    {`${formatDate(variant.discount_from_date, 'DD MMM YYYY')} - ${formatDate(variant.discount_to_date, 'DD MMM YYYY')}`}
                </div>
            ),
            status: variant.status === '1' ? t('sellerpromotion:Enabled') : t('sellerpromotion:Disabled'),
        })),
        isParent: !!product.variants?.length,
        edit: () => onClickEdit(product),
    }));

    const actions = [
        {
            label: t('sellerpromotion:Change_at_Once'),
            onClick: async () => {
                window.backdropLoader(true);
                await setLocalStorage('edit_discount', JSON.stringify(checked.map((row) => ({
                    entity_id: row.entity_id,
                    name: row.name,
                    sku: row.sku,
                    vendor_sku: row.vendor_sku,
                    image: row.image,
                    isParent: !!row.variants?.length,
                    price: row.price_raw,
                    price_formatted: row.price,
                    discount: row.discount_raw ? Number(row.discount_raw) : '',
                    discount_price: row.discount_price_raw ? Number(row.discount_price_raw) : '',
                    from: row.discount_from_date ? formatDate(row.discount_from_date, 'YYYY-MM-DD') : null,
                    to: row.discount_to_date ? formatDate(row.discount_to_date, 'YYYY-MM-DD') : null,
                    selected_variants: row.variants.map((variant) => ({
                        entity_id: variant.entity_id,
                        name: variant.name,
                        sku: variant.sku,
                        vendor_sku: variant.vendor_sku,
                        price: variant.price_raw,
                        price_formatted: variant.price,
                        discount: variant.discount_raw ? Number(variant.discount_raw) : '',
                        discount_price: variant.discount_price_raw ? Number(variant.discount_price_raw) : '',
                        from: variant.discount_from_date ? formatDate(variant.discount_from_date, 'YYYY-MM-DD') : null,
                        to: variant.discount_to_date ? formatDate(variant.discount_to_date, 'YYYY-MM-DD') : null,
                        isChild: true,
                    })),
                }))));
                router.push('/seller/promotion/discount/edit');
            },
            showMessage: false,
        },
    ];

    const handleSubmit = async (checkedRows) => {
        setOpenModalAdd(false);
        window.backdropLoader(true);
        await setLocalStorage('add_discount', JSON.stringify(checkedRows));
        router.push('/seller/promotion/discount/add');
    };

    return (
        <>
            <ListCard
                header={t('sellerpromotion:Discount_Product')}
                columns={columns}
                getRows={getSellerDiscountList}
                actions={actions}
                rows={rows}
                loading={loading}
                count={orderTotal}
                showCheckbox
                searchPlaceholder={t('common:Search_product_name_or_SKU')}
                useTabs
                t={t}
                dataCat={dataCat}
                dataEtalase={dataEtalase}
                handleChecked={(row) => setChecked(row)}
                setOpenModalAdd={setOpenModalAdd}
                handleDelete={handleDelete}
                handleSingleDelete={handleSingleDelete}
                onClickEdit={onClickEdit}
            />
            <ProductModal
                {...props}
                setChecked={setChecked}
                open={openModalAdd}
                onClose={() => setOpenModalAdd(false)}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default DiscountListContent;
