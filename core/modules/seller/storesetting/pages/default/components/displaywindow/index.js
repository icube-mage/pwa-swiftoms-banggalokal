/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
import clsx from 'clsx';

import Table from '@sellermodules/storesetting/pages/default/components/displaywindow/Table';
import useStyles from '@sellermodules/storesetting/pages/default/components/displaywindow/style';

const CatalogListContent = (props) => {
    const { dataWindow, loadingWindow, getSellerEtalaseList, t } = props;
    const classes = useStyles();
    const windowList = (dataWindow && dataWindow.getSellerEtalaseList && dataWindow.getSellerEtalaseList.items) || [];
    const windowTotal = (dataWindow && dataWindow.getSellerEtalaseList && dataWindow.getSellerEtalaseList.total_count) || 0;

    const columns = [
        { field: 'name', headerName: t('storesetting:Display_Window_Name') },
        { field: 'total_product', headerName: t('storesetting:Number_of_Products') },
    ];

    const rows = windowList.map((wind) => ({
        ...wind,
        name_origin: wind.name,
        name: () => (wind.is_default
            ? (
                <div className={classes.container}>
                    <img className={classes.imgIcon} src={wind.image} alt="wdw" />
                    {wind.name}
                </div>
            )
            : (
                <div className={classes.container}>
                    {wind.is_pinned
                    && <img className={classes.imgIcon} src="/assets/img/featured_window.svg" alt="star" />}
                    <div
                        className={clsx(classes.img, wind.image && 'radius')}
                        style={{
                            backgroundImage: `url(${wind.image || '/assets/img/icon_image_placeholder.svg'})`,
                        }}
                    />
                    {wind.name}
                </div>
            )
        ),
        total_product: wind.total_product,
    }));

    return (
        <Table
            {...props}
            header={t('storesetting:Display_Window')}
            columns={columns}
            getRows={getSellerEtalaseList}
            rows={rows}
            loading={loadingWindow}
            count={windowTotal}
            searchPlaceholder={t('storesetting:Search_for_the_display_window_name')}
            t={t}
        />
    );
};

export default CatalogListContent;
